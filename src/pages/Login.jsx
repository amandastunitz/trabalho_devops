import {Link} from 'react-router-dom'
import LoginForm from '../components/LoginForm'

function Login () {
    return (
        <section className='cartao-login'>
        <h1>Login</h1>
        <LoginForm />

        <p>
            <Link to="/cadastro">Cadastre-se</Link>
        </p>

        </section>
        
    )
}

export default Login