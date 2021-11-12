import React from 'react'

const Alert = (props) => {
   
    return (
        <div style={{height:"50px"}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{props.alert.type==="danger"?"error":props.alert.type}:</strong>{props.alert.message}
                </div>
            }
                
        </div>
    
        )
}

export default Alert
