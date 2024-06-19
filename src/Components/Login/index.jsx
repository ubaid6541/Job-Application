import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();

  //    variable   function
  const [allValues, setValues] = useState({
    username: "",
    password: "",
    showErrorMsg: false,
    errorMsg: "",
  });

  const onFetchUserDetails = async (event) => {
    event.preventDefault();

    const userDetails = {
      username: allValues.username,
      password: allValues.password,
    };

    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const fetchData = await response.json();

    if (response.ok === true) {
      setValues({ ...allValues, showErrorMsg: false });
      Cookies.set("jwtToken", fetchData.jwt_token);
      navigate("/");
    } else {
      setValues({
        ...allValues,
        showErrorMsg: true,
        errorMsg: fetchData.error_msg,
      });
    }
  };

  const onChangeUsername = (event) => {
    setValues({ ...allValues, username: event.target.value });
  };

  const onChangePassword = (event) => {
    setValues({ ...allValues, password: event.target.value });
  };

  const token = Cookies.get("jwtToken");
  useEffect(() => {
    if (token !== undefined) {
      navigate("/");
    }
  });

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={onFetchUserDetails}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>UserName</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
              onChange={onChangeUsername}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={onChangePassword}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            {allValues.showErrorMsg ? (
              <p className="error-msg">{`* ${allValues.errorMsg}`}</p>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
