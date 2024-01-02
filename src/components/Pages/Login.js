import Input from '../form/Input';
import styles from './Login.module.css'

import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { isAuthenticated, login } = useContext(AuthContext);


    const submit = (e) => {
        e.preventDefault()
        login(email, password);
    }

    return (
        <div className={styles.container}>
            <form>

                <h1>Login</h1>
                <p>{isAuthenticated ?
                    "Digite os seus dados de acesso no campo abaixo" :
                    "Você não está logado. Digite os seus dados de acesso no campo abaixo"}</p>
                <Input
                    type="email"
                    text="Email"
                    name="email"
                    placeholder={"Digite o email"}
                    handleOnChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    text="Senha"
                    name="password"
                    placeholder={"Digite a senha"}
                    handleOnChange={(e) => setPassword(e.target.value)}
                />
                <a href="/">Esqueci minha senha</a>
                <button onClick={submit}>Acessar</button>
            </form>
        </div>
    )
}

export default Login;