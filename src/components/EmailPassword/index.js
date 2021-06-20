import React, { useState, useEffect } from "react";
import "./styles.scss";
import { withRouter } from "react-router-dom";
import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../Forms/FormInput";
import Button from "./../Forms/Button";
import { auth } from "./../../firebase/utils";

const EmailPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const config = {
        url: "http://localhost:3000/login",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
           props.history.push("/login");
        })
        .catch(() => {
          const err = ["Email not found"];
          setErrors(err);
        });
    } catch (err) {
      // console.log(err);
    }
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

export default withRouter(EmailPassword);
