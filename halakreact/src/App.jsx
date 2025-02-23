import './App.css';
import { BrowserRouter as Router, Route, Routes, Link as NavLink } from "react-router-dom";
import { HalakList } from "./HalakList";
import { UjHal } from "./UjHal";
import {  HalMod } from "./HalMod";
import {  Fogas } from "./Fogas";
import {  TopHalak } from "./TopHalak";

export const App = () => {
  return (
<Router>
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
      <div className='container-fluid'>
        <div className='navbar-brand'>Halak</div>
        <button className='navbar-toggler' type='button' data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls='navbarNav'
        aria-expanded="false"
        aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item' style={{margin: 10}}>
            <NavLink to={"/HalakList"} className={({isActive}) => "nav-link" + (isActive ? 'active' : '')}>
              Halak listázása
              </NavLink>
            </li>
            <li className='nav-item' style={{margin: 10}}>
            <NavLink to={"/Ujhal"} className={({isActive}) => "nav-link" + (isActive ? 'active' : '')}>
              Új hal
              </NavLink>
            </li>
            <li className='nav-item' style={{margin: 10}}>
              <NavLink to={'/Fogasok'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                Horgászok fogásai
              </NavLink>
            </li>
            <li className='nav-item' style={{margin: 10}}>
              <NavLink to={'/TopHalak'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                Legynagobb halak
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

      <Routes>
        <Route path='/' element={<HalakList/>}/>
        <Route path='/HalakList' element={<HalakList/>}/>
        <Route path='/Ujhal' element={<UjHal/>}/>
        <Route path='/Halmod/:halid' element={<HalMod/>}/>
        <Route path='/Fogasok' element={<Fogas/>}/>
        <Route path='/TopHalak' element={<TopHalak/>}/>
      </Routes>
    </Router>
  );
}