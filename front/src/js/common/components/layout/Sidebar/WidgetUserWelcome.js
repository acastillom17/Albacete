import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/modules/cuenta/login'
import LazyLoad from 'react-lazyload'
import LOGO from '../../../../../assets/img/logo.png'

const WidgetUserWelcome = (props) => {
  const handleLogout = (e) => {
    props.logOut()
  }

  const { me } = props

  if (props.login) {
    return (
      <div className='ps-block--user-wellcome'>
        <div className='ps-block__left'>
          <img src={require('../../../../../assets/img/admin.jpg')} alt='' />
        </div>
        <div className='ps-block__right'>
          <p>
            Hola!,<a href='#'>{me.empresa_nombre}</a>
          </p>
        </div>
        <div className='ps-block__action icon-w10'>
          <Link to='#' onClick={handleLogout}>
            <a>
              <i className='icon-exit' />
            </a>
          </Link>
          {/* <span className="fs-12">Salir</span> */}
        </div>
      </div>
    )
  } else {
    return (
      <div className='ps-block--user-wellcome'>
        <div className='ps-block__left'>
          <LazyLoad>
            <img
              src={LOGO}
              alt='LogO'
            />
          </LazyLoad>
        </div>
        <div className='ps-block__right'>
          <p>
            Hola,<a href='#'>{me.empresa_nombre}</a>
          </p>
          <Link to='#' onClick={handleLogout}>
            <i className='icon-exit' />
            <span className='logout_link'>Salir</span>
          </Link>
        </div>
        <br />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state.login
}

const md2p = { ...actions }

export default connect(mapStateToProps, md2p)(WidgetUserWelcome)
