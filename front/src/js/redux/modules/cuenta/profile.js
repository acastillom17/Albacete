import { handleActions } from 'redux-actions'
import { push } from 'react-router-redux'
import { NotificationManager } from 'react-notifications'
import { api } from 'api'
import { setMe } from './login'
import { notification } from 'antd'

export const actionTypes = {
  LOADER: 'LOGIN_LOADER',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  SET_ASOCIADOS: 'SET_ASOCIADOS'

}

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
  type: actionTypes.LOADER,
  loader
})

export function setNotifications (notificaciones) {
  return {
    type: actionTypes.SET_NOTIFICATIONS,
    notificaciones
  }
}

const modalSuccessAny = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
    duration: 1
  })
}

export function setAsociados (administradores) {
  return {
    type: actionTypes.SET_ASOCIADOS,
    administradores
  }
}

// ------------------------------------
// Actions
// ------------------------------------

export const getAdmins = () => (dispatch, getStore) => {
  api.get('usuarios/administradores').then((administradores) => {
    dispatch(setAsociados(administradores))
  }).catch(() => {
    NotificationManager.error('Hubo un error intenta de nuevo', 'ERROR', 0)
  }).finally(() => {
  })
}

export const invitarUsuario = (data) => (dispatch) => {
  api.post('usuarios/invitar_usuario', data).then((response) => {
    dispatch(getAdmins())
    modalSuccessAny('success', 'Completado', '')
    dispatch(push('/asociados'))
  }).catch((error) => {
    let mensaje = 'Hubo un error, intenta más tarde'
    if (error) {
      if (error.detail) { mensaje = error.detail }
    }
    modalSuccessAny('error', 'Error', mensaje)
  }).finally(() => {
  })
}

export const updateAsociado = (data) => (dispatch, getStore) => {
  api.post('usuarios/estado_asociado', data).then((response) => {
    dispatch(getAdmins())
    modalSuccessAny('success', 'Completado', '')
  }).catch(() => {
    NotificationManager.error('Hubo un error intenta de nuevo', 'ERROR', 0)
  }).finally(() => {
  })
}

export const disableUser = (data) => (dispatch) => {
  api.post('usuarios/disable_user', data).then((response) => {
    dispatch(getAdmins())
    modalSuccessAny('success', 'Completado', '')
  }).catch(() => {
    NotificationManager.error('Hubo un error intenta de nuevo', 'ERROR', 0)
  }).finally(() => {
  })
}

export const update = (data = {}, attachments = []) => (dispatch, getStore) => {
  dispatch(setLoader(true))
  api.putAttachments('user/update_me', data, attachments).then((response) => {
    dispatch(setMe(response))
    NotificationManager.success('Datos actualizados exitosamente', 'ERROR', 1000)
  }).catch(() => {
    NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0)
  }).finally(() => {
    dispatch(setLoader(false))
  })
}

export const getNotificaciones = () => (dispatch) => {
  api.get('notificaciones/mis_notificaciones').then(response => {
    dispatch(setNotifications(response))
  })
    .catch(() => {
    }).finally(() => {})
}

export const sucessVerify = (is_valid) => (dispatch) => {
  if (is_valid === 'true') {
    dispatch(push('/cuenta-activacion/completado'))
  } else {
    dispatch(push('/cuenta-activacion/error'))
  }
}

export const submitChangePassword = (data) => (dispatch) => {
  api.post('usuarios/changepassword', data).then((response) => {
    dispatch({ type: actionTypes.CHANGE_PASSWORD })
    dispatch(push('/login'))
    modalSuccessAny('success', 'Completado', 'tu contraseña se cambio correctamente')
  }).catch((error) => {
    let mensaje = 'Hubo un error, intenta más tarde'
    if (error) {
      if (error.detail) { mensaje = error.detail }
    }
    modalSuccessAny('error', 'Error', mensaje)
  }).finally(() => {
  })
}

export const actions = {
  update,
  getNotificaciones,
  getAdmins,
  invitarUsuario,
  updateAsociado,
  sucessVerify,
  submitChangePassword,
  disableUser
}

export const reducers = {
  [actionTypes.LOADER]: (state, { loader }) => {
    return {
      ...state,
      loader
    }
  },
  [actionTypes.SET_NOTIFICATIONS]: (state, { notificaciones }) => {
    return {
      ...state,
      notificaciones
    }
  },
  [actionTypes.CHANGE_PASSWORD]: (state) => {
    return {
      ...state
    }
  },
  [actionTypes.SET_ASOCIADOS]: (state, { administradores }) => {
    return {
      ...state,
      administradores
    }
  }
}

export const initialState = {
  loader: false,
  notificaciones: {},
  administradores: {}
}

export default handleActions(reducers, initialState)
