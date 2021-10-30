import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { password, passwordsMustMatch } from './validate'
import { renderField } from '../../../Utils/renderField/renderField'
import { Link } from 'react-router-dom'
import logo from '../../../../../../assets/img/logo.png'

const RecoverPasswordForm = (props) => {
  const { handleSubmit, pristine, submitting, token, is_valid } = props


  return (
    <div>
      {is_valid
        ? <React.Fragment>
          <div className='container pl-70 ml-80 pr-100 mr-'>
            <form onSubmit={handleSubmit} className='ps-form--account'>
              <div className='ps-form__content'>
                <figure className='ps-block--form-box'>
                  <figcaption>
                    <div className='ps-form--register--header' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div>
                      <img src={logo} />
                    </div>
                    </div>
                  </figcaption>
                  <div className='ps-block__content'>
                    <div className='ps-tab active' id='register'>
                      <div className='ps-form__content'>
                      <h4>Reestablecimiento de contraseña</h4>
                      <hr />
                      <div className='form-group'>
                      <Field
                      className='form-control'
                      name='password'
                      type='password'
                      component={renderField}
                      validate={password}
                      placeholder='Contraseña'
                    />
                    </div>
                      <div className='form-group'>
                      <Field
                      name='password_confirmation'
                      type='password'
                      component={renderField}
                      placeholder='Confirmación de contraseña'
                      validate={passwordsMustMatch}
                    />
                    </div>
                    </div>
                      <hr />
                      <button type='submit' className='ps-btn ps-btn--fullwidth' disabled={pristine || submitting}>
                      Continuar
                    </button>
                    </div>
                  </div>
                </figure>
              </div>
            </form>
          </div>
          </React.Fragment>
        : <React.Fragment>

          <div className='container'>
            <div className=''>
              <div>
                <img src='' alt='' />
                <h3>Ohh! hubo un error en  la página</h3>
                <p>
                  No encontramos el recurso que buscabas.{' '}
                  Puesdes regresar a la página principal
                </p>
                <br />
                <hr />
                <Link href='/login'>
                  <a className='ps-btn ps-btn--fullwidth' style={{ color: 'black' }}>
                    Iniciar sesión
                  </a>
                </Link>
              </div>
            </div>
          </div>
          </React.Fragment>}
    </div>

  )
}

export default reduxForm({
  form: 'change_password'
})(RecoverPasswordForm)
