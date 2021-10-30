import React from 'react'
import { connect } from 'react-redux'

const WidgetEarningSidebar = (props) => {
  return (
    <div>
      <div className='ps-block--earning-count' />
    </div>

  )
}

const ms2p = (state) => {
  return state
}

export default connect(ms2p)(WidgetEarningSidebar)
