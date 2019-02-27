import React, { useState, useEffect } from 'react'

const Counter = ({ initialValue = 0 }) => {
  const [value, setValue] = useState(initialValue)
  useEffect(
    () => {
      if (value !== initialValue) {
        setValue(initialValue)
      }
    },
    [initialValue],
  )
  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue(value + 1)}>
        Increment by 1
      </button>
    </div>
  )
}

export default Counter
