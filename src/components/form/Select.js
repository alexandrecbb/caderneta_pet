import styles from './Select.module.css'

function Select({ text, name, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name}  onChange={handleOnChange} value={value || ''}>
                <option value="">Selecione</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>    
            </select>
        </div>
    )
}

export default Select