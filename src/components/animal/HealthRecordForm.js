import { useState, useEffect } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import styles from './AnimalForm.module.css'
import { useParams } from 'react-router-dom'

function HealthRecordForm({ handleSubmit, btnText, projectData, healthRecordName, disableCreation }) {

    const { healthRecord } = useParams()

    const animal = projectData

    const [medication, setMedication] = useState((animal[healthRecord] && disableCreation) && animal[healthRecord][0])

    const typeOfMedication = (healthRecord === 'vaccines' ?  'responsible' : 'weight')


    function submit(e) {
        e.preventDefault()
        { !disableCreation && projectData[healthRecord].push(medication) }
        handleSubmit(disableCreation ? medication : projectData)
    }

    function handleChange(e) {
        setMedication({ ...medication, [e.target.name]: e.target.value })
    }


    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text={`Nome d${healthRecordName.slice(-2).charAt(0)} ${healthRecordName.substring(0, healthRecordName.length - 1)}`}
                name="name"
                placeholder={`Insira o nome d${healthRecordName.slice(-2).charAt(0)} ${healthRecordName.substring(0, healthRecordName.length - 1)}`}
                handleOnChange={handleChange}
                value={animal[healthRecord] && (medication.name ? medication.name : '')}
            />

            <Input
                type="date"
                text="Aplicação"
                name="application"
                placeholder="Insira a data da aplicação"
                handleOnChange={handleChange}
                value={animal[healthRecord] && (medication.application ? medication.application : '')}
            />

            <Input
                type="date"
                text="Reforço"
                name="reinforcement"
                placeholder="Insira a data do reforço"
                handleOnChange={handleChange}
                value={animal[healthRecord] && (medication.reinforcement ? medication.reinforcement : '')}
            />
            <div className={styles.addKg}>
                <Input
                    type="text"
                    text={healthRecord === 'vaccines' ? "Responsável" : "peso"}
                    name={healthRecord === 'vaccines' ? "responsible" : "weight"}
                    placeholder= {healthRecord === 'vaccines' ? "Insira o nome do responsável" : "Insira o peso do animal"} 
                    handleOnChange={handleChange}
                    value={animal[healthRecord] && (medication[typeOfMedication] ? medication[typeOfMedication] : '')}
                />
                {healthRecord !== 'vaccines' && <span>g</span>}
            </div>

            <SubmitButton text={btnText + healthRecordName.substring(0, healthRecordName.length - 1)} />
        </form>
    )
}


export default HealthRecordForm