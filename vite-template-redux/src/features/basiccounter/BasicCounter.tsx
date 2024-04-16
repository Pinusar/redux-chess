import { useState } from 'react';

export function BasicCounter() {
  const [count, setCount] = useState(0)

  const update = () => setCount(prevCount => prevCount + 1)

  return (
    <div>
      Value: {count}
      <button onClick={update}>Increment</button>
    </div>
  )
}