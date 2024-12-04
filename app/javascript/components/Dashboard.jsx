import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, TextField, Box } from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRecipientEmailChange = (event) => {
    setRecipientEmail(event.target.value);
  };

  const sendReferralEmail = async () => {
    if (!recipientEmail) {
      alert("Please enter recipient's email.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/v1/users/referrals", {
        recipient_email: recipientEmail,
      });

      if (response.status === 200) {
        setEmail("");
        setRecipientEmail("");
        navigate("/dashboard");
      } else {
        throw new Error(response.data.error || "Failed to send referral email.");
      }
    } catch (error) {
      console.error("Error sending referral email:", error);
      alert(error.response?.data?.error || "An error occurred while sending the referral.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.delete("/api/v1/users/sign_out");

      if (response.status === 200) {
        navigate("/signup");
      } else {
        throw new Error(response.data.error || "Failed to logout.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert(error.response?.data?.error || "An error occurred during logout.");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Welcome to your Dashboard!
      </Typography>

      <Box mt={2}>
        <Typography variant="h6">Send Referral Email</Typography>
        <TextField
          label="Recipient's Email"
          value={recipientEmail}
          onChange={handleRecipientEmailChange}
          fullWidth
          margin="normal"
          type="email"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendReferralEmail}
          style={{ marginTop: "10px" }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Referral"}
        </Button>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        style={{ marginTop: "20px" }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
