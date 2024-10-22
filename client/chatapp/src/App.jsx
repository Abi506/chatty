import {Route,Routes} from 'react-router-dom'
import Login from './components/login/login'
import Register from './components/register/register'
import Chat from './components/chat/chat'
import './App.css'

const App=()=>{
  return(
  <Routes>
    <Route exact path="/login" element={<Login/>}/>
    <Route exact path='/register' element={<Register/>}/>
    <Route exact path='/' element={<Chat/>}/>
  </Routes>
  )
}
export default App 