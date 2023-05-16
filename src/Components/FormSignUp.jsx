import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function FormSignUp ({ handleSubmit }) {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [prom, setProm] = useState(true)
    const [nov, setNov] = useState(true)
    const [errors, setErrors] = useState({
        name: {
            error: false,
            message: "Deben ser al menos 3 caracteres",
        },
        lastName: {
            error: false,
            message: "Deben ser al menos 3 caracteres",
        },
        email: {
            error: false,
            message: "Debe ingresarse un email válido",
        },
    })

    function validarNombre(nombre) {
        if(nombre.length >= 3){
            return { ...errors, name: { error: false, message: '' } }
        } else {
            return { ...errors, name: { error: true, message: "Deben ser al menos 3 caracteres" } }
        }
    }

    function validarApellido(apellido) {
        if(apellido.length >= 3){
            return { ...errors, lastName: { error: false, message: '' } }
        } else {
            return { ...errors, lastName: { error: true, message: "Deben ser al menos 3 caracteres" } }
        }
    }

    function validarEmail(correo) {
        const reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(correo.match(reg)) {
            return { ...errors, email: { error: false, message: '' } }
        } else {
            return { ...errors, email: { error: true, message: "Debe introducir una dirección correcta" } }
        }
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit({name, lastName, email, prom, nov})
        }}>
            <TextField
                id="name"
                label="Nombre"
                variant="outlined"
                fullWidth
                margin='normal'
                value={ name }
                onChange={(e) => setName (e.target.value)}
                error={ errors.name.error }
                helperText={ errors.name.error ? errors.name.message : '' }
                onBlur={(e) => {
                    setErrors(validarNombre(e.target.value))
                }}
            />
            <TextField
                id="lastName"
                label="Apellido"
                variant="outlined"
                fullWidth
                margin='normal'
                value={ lastName }
                onChange={(e) => setLastName (e.target.value)}
                error={ errors.lastName.error }
                helperText={ errors.lastName.error ? errors.lastName.message : '' }
                onBlur={(e) => {
                    setErrors(validarApellido(e.target.value))
                }}
            />
            <TextField
                id="email"
                label="Correo electrónico"
                variant="outlined"
                fullWidth
                margin='normal'
                value={ email }
                onChange={(e) => setEmail (e.target.value)}
                error={ errors.email.error }
                helperText={ errors.email.error ? errors.email.message : '' }
                onBlur={(e) => {
                    setErrors(validarEmail(e.target.value))
                }}
            />
            <FormGroup>
                <FormControlLabel control={
                    <Switch
                    checked={ prom }
                    onChange={(e) => setProm (e.target.checked)}
                    /> }
                    label="Promociones"
                />
                <FormControlLabel control={
                    <Switch
                    checked={ nov }
                    onChange={(e) => setNov (e.target.checked)}
                    /> }
                    label="Novedades"
                />
            </FormGroup>
            <Button variant="contained" type="submit">Registrarse</Button>
        </form>
    )
}

export default FormSignUp
