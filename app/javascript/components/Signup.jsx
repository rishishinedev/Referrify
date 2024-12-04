import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/login");
      } else {
        const error = await response.json();
      }
    } catch (err) {
      console.error("Error during signup:", err);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <h2>Signup</h2>
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
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSignup}
        fullWidth
      >
        Signup
      </Button>
      <Button
          variant="outlined"
          color="secondary"
          onClick={handleLoginRedirect}
          fullWidth
          style={{ marginTop: "10px" }}
        >
          Already have an account? Login
        </Button>
    </Container>
  );
};

export default Signup;
