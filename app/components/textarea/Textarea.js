import React from 'react';
import PropTypes from 'prop-types';

export default function Textarea(props) {
    return (
        <div className="form-floating">
            <textarea className="form-control" placeholder={props.placeholder}
            name={props.name}
            id={props.id} style={{height: '100px'}}
            defaultValue = ""
            onChange = {props.onChange}
            >

                {/* {props.value} */}
            </textarea>
            <label htmlFor="floatingTextarea2"></label>
        </div>
    )
}

Textarea.propTypes = {
    value : PropTypes.string
}
