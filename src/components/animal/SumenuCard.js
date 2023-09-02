import { Link } from 'react-router-dom'
import styles from './SumenuCard.module.css'
import { BsChevronDown } from 'react-icons/bs'

function SumenuCard({ id }) {
	let healthRecord = ''
	return (
		<nav className={styles.sumenu_card}>
			<li><p><BsChevronDown className={styles.sumenu_card_bschevrondown} />Registro de Saúde</p>
				<ul>
					<li><Link to={`/animals/${id}/${healthRecord = 'vaccines'}`}>Vacinas</Link></li>
					<li><Link to={`/animals/${id}/${healthRecord = 'deworming'}`}>Vermifugação</Link></li>
					<li><Link to={`/animals/${id}/${healthRecord = 'ectoparasites'}`}>Ectoparasitas</Link></li>
				</ul>
			</li>
		</nav>
	)
}

export default SumenuCard