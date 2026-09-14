import './App.css'

function App() {
  return(
    <main>
      <selection>
        <h1>
          Login
        </h1>
        <form>
          <label htmlFor="e-mail">
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
        <button type="sumit">
          Acessar
        </button>

        <p></p>
        </form>
      </selection>
    </main>
  )
}
export default App
