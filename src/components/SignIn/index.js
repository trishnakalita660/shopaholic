import React, { useState, useEffect } from "react";
import Button from "../Forms/Button";
import "./styles.scss";
import { Link} from 'react-router-dom'
import FormInput from "./../Forms/FormInput";
import { signInwithGoogle, auth } from "./../../firebase/utils";
import AuthWrapper from './../AuthWrapper'
import { withRouter } from 'react-router-dom'
 
const  SignIn = props => {
  
  const [ email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const resetForm = ()=>{
    setEmail('');
    setPassword('');
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
      props.history.push('/');
    } catch(err){
      console.log(err);
    }
  };

  
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
                  <Button onClick={signInwithGoogle}>
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

export default withRouter(SignIn);
