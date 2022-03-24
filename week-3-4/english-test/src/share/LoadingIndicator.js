import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "../App.css"
export const LoadingIndicator = (props) =>{
  const {size} = props;
    return (
        <div className="loading" >
          <FontAwesomeIcon icon={faSpinner} spin size={size} />
        </div>
    )
}