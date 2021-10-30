import React from 'react'

const FormHeaderSearch = () => {
  return (
    <React.Fragment>
      <div className='input-group mb-3 ps-form--search-bar'>
        <div className='input-group-prepend icon-w10'>
          <span className='input-group-text span-background' id='basic-addon2'>
            <i>
              <img className='icon-w100' src={require('../../../../../../assets/icons/search-solid.svg')} />
            </i>
          </span>
        </div>
        <input className='input-h50 input-w90 fs' type='text' placeholder='Buscar...' aria-label='Username' aria-describedby='basic-addon2' />
      </div>
    </React.Fragment>
  )
}

export default FormHeaderSearch
