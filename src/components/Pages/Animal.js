import styles from './RegisterAnimal.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AnimalForm from '../animal/AnimalForm'
import Loading from '../layout/Loading'


function Animal() {

    const { id } = useParams()
    const history = useNavigate()
    const [animal, setAnimal] = useState([])

    useEffect(() => {
        setTimeout(() => {
            fetch(`${process.env.REACT_APP_API_URL}/animal/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setAnimal(data)
                })
                .catch((err) => console.error(err))
        }, 500);
    }, [id])

    function editPost(animal) {

        fetch(`${process.env.REACT_APP_API_URL}/animal/${animal.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(animal)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setAnimal(data)
                //redirect
                history('/animals', { state: { message: "Informaçoes atualizadas com sucesso!" } })
            })
            .catch((err) => console.error(err))
    }

    return (<>{animal.name ?

        <div className={styles.registerAnimal_container}>

            <AnimalForm handleSubmit={editPost} btnText="Atualizar Informações" projectData={animal} />

        </div>

        : <Loading />}

    </>)
}

export default Animal