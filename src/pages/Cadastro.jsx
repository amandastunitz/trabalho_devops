import {Link} from 'react-router-dom'
import CadastroForm from '../components/CadastroForm'

function Cadastro () {
    return (
        <section className="cartao-login">
            <h1> Cadastro </h1>

            <CadastroForm />


            <p>
                <Link to="/login">Já tenho conta</Link>
            </p>
        </section>
    )
}

export default Cadastro 