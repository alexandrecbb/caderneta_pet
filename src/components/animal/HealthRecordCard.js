import { Link } from 'react-router-dom'
import styles from './HealthRecordCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'

function HealthRecordCard({ id, name, application, reinforcement, responsible, handleRemove, handleEdit, weight }) {

    const { healthRecord } = useParams()

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)

    }

    const edit = (e) => {
        e.preventDefault()
        handleEdit(id)
    }

    return (
        <div className={styles.health_record_card}>
            <h2>{name}</h2>
            <div className={styles.health_record_card_inf}>
                <div>
                    <p>Aplicação:</p> <p>{application}</p>
                </div>
                <div>
                    <p>Reforço:</p> <p>{reinforcement}</p>
                </div>
                <div>
                    {healthRecord === 'vaccines' ? <div><p>Responsável:</p> <p>{responsible}</p></div> : <div><p>Peso:</p> <p>{`${weight} g`}</p></div> }
                </div>
            </div>
            <div className={styles.health_record_card_actions}>
                <button onClick={edit}>
                    <BsPencil /> Editar
                </button >
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>

    )
}

export default HealthRecordCard