import { Routes, Route, NavLink } from 'react-router-dom'
import { DartsListPage } from './pages/DartsListPage';
import { OneDartPlayer } from './pages/OneDartPlayer';
import { NewDartsPlayer } from './pages/NewDartsPlayer'; 
import { DeleteDartsPlayer } from './pages/DeleteDartsPlayer';
import { ModifyDartPlayer } from './pages/ModifyDartPlayer';
import './App.css'

export const App = () => {
  return(
    <>
      <nav className="d-flex gap-4 p-3 fs-3">
        <NavLink to="/" className="nav-link">
          <i className="bi bi-house-door-fill me-2"></i>
          Dartsosok
        </NavLink>
        <NavLink to="/new_player" className="nav-link">
          <i className="bi bi-info-circle-fill me-2"></i>
          Új dartsos
        </NavLink>
      </nav>
      <Routes>
        <Route path='/' element={<DartsListPage />} />
        <Route path='/darts/:dartId' element={<OneDartPlayer />} />
        <Route path='/new_player' element={<NewDartsPlayer />} />
        <Route path='/del-darts/:dartId' element={<DeleteDartsPlayer />} />
        <Route path='/mod-darts/:dartId' element={<ModifyDartPlayer />} />
      </Routes>
    </>
  )
};
