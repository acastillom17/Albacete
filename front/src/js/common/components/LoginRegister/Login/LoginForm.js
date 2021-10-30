import React from 'react'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { validate, validators } from 'validate-redux-form'
import { renderField } from '../../Utils/renderField'

const LoginForm = (props) => {
  const { handleSubmit } = props
  return (
    <form className='ps-form--account' onSubmit={handleSubmit}>
      <div className='ps-form--account' id='sign-in'>
        <div className='ps-form__content'>
          <h1>Inicia Sesión</h1>
          <h5>Ingresa tus credenciales</h5>
          <div className='form-group'>
            <Field name='username' component={renderField} type='text' placeholder='Usuario' />
          </div>
          <div className='form-group form-forgot'>
            <Field name='password' label='Contraseña' component={renderField} type='password' placeholder='Contraseña' />
          </div>
          <div className='form-group submit'>
            <button
              type='submit'
              className='ps-btn ps-btn--fullwidth'
            >
              Iniciar Sesión
            </button>
            <Link to='/recuperacion' style={{ textAlign: 'center' }}>
                <p className='pt-10' style={{ color: 'gray' }}>
                  ¿Olvide mi contraseña?
                  </p>
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'login', // a unique identifier for this form
  validate: (data) => {
    return validate(data, {
      username: validators.exists()('Este campo es requerido'),
      password: validators.exists()('Este campo es requerido')
    })
  }
})(LoginForm)
