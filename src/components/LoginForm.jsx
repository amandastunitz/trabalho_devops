import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'

function LoginForm() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [tipoMensagem, setTipoMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setMensagem('')
    setTipoMensagem('')
    setCarregando(true)

    try {
      await signInWithEmailAndPassword(auth, email, senha)

      setMensagem('Acessado com sucesso!')
      setTipoMensagem('sucesso')

      navigate('/principal')
    } catch (error) {
      let textoErro = 'Não foi possível realizar o login.'

      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        textoErro = 'Usuário não cadastrado ou e-mail/senha incorretos.'
      } else if (error.code === 'auth/invalid-email') {
        textoErro = 'O e-mail informado é inválido.'
      } else if (error.code === 'auth/too-many-requests') {
        textoErro = 'Muitas tentativas. Aguarde alguns minutos.'
      }

      setMensagem(textoErro)
      setTipoMensagem('erro')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <label htmlFor="email">E-mail</label>

      <input
        id="email"
        name="email"
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <label htmlFor="senha">Senha</label>

      <input
        id="senha"
        name="senha"
        type="password"
        placeholder="Digite sua senha"
        value={senha}
        onChange={(event) => setSenha(event.target.value)}
        required
      />

      <button type="submit" disabled={carregando}>
        {carregando ? 'Acessando...' : 'Acessar'}
      </button>

      <p className={`mensagem ${tipoMensagem}`}>
        {mensagem}
      </p>
    </form>
  )
}

export default LoginForm