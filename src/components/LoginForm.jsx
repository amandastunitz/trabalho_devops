import { Component } from "react"

class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            senha: "",
            mensagem: "",
            tipoMensagem: ""
        }
    }

    handleChange = (event) =>{
        const {name,value} = event.target
        this.setState({
            [name]:value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const emailCorreto = "eduardo.lino@pucpr.br"
        const senhaCorreta = "123456"

        if (
            this.state.email === emailCorreto &&
            this.state.senha === senhaCorreta

        ) {
            this.setState ({
                mensagem: "Acessado com sucesso!",
                tipoMensagem: "sucesso"
            })
        } else {
            this.setState ({
                mensagem: "Usuário ou senha incorretos!",
                tipoMensagem: "erro"

            })
        }
    }

    render(){
        return (
            <form 
                className="formulario"
                onSubmit={this.handleSubmit}
            >
                <label htmlFor="email">
                    E-mail
                </label>

                <input
                    id ="email"
                    name="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={this.state.email}
                    onChange={this.handleChange}
                />

                <label htmlFor="senha">
                    Senha
                </label>

                <input
                    id="senha"
                    name="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    value={this.state.senha}
                    onChange={this.handleChange}
                />

                <button type="submit">
                    Acessar
                </button>
                
                <p className={`mensagem ${this.state.tipoMensagem}`}>
                    {this.state.mensagem}
                </p>
            

            </form>
        )
    }
}


export default LoginForm


