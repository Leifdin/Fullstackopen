import React, { useState } from "react"

/**
 * Hook for input field control
 * @param {object} props
 * @param {string} [props.type]
 * @returns 
 */
export const useField = ({ type = 'text' } = {}) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => { setValue('') }
  return { type, value, onChange, reset }
}