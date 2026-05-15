const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
  if (!email) return "Email is required.";
  if (!emailRegex.test(email)) return "Please enter a valid email address.";
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  return null;
};

export const validateLogin = (values) => {
  const errors = {};
  errors.email = validateEmail(values.email);
  errors.password = validatePassword(values.password);
  return removeNull(errors);
};

export const validateRegister = (values) => {
  const errors = {};
  errors.email = validateEmail(values.email);
  errors.password = validatePassword(values.password);

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!values.agreeTerms) {
    errors.agreeTerms = "You must agree to the terms and conditions.";
  }

  return removeNull(errors);
};

export const validateChangePassword = (values) => {
  const errors = {};

  if (!values.oldPassword) {
    errors.oldPassword = "Current password is required.";
  }

  const pwdError = validatePassword(values.newPassword);
  if (pwdError) {
    errors.newPassword = pwdError;
  } else if (values.oldPassword && values.newPassword === values.oldPassword) {
    errors.newPassword = "New password must be different from the old one.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your new password.";
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return removeNull(errors);
};

export const validateForgotPassword = (values) => {
  const errors = {};
  errors.email = validateEmail(values.email);
  return removeNull(errors);
};

// Helper để xoá các field null
const removeNull = (obj) => {
  const cleaned = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) cleaned[key] = obj[key];
  });
  return cleaned;
};
