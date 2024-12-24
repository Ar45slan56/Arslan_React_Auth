import React from "react"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./Pages/Home"
import Login from "./Components/Login"
import Register from "./Components/Register"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css';



function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element = {<Login />} />
        <Route path="/" element = {<Register />} />
        <Route path="/home" element = {<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
