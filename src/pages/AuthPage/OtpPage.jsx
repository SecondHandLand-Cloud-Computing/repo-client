import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/AuthLayout/FloatingInput";
import { authApi } from "@/api/authApi";
import { CheckCircle, XCircle } from "lucide-react";

const OtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mail, token: initialToken } = location.state || {};

  const [otp, setOtp] = useState("");
  const [token, setToken] = useState(initialToken || null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Nếu không có email hoặc token → quay lại forgot-password
    if (!mail || !token) {
      navigate("/forgot-password");
    }
  }, [mail, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp.trim()) {
      setError("Please enter OTP");
      return;
    }

    setLoading(true);
    try {
      // Gọi API verify OTP
      const res = await authApi.verifyOtp("forgot-password", token, otp);

      // Nếu status 2xx → OTP đúng
      if (res.status >= 200 && res.status < 300) {
        setSuccess("🎉 OTP verified successfully! Redirecting...");
        setTimeout(() => navigate("/reset-password", { state: { mail } }), 2000);
      }
    } catch (err) {
      console.error("❌ OTP verification error:", err);
      // Chỉ hiển thị lỗi một chỗ
      setError(err.response?.data?.message || err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Verify OTP">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        {/* ERROR BOX */}
        {error && (
          <div className="flex items-center gap-3 bg-red-100 text-red-800 border border-red-300 rounded-lg px-4 py-2">
            <XCircle size={20} className="text-red-600" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* SUCCESS BOX */}
        {success && (
          <div className="flex items-center gap-3 bg-green-100 text-green-800 border border-green-300 rounded-lg px-4 py-2">
            <CheckCircle size={20} className="text-green-600" />
            <span className="font-medium">{success}</span>
          </div>
        )}

        {/* FORM INPUT */}
        <FloatingInput
          id="otp"
          label="OTP"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          autoComplete="one-time-code"
          autoFocus
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7fa88d] hover:bg-[#6b9478] text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default OtpPage;
