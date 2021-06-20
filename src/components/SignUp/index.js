import React, { useState, useEffect } from "react";
import AuthWrapper from "../AuthWrapper";
import Button from "../Forms/Button";
import FormInput from "../Forms/FormInput";
import { auth, handleUserProfile} from './../../firebase/utils'
import "./styles.scss";
import { withRouter} from 'react-router-dom'

 const SignUp = props=>{
 
   const [displayName, setDisplayName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword,setconfirmPassword] = useState('');
   const [errors, setErrors] = useState([]);
 
   const reset = ()=>{
    setDisplayName('');
    setEmail('');
    setPassword('');
    setconfirmPassword('');
    setErrors([]);
   }
   const handleFormSubmit= async event =>{
    event.preventDefault();
    
    if(password!==confirmPassword){
      const err = ['Password Don\'t match'];
      setErrors(err);
      return;
    }
 

    try{
     const {user} = await auth.createUserWithEmailAndPassword(email, password)
     await handleUserProfile(user, {displayName});
     reset();
     props.history.push('/')
    }
    catch(err){
        console.log(err);
    }
  }

  const configSignUP = {
      headline: 'SIGN UP'
    }
    return (
      <AuthWrapper {...configSignUP}>
          
          <div className="formWrap">
          {errors.length>0 && (
            <ul>
              {errors.map((err, index)=>{
                return (
                  <li key={index}>
                  {err}
                  </li>
                )
              })}
            </ul>
          )}
          <form onSubmit={handleFormSubmit}>
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              placeholder="Full name"
              handleChange = {e=> setDisplayName(e.target.value)}
            />

            <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange = {e=> setEmail(e.target.value)}
           
          />
          <FormInput
          type="password"
          name="password"
          value={password}
          placeholder="password"
          handleChange = {e=> setPassword(e.target.value)}
           
        />
        <FormInput
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        placeholder="Confirm Password"
        handleChange = {e=> setconfirmPassword(e.target.value)}
           
      />

      <Button type="submit"> Register</Button>

      </form>
    </div>
  </AuthWrapper>
    );
  }


export default withRouter(SignUp);
