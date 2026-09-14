import './App.css'

function App() {
  return(
    <main className="pagina">
      <section className="cartao-login">
        <h1>
          Login
        </h1>
        <form className="formulario">
          <label htmlFor="email">
            E-mail
          </label>
        <input
          id = "email"
          name="email"
          type="email"
          placeholder="Digite seu e-mail:"
        />
        <label htmlFor="senha">
          Senha
        </label>
        <input
          id="senha"
          name="senha"
          type="password"
          placeholder="Digite sua senha"
        />
        <button type="submit">
          Acessar
        </button>

        <p className="mensagem"></p>
        </form>
      </section>
    </main>
  )
}
export default App
