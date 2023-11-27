import './App.css'
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import Structure from './pages/Structure'
import Home from './pages/Home'
import Notfound from './pages/Notfound'



function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/:id" element={<Structure />} />
          <Route path='*' element={<Notfound /> } />
        </Routes>
      </Router> 
    </>
  )
}

export default App
