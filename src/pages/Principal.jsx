import {useEffect, useState}from 'react' 
import {useNavigate} from 'react-router-dom'
import {onAuthStateChanged, signOut} from 'firebase/auth'
import {doc, getDoc} from 'firebase/firestore'
import {auth, db} from "../services/firebase"

function Principal () {
    const navigate = useNavigate()

    const [usuario, setUsuario] = useState(null)
    const [carregando, setCarregando] =useState(true)
    const [mensagem, setMensagem] = useState('')

    useEffect(() => {
        const cancelarObservacao = onAuthStateChanged(
            auth,
            async (usuarioAutenticado) => {
                if (!usuarioAutenticado) {
                    navigate ('/login',{replace:true})
                    return
                }

                try {
                    const referencia = doc(
                        db,
                        'usuarios',
                        usuarioAutenticado.uid,
                    )

                    const documento = await getDoc(referencia)

                    if (documento.exists()) {
                        setUsuario(documento.data())
                    } else {
                        setMensagem('Dados do usuário não encontrados.')
                    } 
                }catch {
                    setMensagem('Não foi possível carregar os dados do usuário')
                    
                } finally {
                    setCarregando(false)
                
                }
            },
        )


        return () => cancelarObservacao()
    },[navigate])

    const handleLogout = async () => {
        try {
            await signOut(auth)
            navigate('/login', { replace: true })
        } catch {
            setMensagem('Não foi possível sair da aplicação.')
        }
    }

    const formatarData = (data) => {
        if (!data) {
            return 'Não informada'
        }
    

        const [ano, mes, dia] = data.split('-')
        return `${dia}/${mes}/${ano}`
    }

    if (carregando) {
        return (
            <section className="cartao-login">
                <p>Carregando dados...</p>
            </section>
        )
    }

    return( 
        <section className="cartao-login">
            <h1>Principal</h1>

            {usuario && (
                <div className="dados-usuario">
                    <h2>Bem-vindo, {usuario.nome}!</h2>
                    <p>
                        <strong>Nome:</strong> {usuario.nome}
                    </p>

                    <p>
                        <strong>Sobrenome</strong>{usuario.sobrenome}

                    </p>
                    <p>
                        <strong>Data de nascimento:</strong>{' '}
                        {formatarData(usuario.dataNascimento)}

                    </p>
                </div>
            )}

            {mensagem && (
                <p className="mensagem erro" > {mensagem}</p>
            )}
                <button type="button" onClick={handleLogout}>
                    Sair 
                </button>
                
             </section>
     )
}


export default Principal