import { useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './AnimalForm.module.css'

function AnimalForm({ handleSubmit, btnText, projectData }) {

    const [animal, setAnimal] = useState(projectData || {})

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(animal)
    }

    function handleChange(e) {
        setAnimal({ ...animal, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do Animal"
                name="name"
                placeholder="Insira o nome do animal"
                handleOnChange={handleChange}
                value={animal.name ? animal.name : ''}
            />

            <Input  
                type="date"
                text="Data de nascimento do animal:"
                name="birth"
                placeholder=""
                handleOnChange={handleChange}
                value={animal.birth ? animal.birth : ''}
            />

            <Select
                name="gender"
                text="Selecione gênero do animal"
                handleOnChange={handleChange}
                value={animal.gender ? animal.gender : ''}
            />
            <Input
                type="text"
                text="Espécie do Animal:"
                name="kind"
                placeholder="Insira a espécie do animal"
                handleOnChange={handleChange}
                value={animal.kind ? animal.kind : ''}
            />
            <Input
                type="text"
                text="Raça do Animal:"
                name="race"
                placeholder="Insira a raça do animal"
                handleOnChange={handleChange}
                value={animal.race ? animal.race : ''}
            />
            <Input
                type="text"
                text="Pelagem do Animal:"
                name="hair"
                placeholder="Insira a pelagem do animal"
                handleOnChange={handleChange}
                value={animal.hair ? animal.hair : ''}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default AnimalForm