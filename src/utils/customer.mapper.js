import { CLOUDINARY_BASE_URL } from "@/constants/cloudinary";

export const mapCustomerListFromApiToUI = (customers = []) =>
  customers.map((c, index) => ({
    id: c._id ?? `customer-${index}`,

    name: `${c.name?.firstName ?? ""} ${c.name?.lastName ?? ""}`.trim(),
    email: c.mail ?? "",

    avatar: c.avatarUrl,
    // ? c.avatarUrl
    // : c.avatarPublicId
    //   ? `${CLOUDINARY_BASE_URL}/${c.avatarPublicId}`
    //   : `https://api.dicebear.com/7.x/initials/svg?seed=${c.name?.firstName ?? "User"}`,

    status: c.status === "active" ? "Active" : "Inactive",

    orders: 0,
    productsSold: 0,

    role: c.role === "admin" ? "Admin" : "Customer",
    failedLoginAttempt: c.failedLoginAttempts ?? 0,
    phone: c.phone ?? "",

    dob: c.dateOfBirth ? new Date(c.dateOfBirth).toISOString().slice(0, 10) : "",

    gender: c.gender === "male" ? "Male" : c.gender === "female" ? "Female" : "Other",

    address: c.address ?? "",
    ratingAvg: typeof c.stats?.avg === "number" ? Math.round(c.stats.avg * 10) / 10 : 0,
    ratingTotal: c.stats?.total ?? 0,
  }));

export const mapCustomerFromUIToApi = (formData) => ({
  // Backend chấp nhận firstName, lastName trực tiếp
  firstName: formData.firstName?.trim(),
  lastName: formData.lastName?.trim(),

  mail: formData.email?.trim(),

  // Chuyển về lowercase như backend mong đợi
  status: formData.status === "Active" ? "active" : "inactive",
  role: formData.role === "Admin" ? "admin" : "customer",

  phone: formData.phone?.trim(),

  // Chuyển dob từ YYYY-MM-DD về ISO string (nếu có)
  dateOfBirth: formData.dob ? `${formData.dob}T00:00:00.000Z` : undefined,

  gender: formData.gender.toLowerCase(), // Male → male, Female → female, Other → other

  address: formData.address?.trim(),

  // Backend dùng số nhiều: failedLoginAttempts
  failedLoginAttempts: Number(formData.failedLoginAttempt) || 0,
});
