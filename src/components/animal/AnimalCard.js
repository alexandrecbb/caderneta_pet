import { Link } from 'react-router-dom'
import styles from './AnimalCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import SumenuCard from './SumenuCard'

function AnimalCard({ id, name, birth, gender, kind, race, hair, handleRemove }) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)

    }

    return (
        <div className={styles.animal_card}>
            <h2>{name}</h2>
            <div className={styles.animal_card_inf}>
                <p>Nasc.: {birth}</p>
                <p>Sexo: {gender.sex}</p>
                <p>Espécie: {kind}</p>
                <p>Raça: {race}</p>
                <p>Pelagem: {hair}</p>
            </div>
            <div className={styles.animal_card_actions}>
                <Link to={`/animals/${id}`}>
                    <BsPencil /> Editar
                </Link >
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
            <SumenuCard id={id}/>
        </div>

    )
}

export default AnimalCard