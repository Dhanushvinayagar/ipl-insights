import './App.css'
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import Structure from './pages/Structure'
import Home from './pages/Home'
import Notfound from './pages/Notfound'



function App() {

// 
//   
// 
// https://www.mockachino.com/5db99bd2-28c5-46/ipl/list/players

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
