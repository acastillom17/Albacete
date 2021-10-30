import { handleActions } from 'redux-actions'
import { push } from 'react-router-redux'
import { notification } from 'antd'
import { initialize as initializeForm } from 'redux-form'
import { NotificationManager } from 'react-notifications'
import { api } from 'api'

export const actionTypes = {
  SUBMIT: 'LOGIN_SUBMIT',
  LOADER: 'LOGIN_LOADER',
  ME: 'LOGIN_ME',
  PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD'
}

// ------------------------------------
// Pure Actions
// ------------------------------------

const cleanPasswordForm = () => (dispatch) => {
  dispatch(initializeForm('change_password', {}))
}

const modalSuccessAny = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
    duration: 1
  })
}

export const setLoader = loader => ({
  type: actionTypes.LOADER,
  loader
})

export function setMe (me) {
  return {
    type: actionTypes.ME,
    me
  }
};

// ------------------------------------
// Actions
// ------------------------------------

export const onSubmit = (data) => (dispatch, getStore) => {
  dispatch(setLoader(true))
  api.post('usuarios/login', data).then((response) => {
    localStorage.setItem('token', response.token)
    dispatch(initializeForm('profile', response.user))
    dispatch(setMe(response.user))
    dispatch(push('/'))
  }).catch(() => {
    NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0)
  }).finally(() => {
    dispatch(setLoader(false))
  })
}

export const getMe = () => (dispatch) => {
  api.get('/usuarios/me').then(me => {
    dispatch(initializeForm('profile', me))
    dispatch(setMe(me))
  })
    .catch(() => {
    }).finally(() => {})
}

export const logOut = () => (dispatch) => {
  api.post('/usuarios/logout').then(() => {
  }).catch(() => {
  }).finally(() => {})
  localStorage.removeItem('token')
}

export const updateProfile = (data) => (dispatch) => {
  const values = { data }
  api.put('usuarios/update_me', data)
    .then((response) => {
      dispatch(getMe())
      const message = 'Completado'
      const description = 'El perfil se actualizó correctamente'
      modalSuccessAny('success', message, description)
      dispatch(push('/ajustes'))
    })
    .catch((error) => {
      let mensaje = 'Hubo un error'
      if (error) {
        if (error.detail) { mensaje = error.detail }
      }
      NotificationManager.error(mensaje, 'ERROR', 5000)
    }).finally(() => {
      dispatch(setLoader(false))
    })
}

export const password_recovery = (data) => (dispatch) => {
  api.post('/recovery', data).then((response) => {
    dispatch({ type: actionTypes.PASSWORD_RECOVERY })
    dispatch(push('/recuperacion/confirmacion'))
  }).catch((error) => {
    let mensaje = 'Hubo un error, intenta más tarde'
    if (error) {
      if (error.detail) { mensaje = error.detail }
    }
    modalSuccessAny('error', mensaje, '')
  }).finally(() => {
    // Router.push('/account/email-verification')
  })
}

export const submitChangePassword = (data) => (dispatch) => {
  api.post('/usuarios/changepassword', data).then((response) => {
    dispatch({ type: actionTypes.CHANGE_PASSWORD }, cleanPasswordForm())
    modalSuccessAny('success', 'Completado', '')
    dispatch(push('/login'))
  }).catch((error) => {
    let mensaje = 'Hubo un error, intenta más tarde'
    if (error) {
      if (error.detail) { mensaje = error.detail }
    }
    NotificationManager.error(mensaje, 'ERROR', 5000)
  }).finally(() => {
  })
}

export const actions = {
  onSubmit,
  logOut,
  getMe,
  updateProfile,
  password_recovery,
  submitChangePassword
}

export const reducers = {
  [actionTypes.LOADER]: (state, { loader }) => {
    return {
      ...state,
      loader
    }
  },
  [actionTypes.ME]: (state, { me }) => {
    return {
      ...state,
      me
    }
  },
  [actionTypes.PASSWORD_RECOVERY]: (state) => {
    return {
      ...state
    }
  },
  [actionTypes.CHANGE_PASSWORD]: (state) => {
    return {
      ...state
    }
  }
}

export const initialState = {
  loader: false,
  perfil: {},
  me: {}
}

export default handleActions(reducers, initialState)
