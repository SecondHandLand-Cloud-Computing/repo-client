import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/AuthLayout/FloatingInput";
import { authApi } from "@/api/authApi";
import { CheckCircle, XCircle } from "lucide-react";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mail } = location.state || {};

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mail) {
      navigate("/forgot-password");
    }
  }, [mail, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newPassword.trim() || !confirmPassword.trim()) {
      setError("Please fill in all fields!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.forgotPassword(mail, newPassword);

      if (res.status >= 200 && res.status < 300) {
        setSuccess("🎉 Password updated successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(res.data?.message || "Password reset failed");
      }
    } catch (err) {
      console.error("❌ Reset password error:", err);
      setError(err.response?.data?.message || err.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset Password">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        {error && (
          <div className="flex items-center gap-3 bg-red-100 text-red-800 border border-red-300 rounded-lg px-4 py-2">
            <XCircle size={20} className="text-red-600" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 bg-green-100 text-green-800 border border-green-300 rounded-lg px-4 py-2">
            <CheckCircle size={20} className="text-green-600" />
            <span className="font-medium">{success}</span>
          </div>
        )}

        <FloatingInput id="mail" label="Email" type="email" value={mail} disabled />

        <FloatingInput
          id="newPassword"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="new-password"
        />

        <FloatingInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7fa88d] hover:bg-[#6b9478] text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-60"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
