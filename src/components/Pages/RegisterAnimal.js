import { useNavigate } from 'react-router-dom'

import styles from './RegisterAnimal.module.css'
import AnimalForm from '../animal/AnimalForm'

function RegisterAnimal() {

    const history = useNavigate()

    function createPost(animal) {

        // Initializing the Realth Record
        animal.vaccines = []
        animal.deworming = []
        animal.ectoparasites = []

        fetch(`${process.env.REACT_APP_API_URL}/animal`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animal),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                //redirect
                history('/animals', { state: { message: "Animal registrado com sucesso!" } });
            })
            .catch((err) => console.error(err))
    }

    return (
        <div className={styles.registerAnimal_container}>
            <h1>Registrar Animal</h1>
            <p>Registre o animnal para acompanhar os parametros de saúde</p>
            <AnimalForm handleSubmit={createPost} btnText="Confirmar Registro" />
        </div>
    )
}

export default RegisterAnimal