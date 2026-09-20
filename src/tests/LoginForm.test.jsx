import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import LoginForm from '../components/LoginForm'

const { mockNavigate, mockLogin } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockLogin: vi.fn(),
}))

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: mockLogin,
}))

vi.mock('../services/firebase', () => ({
  auth: {},
}))

vi.mock('react-router-dom', async () => {
  const moduloOriginal = await vi.importActual('react-router-dom')

  return {
    ...moduloOriginal,
    useNavigate: () => mockNavigate,
  }
})

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('exibe os campos de e-mail, senha e o botão de acesso', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /acessar/i }),
    ).toBeInTheDocument()
  })

  it('realiza o login e navega para a página principal', async () => {
    const user = userEvent.setup()

    mockLogin.mockResolvedValue({
      user: {
        uid: 'uid-teste',
      },
    })

    render(<LoginForm />)

    await user.type(
      screen.getByLabelText(/e-mail/i),
      'usuario@teste.com',
    )

    await user.type(
      screen.getByLabelText(/senha/i),
      '123456',
    )

    await user.click(
      screen.getByRole('button', { name: /acessar/i }),
    )

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        {},
        'usuario@teste.com',
        '123456',
      )

      expect(mockNavigate).toHaveBeenCalledWith('/principal')
    })
  })

  it('informa quando as credenciais estão incorretas', async () => {
    const user = userEvent.setup()

    mockLogin.mockRejectedValue({
      code: 'auth/invalid-credential',
    })

    render(<LoginForm />)

    await user.type(
      screen.getByLabelText(/e-mail/i),
      'naocadastrado@teste.com',
    )

    await user.type(
      screen.getByLabelText(/senha/i),
      'senha-incorreta',
    )

    await user.click(
      screen.getByRole('button', { name: /acessar/i }),
    )

    expect(
      await screen.findByText(
        /usuário não cadastrado ou e-mail\/senha incorretos/i,
      ),
    ).toBeInTheDocument()

    expect(mockNavigate).not.toHaveBeenCalled()
  })
})