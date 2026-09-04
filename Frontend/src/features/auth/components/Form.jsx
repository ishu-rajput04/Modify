import React from 'react'
import '../style/form.scss'
const Form = ({type,label,placeholder,value,onChange}) => {
  return (
    
        <div className='label-input'>
        <label htmlFor={label}>{label}</label>
        <input value={value} onChange={onChange} type={type} placeholder={placeholder} name="" id={label} />
        </div>
    
  )
}

export default Form
