import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './AnimalForm.module.css'

function AnimalForm({ handleSubmit, btnText, projectData }) {

    const [gender, setGender] = useState([])
    const [animal, setAnimal] = useState(projectData || {})

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/gender`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setGender(data)
            })
            .catch((err) => console.error(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(animal)
    }

    function handleChange(e) {
        setAnimal({ ...animal, [e.target.name]: e.target.value })
    }

    function handleGender(e) {
        setAnimal({
            ...animal,
            gender: {
                id: e.target.value,
                sex: e.target.options[e.target.selectedIndex].text,
            },
        })
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
                name="gender_id"
                text="Selecione gênero do animal"
                options={gender}
                handleOnChange={handleGender}
                value={animal.gender ? animal.gender.id : ''}
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