import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../services/firebase'

function CadastroForm() {
  const navigate = useNavigate()

  const [dados, setDados] = useState({
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    email: '',
    senha: '',
  })

  const [mensagem, setMensagem] = useState('')
  const [tipoMensagem, setTipoMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setDados((dadosAnteriores) => ({
      ...dadosAnteriores,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setMensagem('')
    setTipoMensagem('')
    setCarregando(true)

    try {
      const credencial = await createUserWithEmailAndPassword(
        auth,
        dados.email,
        dados.senha,
      )

      const usuario = credencial.user

      await setDoc(doc(db, 'usuarios', usuario.uid), {
        uid: usuario.uid,
        nome: dados.nome,
        sobrenome: dados.sobrenome,
        dataNascimento: dados.dataNascimento,
        email: dados.email,
        criadoEm: serverTimestamp(),
      })

      setMensagem('Usuário cadastrado com sucesso!')
      setTipoMensagem('sucesso')

      navigate('/principal')
    } catch (error) {
      let textoErro = 'Não foi possível realizar o cadastro.'

      if (error.code === 'auth/email-already-in-use') {
        textoErro = 'Este e-mail já está cadastrado.'
      } else if (error.code === 'auth/invalid-email') {
        textoErro = 'O e-mail informado é inválido.'
      } else if (error.code === 'auth/weak-password') {
        textoErro = 'A senha deve ter pelo menos 6 caracteres.'
      }

      setMensagem(textoErro)
      setTipoMensagem('erro')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <label htmlFor="nome">Nome</label>
      <input
        id="nome"
        name="nome"
        type="text"
        placeholder="Digite seu nome"
        value={dados.nome}
        onChange={handleChange}
        required
      />

      <label htmlFor="sobrenome">Sobrenome</label>
      <input
        id="sobrenome"
        name="sobrenome"
        type="text"
        placeholder="Digite seu sobrenome"
        value={dados.sobrenome}
        onChange={handleChange}
        required
      />

      <label htmlFor="dataNascimento">Data de nascimento</label>
      <input
        id="dataNascimento"
        name="dataNascimento"
        type="date"
        value={dados.dataNascimento}
        onChange={handleChange}
        required
      />

      <label htmlFor="emailCadastro">E-mail</label>
      <input
        id="emailCadastro"
        name="email"
        type="email"
        placeholder="Digite seu e-mail"
        value={dados.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="senhaCadastro">Senha</label>
      <input
        id="senhaCadastro"
        name="senha"
        type="password"
        placeholder="Digite sua senha"
        value={dados.senha}
        onChange={handleChange}
        minLength="6"
        required
      />

      <button type="submit" disabled={carregando}>
        {carregando ? 'Cadastrando...' : 'Cadastrar'}
      </button>

      <p className={`mensagem ${tipoMensagem}`}>
        {mensagem}
      </p>
    </form>
  )
}

export default CadastroForm