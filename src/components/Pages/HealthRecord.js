import { v4 as uuidv4 } from 'uuid'

import { BsChevronLeft } from 'react-icons/bs'

import styles from './HealthRecord.module.css'

import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import HealthRecordForm from '../animal/HealthRecordForm'
import HealthRecordCard from '../animal/HealthRecordCard'
import Message from "../layout/Message"

function HealthRecord() {

    const { id, healthRecord } = useParams()

    const [animal, setAnimal] = useState([])
    const [showHealthRecord, setShowHealthRecord] = useState([])
    const [showtHealthForm, setShowtHealthForm] = useState(false)
    const [showHREdit, setShowHREdit] = useState(false)
    const [specificHRAnimal, setSpecificHRAnimal] = useState()
    const [editMessage, setEditMessage] = useState('')
    const [removalMessage, setRemovalMessage] = useState('')
    const [creationMessage, setCreationMessage] = useState('')

    // translate from english to portuguese

    const healthRecordTranslations = {
        vaccines: 'Vacinas',
        deworming: 'Fermifugos',
        ectoparasites: 'Ectoparasitas',
    };

    const transHealthRecord = healthRecordTranslations[healthRecord]


    useEffect(() => {

        setTimeout(() => {
            fetch(`http://localhost:5000/animals/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setAnimal(data)
                    setShowHealthRecord(data[healthRecord])
                })
                .catch((err) => console.error(err))
        }, 500);

    }, [id, specificHRAnimal])


    function createHealthRecord(animal) {

        setCreationMessage('')

        // Last health record
        const lastHealthRecord = animal[healthRecord][animal[healthRecord].length - 1]
        lastHealthRecord.id = uuidv4()

        fetch(`http://localhost:5000/animals/${animal.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animal)
        })
            .then((resp) => resp.json())
            .then(() => {
                toggleHealthForm()
                setCreationMessage(`${transHealthRecord.substring(0, transHealthRecord.length - 1)} registrada`)
            })
            .catch((err) => console.error(err))
    }

    function removeHealthRecord(id) {

        setRemovalMessage('')

        const healthRecordsUpdated = animal[healthRecord].filter(
            (medication) => medication.id !== id
        )

        const animalUpdated = animal

        animalUpdated[healthRecord] = healthRecordsUpdated

        fetch(`http://localhost:5000/animals/${animalUpdated.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animalUpdated)
        })
            .then((resp) => resp.json())
            .then(() => {
                setAnimal(animalUpdated)
                setShowHealthRecord(healthRecordsUpdated)
                setRemovalMessage(`${transHealthRecord.substring(0, transHealthRecord.length - 1)} excluída`)
            })
            .catch((err) => console.error(err))
    }

    function toggleHealthForm() {
        setShowtHealthForm(!showtHealthForm)
        setShowHREdit(false)
    }

    function autoFillForm(id) {

        toggleHealthForm()

        const specificHealthRecord = animal[healthRecord].filter(
            (therapy) => therapy.id === id
        )

        const specificHRAnimal = animal

        specificHRAnimal[healthRecord] = specificHealthRecord

        setSpecificHRAnimal(specificHRAnimal)

        setShowHREdit(true)

    }

    function editHealthRecord(medication) {

        setEditMessage('')

        // Getting the medication index
        const indexToEdit = animal[healthRecord].findIndex(therapy => therapy.id === medication.id);

        const updatedAnimal = animal

        updatedAnimal[healthRecord][indexToEdit] = medication


        fetch(`http://localhost:5000/animals/${updatedAnimal.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAnimal)
        })
            .then((resp) => resp.json())
            .then(() => {
                setAnimal(updatedAnimal)
                toggleHealthForm()
                setEditMessage(`${transHealthRecord.substring(0, transHealthRecord.length - 1)} atualizada`)
            })
            .catch((err) => console.error(err))
    }

    return (<>
        {animal.name ? (
            <div className={styles.healthRecord_top}>
                <Container customClass="column" >
                    <div className={styles.top_infor}>
                        <div>
                            <h1>{animal.name}</h1>
                            <h2>{animal.kind}</h2>
                            <h3>{animal.race}</h3>
                        </div>
                        <h4>{transHealthRecord}</h4>
                        <button className={styles.btn} onClick={toggleHealthForm}>
                            {!showtHealthForm ? `Adicionar ${transHealthRecord}` : `Exibir ${transHealthRecord}`}
                        </button>
                        {editMessage && <Message type="success" msg={editMessage} />}
                        {removalMessage && <Message type="success" msg={removalMessage} />}
                        {creationMessage && <Message type="success" msg={creationMessage} />}
                        {!showtHealthForm ? (
                            <div className={styles.form_health}>

                                <div>
                                    <Link className={styles.form_health_link} to='/animals'><BsChevronLeft /> Voltar</Link>
                                </div>

                                <Container customClass="start">
                                    {showHealthRecord.length > 0 &&
                                        showHealthRecord.map((animalHealthRecord) => (
                                            <HealthRecordCard
                                                key={animalHealthRecord.id}
                                                id={animalHealthRecord.id}
                                                name={animalHealthRecord.name}
                                                application={animalHealthRecord.application}
                                                reinforcement={animalHealthRecord.reinforcement}
                                                responsible={animalHealthRecord.responsible}
                                                weight={animalHealthRecord.weight}
                                                handleRemove={removeHealthRecord}
                                                handleEdit={autoFillForm}
                                            />
                                        ))
                                    }
                                    {showHealthRecord.length === 0 && (
                                        <p>{`Não há ${transHealthRecord} cadastrados!`}</p>
                                    )}
                                </Container>
                            </div>

                        ) : (
                            <div className={styles.form_health}>
                                <button className={styles.form_record_btn} onClick={toggleHealthForm}> <BsChevronLeft /> Voltar</button>
                                <div className={styles.form_record}>
                                    <HealthRecordForm
                                        healthRecordName={transHealthRecord}
                                        handleSubmit={showHREdit ? editHealthRecord : createHealthRecord}
                                        btnText={showHREdit ? 'Atualizar ' : 'Registrar '}
                                        disableCreation={showHREdit ? true : false}
                                        projectData={showHREdit ? specificHRAnimal : animal}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>)
}

export default HealthRecord