import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useHistory } from "react-router-dom";
import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../Forms/FormInput";
import Button from "./../Forms/Button";
import {resetAllAuthForms, resetPasswordStart, resetUserState } from "../../redux/User/user.actions";
 import { useDispatch, useSelector } from "react-redux";

 const mapState= ({user})=>({
  resetPasswordSuccess:user.resetPasswordSuccess,
  userErr:user.userErr
 });


 const EmailPassword = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {userErr, resetPasswordSuccess} = useSelector(mapState)
  
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
 
  useEffect(()=>{
  if(resetPasswordSuccess){
    dispatch(resetUserState());
   history.push('/login');
   }
  }, [resetPasswordSuccess])


  useEffect(()=>{
   if(Array.isArray(userErr) && userErr.length>0){
     setErrors(userErr);
   }
 }, [userErr])
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(resetPasswordStart({email}));
  
  };

  const configAuthWrapper = {
    headline: "Forgot Password?",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return <li>{e}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={ e=> setEmail(e.target.value)}
          />
          <Button type="submit">Your Email?</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default  EmailPassword;
