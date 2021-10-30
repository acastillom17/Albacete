import React from 'react'
import FormHeaderSearch from './modules/FormHeaderSearch'

const DefaultHeader = ({ title, description, search_bar, visible }) => {
  return (
    <header className='header--dashboard'>
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='author' content='nouthemes' />
      <meta name='keywords' content='ALBACETE LLC' />
      <meta
        name='description'
        content='Martfury - React eCommerce Template'
      />
      <title>ALBACETE LLC</title>
      <link
        href='https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700&amp;amp;subset=latin-ext'
        rel='stylesheet'
      />
      {visible
        ? <div>

          <div className='header__center'>
            <h3 className='fw-b fs-18'>{title}</h3>
            <p>{description}</p>
          </div>
          <div className='header__center'>
            {search_bar
              ? <FormHeaderSearch />
              : null}
          </div>
          <div className='header__right'>
            {/* Area right here! */}
          </div>
          </div>
        : null}
    </header>
  )
}

export default DefaultHeader
