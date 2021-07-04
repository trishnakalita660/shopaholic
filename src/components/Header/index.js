import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.scss";
import logo from "../../assets/Logo2.png";
import cart from "../../assets/cart.png";
import { signOutUserSuccess } from "../../redux/User/user.actions";
import { selectCartItemsCount } from "../../redux/Cart/cart.selectors";
const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems:  selectCartItemsCount(state)
});
const Header = (props) => {
  const dispatch = useDispatch();
  const { currentUser, totalNumCartItems } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserSuccess());
  };

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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <div className="callToActions">
          <ul>
            <li>
              <Link>
                {" "}
                <img src={cart} atl="cart" height="25px" width="25px" />{totalNumCartItems}
              </Link>
            </li>
            {currentUser && [
              <li>
                <Link to="/dashboard">My Account</Link>
              </li>,
              <li>
                <span onClick={() => signOut()}> Logout</span>
              </li>,
            ]}
          </ul>

          <ul>
            {!currentUser && [
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>,
              <li>
                <Link to="/registration">Register</Link>
              </li>,

              <li>
                <Link to="/login">LOGIN</Link>
              </li>,
            ]}
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
