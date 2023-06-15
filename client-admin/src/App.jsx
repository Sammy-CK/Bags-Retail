import { useState } from 'react'
import LogInForm from './components/login/loginform';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        < LogInForm />
      </div>
  )
}

export default App
