import { useEffect, useState } from "react";
import "./Login.css";
import API from "./API";
import Header from "./Header";
function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  function handleChange(e) {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  }

  useEffect(() => {
    console.log(loginData);
  }, [loginData]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await API.post("/admin/login", { ...loginData });
      console.log("Login successful:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  }
  return (
    <div className="loginPage">
      <Header className="menuHeader" />
      <main className="loginMain">
        <form className="loginForm" onSubmit={handleLogin}>
          <div className="formUserName">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={loginData.username}
              onChange={handleChange}
            />
          </div>
          <div className="formPassword">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
          <button className="loginBtn">Login</button>
        </form>
      </main>
    </div>
  );
}

export default Login;
