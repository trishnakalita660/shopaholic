import React, { useState, useEffect } from "react";
import AuthWrapper from "../AuthWrapper";
import Button from "../Forms/Button";
import FormInput from "../Forms/FormInput"; 
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from 'react-router-dom'
import {  signUpUserStart} from './../../redux/User/user.actions'

const mapState = ({user})=>({
  currentUser: user.currentUser,
  userErr: user.userErr
})

const SignUp = props=>{
  
  const {currentUser, userErr} = useSelector(mapState)
  const dispatch = useDispatch()
  const history = useHistory();
   const [displayName, setDisplayName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword,setconfirmPassword] = useState('');
   const [errors, setErrors] = useState([]);

   useEffect(()=>{

    if(currentUser){
     reset();
     
     history.push('/')
    }
   },[currentUser])

   useEffect(()=>{

    if(Array.isArray(userErr) && userErr.length>0){
      setErrors(userErr)
    }
   },[userErr])
  
   const reset = ()=>{
    setDisplayName('');
    setEmail('');
    setPassword('');
    setconfirmPassword('');
    setErrors([]);
   }
   const handleFormSubmit=  event =>{
    event.preventDefault();
    
   dispatch(signUpUserStart({
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


export default  SignUp;
