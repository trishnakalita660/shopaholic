import React from 'react'
import './styles.scss'
import logo from '../../assets/Logo2.png'

const Header = props => {
    return (
        <header className="header">
        <div className="wrap">
        <div className="logo">
        <img src={logo} atl="logo"/>
        </div>
        </div> 
        </header>
        
    )
}

export default Header
