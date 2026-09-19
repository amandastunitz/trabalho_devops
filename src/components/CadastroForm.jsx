import { useState }from 'react'

function CadastroForm() {
    const [dados, setDados] = useState ({
        nome: '',
        sobrenome: '',
        dataNascimento: '',
        email: '',
        senha: '',

    })


const handleChange = (event) => {
    const {name,value} = event.target

    setDados ((dadosAnteriores) => ({
        ...dadosAnteriores,
        [name]: value,
    }))
}

const handleSubmit = (event) => {
    event.preventDefault ()

    console.log(dados)
}

return (
    <form className= "formulario" onSubmit={handleSubmit}>
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

        <label htmlFor="dataNascimento"> Data de Nascimento </label>
        <input
            id="dataNascimento"
            name="dataNascimento"
            type="date"
            value={dados.dataNascimento}
            onChange={handleChange}
            required
        />

        <label htmlFor="emailCadastro"> E-mail </label>
        <input 
            id="emailCadastro"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={dados.email}
            onChange={handleChange}
            required
        />

        <label htmlFor="senhaCadastro"> Senha </label>
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

        <button type="submit"> Casdastrar </button> 

    </form>
)
}
export default CadastroForm
