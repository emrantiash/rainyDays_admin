import React from 'react'
import PropTypes from 'prop-types'

const Horizontal = props => {
  return (
   
        <hr
        className="shadow"
        style={{
            width : props.width ,
            align : "right"
            // backgroundColor : 'green'
        }} />
   
  )
}

Horizontal.propTypes = {}

export default Horizontal