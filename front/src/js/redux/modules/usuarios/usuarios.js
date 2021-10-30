import { handleActions } from 'redux-actions'
import { api } from 'api'
import { notification } from 'antd'
import Swal from 'sweetalert2'

const actionTypes = {
  SET_USUARIOS: 'SET_USUARIOS',
  SET_VENDEDORES: 'SET_VENDEDORES'

}

// ------------------------------------
// Pure Actions
// ------------------------------------

const SwalAlert = (title, text, type) => {
  Swal.fire({
    width: '400px',
    heightAuto: true,
    title: title,
    text: text,
    type: type

  })
}

const modalSuccessAny = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
    duration: 1
  })
}

export function setVendedor (vendedores) {
  return {
    type: actionTypes.SET_VENDEDORES,
    vendedores
  }
};

export const getVendedoresAll = () => (dispatch) => {
  api.get('usuarios/vendedores').then(vendedores => {
    dispatch(setVendedor(vendedores))
  })
    .catch(() => {
    }).finally(() => {})
}

export const updateUser = (data) => (dispatch) => {
  api.post('usuarios/desactivar_vendedor', data).then(response => {
    modalSuccessAny('success', 'Completado', 'Se ha desactivado a esta tienda y todos los usuarios relacionados.')
    dispatch(getVendedoresAll())
  }).catch(() => {
    modalSuccessAny('error', 'Hubo un error', '')
  }).finally(() => {})
}

export const actions = {
  getVendedoresAll,
  updateUser
}

export const reducers = {
  [actionTypes.SET_VENDEDORES]: (state, { vendedores }) => {
    return {
      ...state,
      vendedores
    }
  }

}

export const initialState = {
  loader: false,
  vendedores: {}

}

export default handleActions(reducers, initialState)
