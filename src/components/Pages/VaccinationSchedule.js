import styles from './VaccinationSchedule.module.css'

function VaccinationSchedule() {
    return (
        <div className={styles.vac_sch_container}>
            <h1>Cronograma de Vacinação</h1>
            <h2>Cães</h2>
            <div>
                <ul>
                    <li className={styles.li_color}>Idade do Animal</li>
                    <li>45 dias</li>
                    <li>66 dias</li>
                    <li>87 dias</li>
                    <li>108 dias</li>
                    <li>150 dias</li>
                </ul>
                <ul>
                    <li className={styles.li_color}>Vacinas</li>
                    <li>1ª dose v8 ou v10</li>
                    <li>2ª dose v8 ou v10</li>
                    <li>3ª dose v8 ou v10</li>
                    <li>4ª dose v8 ou v10</li>
                    <li>Anti-rábica</li>
                </ul>
            </div>

            <h2>Gatos</h2>
            <div>
                <ul>
                    <li className={styles.li_color}>Idade do Animal</li>
                    <li>2 meses</li>
                    <li>3 meses</li>
                    <li>4 meses</li>
                </ul>
                <ul>
                    <li className={styles.li_color}>Vacinas</li>
                    <li>1ª dose Quadrúpla Felina</li>
                    <li>2ª dose Quadrúpla Felina</li>
                    <li>Anti-rábica</li>
                </ul>
            </div>

            <h2>Esquema de Vermifugação</h2>
            <div>
                <div>
                    <p>
                        30 dias de idade 1ª dose <br />
                        45 dias de idade 2ª dose <br />
                        60 dias de idade 3ª dose <br />
                        75 dias de idade 4ª dose
                    </p>
                </div>
                <div>
                    <p>Após 76 dias</p>
                    <p>repetir a vermifugação</p>
                    <p>de 4 em 4</p>
                </div>
            </div>

            <h2>Check-ups</h2>
            <div className={styles.div_column}>
                <p className={styles.p_align}> Além de mater a vacinação anual do seu pet em dia, a lealização de  <br />
                    check-ups garante a prevenção de muitas doenças, assim com a identifiação precose de   <br />
                    enfermidades graves que podem tomar-se doenças que levam até a morte do animal
                </p>
                <br/>
                <p>* Até 6 anos de idade: check-up anual</p>
                <p>* Após 6 anos de idade: check-up semestrais</p>
            </div>

        </div>

    )
}

export default VaccinationSchedule