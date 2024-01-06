import styles from './Animals.module.css'

import { useLocation } from "react-router-dom"
import { useEffect, useState } from 'react'

import Message from "../layout/Message"
import Container from "../layout/Container"
import LinkButton from '../layout/LinkButton'
import AnimalCard from '../animal/AnimalCard'
import Loading from '../layout/Loading'

function Animals() {

    const [animals, setAnimals] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [animalMessage, setAnimalMessege] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {

        setTimeout(() => {

            fetch(`${process.env.REACT_APP_API_URL}/animal`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN')}`
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setAnimals(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.error(err))
        }, 300)

    }, [])

    function removeAnimal(id) {
        fetch(`${process.env.REACT_APP_API_URL}/animal/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN')}`
            },
        })
            .then((resp) => {
                if (resp.status === 204) {
                    setAnimals(animals.filter((animal) => animal.id !== id))
                    setAnimalMessege('Registro de animal removido!')
                    return null
                }else {
                    console.error('Falha ao deletar o item:', resp.status);
                    return resp.json(); 
                  }
            })
            .then((data) => {
                console.log(data)
            })
            .catch((err) => console.error(err))
    }

    return (
        <div className={styles.animal_container}>
            <div className={styles.title_container}>
                <h1>Animais</h1>
                <LinkButton to='/registeranimal' text='Registrar Animal' />
            </div>

            {message && <Message type="success" msg={message} />}
            {animalMessage && <Message type="success" msg={animalMessage} />}
            <Container customClass="start">
                {animals.length > 0 &&
                    animals.map((animal) => (
                        <AnimalCard
                            id={animal.id}
                            name={animal.name}
                            birth={animal.birth}
                            gender={animal.gender}
                            kind={animal.kind}
                            race={animal.race}
                            hair={animal.hair}
                            key={animal.id}
                            handleRemove={removeAnimal}
                        />
                    ))
                }
                {!removeLoading && <Loading />}
                {removeLoading && animals.length === 0 && (
                    <p>Não há animais cadastrados!</p>
                )}
            </Container>
        </div>
    )
}

export default Animals