import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import axios from "Axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // setError("");
    // setSuccess("");

    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST_URL}/api/users/forgotpassword`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resonse", response);
      setSuccess("check your email");
      // navigate("/resetpassword");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600 pb-5">{success}</p>}
      <p className="mb-6">
        Enter your email address below, and we will send you a link to reset
        your password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
