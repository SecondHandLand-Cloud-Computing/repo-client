import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/AuthLayout/FloatingInput";
import { authApi } from "@/api/authApi";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [mail, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate email format
  const validate = (value) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email is invalid";
    return "";
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(validate(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate(mail);
    setError(validationError);
    if (validationError) return;

    setLoading(true);
    try {
      // ✅ Gửi object { mail } đúng backend
      const res = await authApi.sendOtp("forgot-password", { mail });
      console.log("OTP sent response:", res.data);

      const token = res.data.token;
      navigate("/verify-otp", { state: { mail, token } });
    } catch (err) {
      console.error("Send OTP failed:", err);
      const message = err.response?.data?.message || err.message || "Failed to send OTP";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <p className="text-gray-500 text-center mb-8">Enter your email to reset your password</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <FloatingInput
          id="mail"
          type="email"
          label="Email"
          value={mail}
          onChange={handleChange}
          error={error}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7fa88d] hover:bg-[#6b9478] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        <p className="text-center text-[#4b8063] mt-2">
          Remember your password?{" "}
          <a href="/login" className="font-semibold hover:underline">
            Back to Login
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
