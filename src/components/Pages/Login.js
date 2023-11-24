import Input from '../form/Input';
import styles from './Login.module.css'

function Login() {
    return (
        <div className={styles.container}>
            <form>
                
                <h1>Login</h1>
                <p>Digite os seus dados de acesso no campo abaixo.</p>
                <Input
                    type="email"
                    text="Email"
                    name="email"
                    placeholder={"Digite o email"}
                />
                <Input
                    type="password"
                    text="Senha"
                    name="password"
                    placeholder={"Digite a senha"}
                />
                <a href="/">Esqueci minha senha</a>
                <button >Acessar</button>
            </form>
        </div>
    )
}

export default Login;