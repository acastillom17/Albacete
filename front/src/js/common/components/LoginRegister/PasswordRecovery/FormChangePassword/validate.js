const validate = values => {
  const errors = {}

  if (!values.contacto_email) {
    errors.contacto_email = 'Este campo es requerido'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contacto_email)) {
    errors.contacto_email = 'Correo electronico inválido'
  }
  if (!values.username) {
    errors.username = 'Este campo es requerido'
  } else if (!/^.{6,}$/.test(values.username)) {
    errors.username = 'El usuario debe contener almenos 6 caracteres'
  }
  return errors
}

export const password = value =>
  value && !/^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(value)
    ? 'Tu contraseña debe contener 6 caracteres mínimo, almenos 1 mayúscula y almenos 1 número.'
    : undefined

export const passwordsMustMatch = (value, allValues) =>
  value !== allValues.password
    ? 'Las contraseñas no coinciden'
    : undefined

export default validate
