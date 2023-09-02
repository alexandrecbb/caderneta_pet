import styles from './Home.module.css'
import savings from '../../img/savings.png'
import LinkButton from '../layout/LinkButton'

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo a <span>Caderneta Pet</span></h1>
            <p>O site de acompanhamento da saúde do seu pet!</p>
            <img src={savings} alt="Caderneta Pet" />
            <LinkButton to='/registeranimal' text='Registrar Animal' />
        </section>
    )
}

export default Home