import { useState, useEffect } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import styles from './AnimalForm.module.css'
import { useParams } from 'react-router-dom'

function HealthRecordForm({handleSubmit, btnText, projectData, healthRecordName, disableCreation}) {

    const { healthRecord } = useParams()

    //const projectDataDefault = projectData
    //console.log(projectData)
    const animal = projectData
    
    const [medication, setMedication] = useState((animal[healthRecord] && disableCreation) && animal[healthRecord][0])
    

    function submit(e) {
        e.preventDefault()
        //console.log(medication)
        projectData[healthRecord].push(medication) 
        handleSubmit(projectData) 
        
    }

    function handleChange(e) {
        //setAnimal({...animal, [e.target.name]: e.target.value})
        setMedication({...medication, [e.target.name]: e.target.value})
        //console.log(medication)
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

            <Input
                type="text"
                text="Responsável"
                name="responsible"
                placeholder="Insira o nome do responsável"
                handleOnChange={handleChange}
                value={animal[healthRecord] && (medication.responsible ? medication.responsible : '')}
            />

            <SubmitButton text={btnText + healthRecordName.substring(0, healthRecordName.length - 1) }/>
        </form>
    )
}


export default HealthRecordForm