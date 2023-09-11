import styles from './About.module.css'

function About() {
    return (

        <div className={styles.about_container}>
            <h1>Olá, me chamo Alexandre Castelo Branco</h1>

            <p>
                Este site tem como objetivo demonstrar ninhas habilidades como desenvolvedor web utilizando
                a biblioteca React.js. Ele foi baseado no cartão de vacinação do meu animal de estimação,
                porém foi ampliada sua utilização para uma quantidade indeterminada de animais. Nele utilizei
                os recursos mais usados em projetos Reacts, desta forma tudo que foi empregado neste site é
                suficiente para produzir a grande maioria dos sites existentes no mercado no que diz respeito
                ao Front-end
            </p>

            <br />

            <h2>Contatos </h2>

            <a href="https://www.linkedin.com/in/alexandre-castelo-branco-356b80150" target="_blank" rel="noopener noreferrer">Linkedin</a>

            <p>Email: alexandrecbbrasileiro@gmail.com</p>

        </div>

    )

}

export default About