import { Container, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/v1/users/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: { email, password } }),
      });

      console.log(response)

      if (response.ok) {
        const data = await response.json();
        const { user, token } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        onLogin({ email: user.email, token });
        navigate("/dashboard");
      } else {
        const error = await response.json();
        alert(error.message || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <Container maxWidth="sm">
      <h2>Login</h2>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
      >
        Login
      </Button>
      
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleSignupRedirect}
        fullWidth
        style={{ marginTop: "10px" }}
      >
        Don't have an account? Sign Up
      </Button>
    </Container>
  );
};

export default Login;
