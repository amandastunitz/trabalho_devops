import {
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CadastroForm from '../components/CadastroForm'

const {
    mockNavigate,
    mockCriarUsuario,
    mockDoc,
    mockSetDoc,
    mockServerTimestamp,
} = vi.hoisted(() => ({
    mockNavigate: vi.fn(),
    mockCriarUsuario: vi.fn(),
    mockDoc: vi.fn(),
    mockSetDoc: vi.fn(),
    mockServerTimestamp: vi.fn(),
}))

vi.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: mockCriarUsuario,
}))

vi.mock('firebase/firestore', () => ({
    doc: mockDoc,
    setDoc: mockSetDoc,
    serverTimestamp: mockServerTimestamp,
}))

vi.mock('../services/firebase', () => ({
    auth: {},
    db: {},
}))

vi.mock('react-router-dom', async () => {
    const moduloOriginal = await vi.importActual('react-router-dom')

  return {
    ...moduloOriginal,
    useNavigate: () => mockNavigate,
  }
})

describe('CadastroForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockDoc.mockReturnValue('referencia-usuario')
    mockServerTimestamp.mockReturnValue('data-servidor')
  })

  it('cadastra o usuário e grava seus dados com o UID', async () => {
    const user = userEvent.setup()

    mockCriarUsuario.mockResolvedValue({
      user: {
        uid: 'uid-123',
      },
    })

    mockSetDoc.mockResolvedValue()

    render(<CadastroForm />)

    await user.type(screen.getByLabelText(/^nome$/i), 'Amanda')

    await user.type(
      screen.getByLabelText(/sobrenome/i),
      'Stunitz',
    )

    fireEvent.change(
      screen.getByLabelText(/data de nascimento/i),
      {
        target: {
          value: '2000-05-20',
        },
      },
    )

    await user.type(
      screen.getByLabelText(/e-mail/i),
      'amanda@teste.com',
    )

    await user.type(
      screen.getByLabelText(/senha/i),
      '123456',
    )

    await user.click(
      screen.getByRole('button', { name: /cadastrar/i }),
    )

    await waitFor(() => {
      expect(mockCriarUsuario).toHaveBeenCalledWith(
        {},
        'amanda@teste.com',
        '123456',
      )
    })

    expect(mockDoc).toHaveBeenCalledWith(
      {},
      'usuarios',
      'uid-123',
    )

    expect(mockSetDoc).toHaveBeenCalledWith(
      'referencia-usuario',
      {
        uid: 'uid-123',
        nome: 'Amanda',
        sobrenome: 'Stunitz',
        dataNascimento: '2000-05-20',
        email: 'amanda@teste.com',
        criadoEm: 'data-servidor',
      },
    )

    expect(mockNavigate).toHaveBeenCalledWith('/principal')
  })

  it('informa quando o e-mail já está cadastrado', async () => {
    const user = userEvent.setup()

    mockCriarUsuario.mockRejectedValue({
      code: 'auth/email-already-in-use',
    })

    render(<CadastroForm />)

    await user.type(screen.getByLabelText(/^nome$/i), 'Amanda')

    await user.type(
      screen.getByLabelText(/sobrenome/i),
      'Stunitz',
    )

    fireEvent.change(
      screen.getByLabelText(/data de nascimento/i),
      {
        target: {
          value: '2000-05-20',
        },
      },
    )

    await user.type(
      screen.getByLabelText(/e-mail/i),
      'amanda@teste.com',
    )

    await user.type(
      screen.getByLabelText(/senha/i),
      '123456',
    )

    await user.click(
      screen.getByRole('button', { name: /cadastrar/i }),
    )

    expect(
      await screen.findByText(
        /este e-mail já está cadastrado/i,
      ),
    ).toBeInTheDocument()

    expect(mockSetDoc).not.toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})