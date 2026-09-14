import './App.css'

function App() {
  return(
    <main>
      <section>
        <h1>
          Login
        </h1>
        <form>
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

        <p></p>
        </form>
      </section>
    </main>
  )
}
export default App
