import { useEffect, useState } from "react";
import "./Register.css";
import Header from "./Header";
import API from "./API";
function Register() {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setRegisterData({ ...registerData, [e.target.id]: e.target.value });
  }

  useEffect(() => {
    console.log(registerData);
  }, [registerData]);

  async function handleRegister(e) {
    e.preventDefault();

    if (
      !registerData.username ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      return;
    }

    try {
      const response = await API.post("admin/signup", {
        ...registerData,
      });
      console.log("register successful:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("register failed:", error.response.data.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  }
  return (
    <div className="registerPage">
      <Header className="menuHeader" />
      <main className="registerMain">
        <form className="registerForm" onSubmit={handleRegister}>
          <div className="formUserName">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={registerData.username}
              onChange={handleChange}
            />
          </div>
          <div className="formPassword">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              value={registerData.password}
              onChange={handleChange}
            />
          </div>

          <div className="formPassword">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button className="registerBtn">Register</button>
        </form>
      </main>
    </div>
  );
}

export default Register;
