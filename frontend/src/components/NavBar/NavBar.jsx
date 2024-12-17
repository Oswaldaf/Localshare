import React, { useState } from 'react'
import * as FaIcons  from "react-icons/fa";
import * as  FaRegWindowClose  from "react-icons/fa";
// import { Link } from 'react-router-dom';
import { SideBar } from '../SideBar/SideBar';
import './NavBar.css';
import { IconContext } from 'react-icons/lib';
import ProfileCard from '../ProfilCard/ProfilCard';
import Button from '../Button/Button';
import { Link, useNavigate } from 'react-router-dom';


function NavBar() {
    const [sidebar, setSidebar] = useState(true)

    const showSidebar = () => setSidebar(!sidebar)
    const navigate = useNavigate();
    const newGroup =  () => 
    {
        navigate('/createGroup')
    };
     const logout = () => {
        localStorage.removeItem('token');
    navigate('/')}
  return (
    
    <IconContext.Provider value={{ color: '#fff' }}>
    <header className='navbar'>
        <Link to="#" className='menu-bar'>
        <FaIcons.FaBars onClick={showSidebar}/>
        </Link>
        <Button text={ 'Se Déconnecter'} onClick={logout}/>
    </header>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} >
        <ul className='nav-menu-items' >
            <li className='navbar-toggle'>
                <Link to='#' className='menu-bar' >
                    <FaIcons.FaRegWindowClose  onClick={showSidebar}/>
                </Link>
            </li>
             <ProfileCard />
            {SideBar.map((item, index) => {
                return (
                 <li key={index}  className={item.cName}>
                    <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                 </li>
                )
            })}
            <br /><br /><br />
          <Button  text={"Nouveau Groupe"} onClick={newGroup}/>  
        </ul>
    </nav>
    
    </IconContext.Provider>
    
  )
}

export default NavBar