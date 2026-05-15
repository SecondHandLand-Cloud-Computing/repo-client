import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/AuthLayout/FloatingInput";
import { authApi } from "@/api/authApi";

const ChangePasswordPage = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  // Validation logic
  const validate = (values) => {
    const errs = {};
    if (!values.oldPassword) errs.oldPassword = "Old password is required";
    if (!values.newPassword) errs.newPassword = "New password is required";
    if (!values.confirmPassword) errs.confirmPassword = "Please confirm your new password";
    if (
      values.newPassword &&
      values.confirmPassword &&
      values.newPassword !== values.confirmPassword
    ) {
      errs.confirmPassword = "Passwords do not match";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const nextForm = { ...form, [id]: value };
    setForm(nextForm);
    setErrors(validate(nextForm));
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await authApi.changePassword(form.oldPassword, form.newPassword);
      alert("Password changed successfully!"); // thay toast bằng alert đơn giản
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error("Change password failed:", err);
      setSubmitError(err.response?.data?.message || err.message || "Failed to change password");
    }
  };

  return (
    <AuthLayout title="Change Password">
      <p className="text-gray-500 text-center mb-8">Update your account password</p>

      {submitError && (
        <div className="mb-4 text-red-600 text-center font-medium">{submitError}</div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <FloatingInput
          id="oldPassword"
          type="password"
          label="Old Password"
          value={form.oldPassword}
          onChange={handleChange}
          error={errors.oldPassword}
        />

        <FloatingInput
          id="newPassword"
          type="password"
          label="New Password"
          value={form.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />

        <FloatingInput
          id="confirmPassword"
          type="password"
          label="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          className="w-full bg-[#7fa88d] hover:bg-[#6b9478] text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Update Password
        </button>
      </form>
    </AuthLayout>
  );
};

export default ChangePasswordPage;
