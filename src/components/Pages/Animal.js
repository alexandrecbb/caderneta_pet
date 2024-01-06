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
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN')}`
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
        const animalData = { ...animal }; // Cria um clone do objeto animal
        delete animalData.id

        fetch(`${process.env.REACT_APP_API_URL}/animal/${animal.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN')}`
            },
            body: JSON.stringify(animalData)
        })
            .then((resp) => {
                if (resp.status === 200) {

                    setAnimal(animal)
                    //redirect
                    history('/animals', { state: { message: "Informaçoes atualizadas com sucesso!" } })
                    return null
                } else {
                    console.error('Falha ao atualizar o registro:', resp.status);
                    return resp.json();
                }
            })
            .then((data) => {
                console.log(data)
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