import { useState } from 'react'

// 🎮 Playground - площадка для экспериментов
// Вставляйте сюда любой код для тестирования

function Playground() {
  const [state, setState] = useState('')

  const handleChange = (e) => {
    setState(e.target.value)
  }

  console.log(state, 'state');
  return (
    <div>
      <input style={{background: 'white', padding: '10px'}} type="text"  />
      <button onClick={handleChange}>send</button>
    </div>
  )
}

export default Playground
