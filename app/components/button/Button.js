import React from 'react';


const Button = (props) => {
  return (
    <div>
      <button
        // className="btn btn-user btn-block btn-danger"
        type="button"
        className={props.classname}

        onClick={props.onclick}
        style={{
          width: props.width,
          borderBottomLeftRadius: 30,
          borderTopLeftRadius: 10,
          height: 45
        }}
      >
        {props.text}
        <span 
        style={{
          padding : 2,

        }}>
          {props.icon}
        </span>
      </button>
    </div>
  )
}

export default Button