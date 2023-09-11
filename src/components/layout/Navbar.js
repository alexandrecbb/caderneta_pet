import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'
import logo from '../../img/Logo Caderneta Pet.png'
import Container from './Container';

function Navbar() {

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
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar