import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/AuthLayout/FloatingInput";
import { authApi } from "@/api/authApi";
import { CheckCircle, XCircle } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mail: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ========================
  // LOAD REMEMBER EMAIL
  // ========================
  useEffect(() => {
    const savedMail = localStorage.getItem("savedMail");
    if (savedMail) {
      setForm((prev) => ({
        ...prev,
        mail: savedMail,
        rememberMe: true,
      }));
    }
  }, []);

  // ========================
  // VALIDATE FORM
  // ========================
  const validate = (values) => {
    const errs = {};
    if (!values.mail) {
      errs.mail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.mail)) {
      errs.mail = "Email is invalid";
    }
    if (!values.password) {
      errs.password = "Password is required";
    }
    return errs;
  };

  // ========================
  // HANDLE INPUT CHANGE
  // ========================
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const nextForm = {
      ...form,
      [id]: type === "checkbox" ? checked : value,
    };
    setForm(nextForm);
    setErrors(validate(nextForm));
  };

  // ========================
  // SUBMIT LOGIN
  // ========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSuccess("");

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const res = await authApi.login(form.mail, form.password);

      // Backend trả: { id, role }
      const user = res.data?.data || res.data;

      if (!user || !user.role) {
        throw new Error("User role not found");
      }

      // Lưu user vào localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          role: user.role,
        })
      );

      // Remember email
      if (form.rememberMe) {
        localStorage.setItem("savedMail", form.mail);
      } else {
        localStorage.removeItem("savedMail");
      }

      setSuccess("🎉 Login successful! Redirecting...");

      // Redirect theo role
      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }, 800);
    } catch (err) {
      console.error("Login failed:", err);
      const message = err.response?.data?.message || err.message || "Login failed";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Login">
      <p className="text-gray-600 mb-6 text-center text-base">Please enter your login details</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md mx-auto">
        {apiError && (
          <div className="flex items-center gap-3 bg-red-100 text-red-800 border border-red-300 rounded-lg px-4 py-2">
            <XCircle size={20} className="text-red-600" />
            <span className="font-medium">{apiError}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-3 bg-green-100 text-green-800 border border-green-300 rounded-lg px-4 py-2">
            <CheckCircle size={20} className="text-green-600" />
            <span className="font-medium">{success}</span>
          </div>
        )}

        <FloatingInput
          id="mail"
          type="email"
          label="Email"
          value={form.mail}
          onChange={handleChange}
          error={errors.mail}
        />

        <FloatingInput
          id="password"
          type="password"
          label="Password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
        />

        <div className="flex justify-between items-center text-sm flex-wrap gap-2 text-[#4b8063]">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={form.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 accent-[#7fa88d]"
            />
            Remember Me
          </label>

          <a href="/forgot-password" className="font-semibold hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#7fa88d] hover:bg-[#6b9478] text-white font-semibold py-3 rounded-lg w-full text-lg disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-[#4b8063] mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="font-semibold hover:underline">
            Create Account
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
