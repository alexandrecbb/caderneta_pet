import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'
import logo from '../../img/Logo Caderneta Pet.png'
import Container from './Container';

import { useContext} from 'react';
import { AuthContext } from '../../components/context/AuthContext';

function Navbar() {

    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={logo} alt="Caderneta Pet" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/animals">Animais</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/vaccinationschedule">Cronograma</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/about">Sobre</Link>
                    </li>
                    <li className={styles.item}>
                        {isAuthenticated ? <Link  onClick={logout} to="/">Sair</Link> : <Link to="/login">Login</Link>}
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar