import React  from 'react';
import styles from './Label.style';


// block text-lg font-medium text-gray-700 antialiased tracking-widest
const Label = (props) =>{
    return(
        <label 
          className={props.className ? props.className : 'badge bg-warning text-wrap'}
        //  className={props.className}
        style={{...styles.container,fontSize:props.size,
        // backgroundColor : '#1CC88A',
        // padding:5,
        borderRadius : 5,
        wordWrap  : 'break-word'
        }}>
            {props.image} {props.title} 
            {
                props.required &&
                <span  style={styles.mark}> *
                </span>
            }
            
        </label>
       
    )
}

export default Label



