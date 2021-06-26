import React, { useState, useEffect } from "react";
import Button from "../Forms/Button";
import { useDispatch, useSelector } from 'react-redux'
import { emailSignInStart, googleSignInStart , resetAllAuthForms } from "../../redux/User/user.actions";
import "./styles.scss";
import { Link} from 'react-router-dom'
import FormInput from "./../Forms/FormInput";
import AuthWrapper from './../AuthWrapper'
import { useHistory } from 'react-router-dom'
 
const mapState = ({user}) =>({
  currentUser: user.currentUser

});

const  SignIn = props => {
  const {currentUser} = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [ email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(()=>{
   if(currentUser){
      resetForm();
      // dispatch(resetAllAuthForms);
       history.push('/');
   
   }
  }, [currentUser])
  
  const resetForm = ()=>{
    setEmail('');
    setPassword('');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({email, password}));
    
  };

  const handleGoogleSignIn=()=>{
    dispatch(googleSignInStart())
  }
    const configWrapper ={
      headline:'LOGIN'
    }
    return (
      <AuthWrapper {...configWrapper}>

          <div className="formWrap">
            <form onSubmit={handleSubmit}>
 
              <FormInput 
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                handleChange={ e=> setEmail(e.target.value) }
              />
              <FormInput 
                type="password"
                name="password"
                value={password}
                placeholder="password"
                handleChange={ e => setPassword(e.target.value) }
              />
              <Button type="submit">LogIn</Button>

              <div className="socialSignin">
                <div className="row">
                  <Button onClick={handleGoogleSignIn}>
                    Sign in with Google
                  </Button>
                </div>
              </div>
              <div className="links">
              <Link to="/recovery">
              Forgot password?
              </Link>
              </div>
            </form>
          </div>
        
      </AuthWrapper>
    );
  }

export default SignIn;
