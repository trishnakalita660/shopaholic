import React, {useState, useEffect, Component} from "react";
import Button from "../Forms/Button";
import "./styles.scss";
import { signInwithGoogle } from './../../firebase/utils'

class SignIn extends Component  {

    handleSubmit = async e=>{
        e.preventDefault();
    }

render(){

  return (
    <div className="signin">
      <div className="wrap">
        <h2>LOGIN</h2>

        <div className="formWrap">
        <form onSubmit = {this.handleSubmit}>
        <div className="socialSignin">
        <div className="row">
        <Button onClick= {signInwithGoogle}>
        Sign in with Google
        </Button>
        </div>
        </div>
        </form>
        </div>
      </div>
    </div>
  );

}
};

export default SignIn;
