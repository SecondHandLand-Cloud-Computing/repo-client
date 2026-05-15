import { useState } from "react";

export const useForm = ({
  initialValues = {},
  validate = () => ({}),
  onSubmit = async () => {},
}) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, name, type, value, checked } = e.target;

    const key = name || id; // Ưu tiên name, fallback id

    setForm((prev) => {
      const updated = {
        ...prev,
        [key]: type === "checkbox" ? checked : value,
      };

      // realtime validation
      const validationErrors = validate(updated);
      setErrors(validationErrors);

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await onSubmit(form);
  };

  return {
    form,
    setForm,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
  };
};
