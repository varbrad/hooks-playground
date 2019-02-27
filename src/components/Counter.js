import React, { useState } from 'react'

const Counter = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue)

  return <p>Hello!</p>
}

export default Counter
