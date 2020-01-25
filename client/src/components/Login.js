import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Login = props => {
  // console.log("Login", props);

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  //console.log("Cred", credentials);

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    setIsLoading(true);
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={login}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
        <div className="loading">
          {isLoading && (
            <>
              <h2>Loading...</h2>
              <Loader type="Rings" color="red" height={80} width={80} />
            </>
           )}
        </div>
      </div>
    </>
  );
};

export default Login;
