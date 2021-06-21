import React, { useState, useEffect } from "react";
import AuthWrapper from "../AuthWrapper";
import Button from "../Forms/Button";
import FormInput from "../Forms/FormInput"; 
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { withRouter} from 'react-router-dom'
import { resetAllAuthForms, signUpUser} from './../../redux/User/user.actions'

const mapState = ({user})=>({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
})

const SignUp = props=>{
  
  const {signUpError, signUpSuccess} = useSelector(mapState)
  const dispatch = useDispatch()
   const [displayName, setDisplayName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword,setconfirmPassword] = useState('');
   const [errors, setErrors] = useState([]);

   useEffect(()=>{

    if(signUpSuccess){
     reset();
     dispatch(resetAllAuthForms)
     props.history.push('/')
    }
   },[signUpSuccess])

   useEffect(()=>{

    if(Array.isArray(signUpError) && signUpError.length>0){
      setErrors(signUpError)
    }
   },[signUpError])
  
   const reset = ()=>{
    setDisplayName('');
    setEmail('');
    setPassword('');
    setconfirmPassword('');
    setErrors([]);
   }
   const handleFormSubmit=  event =>{
    event.preventDefault();
    
   dispatch(signUpUser({
    displayName, 
    email, 
    password,
    confirmPassword
   }));
   
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
