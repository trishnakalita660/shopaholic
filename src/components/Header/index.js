import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import "./styles.scss"; 
import logo from "../../assets/Logo2.png"; 
import { signOutUserSuccess } from "../../redux/User/user.actions";

const mapState = ({user}) =>({
  currentUser: user.currentUser
});
const Header = (props) => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(mapState);
  
  const signOut = ()=>{
    dispatch( signOutUserSuccess() );
  }

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={logo} atl="logo" />
          </Link>
        </div>

        <nav>
          <ul>
          <li>
              <Link to ="/">
                Home
              </Link>
            </li>
            <li>
              <Link to ="/search">
                Search
              </Link>
            </li>
            
          </ul>
        </nav>
        <div className="callToActions">
        { currentUser &&(
          <ul>
          <li>
          <Link to="/dashboard">My Account</Link>
        </li>
          <li>
          <span onClick = {()=> signOut()}> Logout</span>
          </li>
          
          </ul>
        )}
    
        {!currentUser && (
          <ul>
          <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
          <li>
            <Link to="/registration">Register</Link>
          </li>
         

          <li>
            <Link to="/login">LOGIN</Link>
          </li>

        </ul>
        )}
         
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null
}



export default Header;
