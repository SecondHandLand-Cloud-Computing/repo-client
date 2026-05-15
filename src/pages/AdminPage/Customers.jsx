import React, { useState } from "react";
import useCustomer from "@/hooks/useCustomer";
import { Search, ChevronLeft, ChevronRight, MoreVertical, X } from "lucide-react";

export default function Customers() {
  const {
    customers,
    loading,
    error,
    page,
    setPage,
    totalPages,
    totalCustomers,
    searchTerm,
    setSearchTerm,
    updateCustomer,
  } = useCustomer({ pageSize: 8 });

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);

  if (loading) return <div className="p-6 text-gray-500">Loading customers...</div>;
  if (error) return <div className="p-6 text-red-500">Failed to load customers</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Customers</h2>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        {/* SEARCH */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, email or ID"
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full text-sm">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="py-3 text-left">User</th>
              <th className="py-3 text-left">Email</th>
              <th className="py-3 text-center">Avg Rating</th>
              <th className="py-3 text-center">Total Rating</th>
              <th className="py-3 text-center">Status</th>
              <th className="py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y text-gray-700">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full" />
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-gray-400">{c.id}</div>
                    </div>
                  </div>
                </td>

                <td className="py-3">{c.email}</td>
                <td className="py-3 text-center">{c.ratingAvg}</td>
                <td className="py-3 text-center">{c.ratingTotal}</td>

                <td className="py-3 text-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      c.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="py-3 text-center">
                  <button
                    disabled={!c.id}
                    onClick={() => {
                      if (!c.id) return;

                      setSelectedCustomer(c);
                      setFormData({
                        ...c,
                        firstName: c.name.split(" ")[0],
                        lastName: c.name.split(" ").slice(1).join(" "),
                      });
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                  >
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-2">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft />
            </button>
            <span className="text-sm">
              Page {page} / {totalPages || 1}
            </span>
            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight />
            </button>
          </div>

          <div className="text-sm text-gray-500">
            {customers.length} / {totalCustomers} results
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedCustomer && formData && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative">
            <button
              onClick={() => {
                setSelectedCustomer(null);
                setFormData(null);
              }}
              className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Customer Detail</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <Input
                label="Email"
                value={formData.email}
                onChange={(v) => setFormData({ ...formData, email: v })}
              />
              <Input
                label="Phone"
                value={formData.phone}
                onChange={(v) => setFormData({ ...formData, phone: v })}
              />
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(v) => setFormData({ ...formData, firstName: v })}
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(v) => setFormData({ ...formData, lastName: v })}
              />
              <Select
                label="Status"
                value={formData.status}
                options={["Active", "Inactive"]}
                onChange={(v) => setFormData({ ...formData, status: v })}
              />
              <Select
                label="Role"
                value={formData.role}
                options={["Customer", "Admin"]}
                onChange={(v) => setFormData({ ...formData, role: v })}
              />
              <Input
                label="Failed Login Attempt"
                value={formData.failedLoginAttempt}
                onChange={(v) => setFormData({ ...formData, failedLoginAttempt: Number(v) })}
              />
              <Input
                label="Date of Birth"
                value={formData.dob}
                onChange={(v) => setFormData({ ...formData, dob: v })}
              />
              <Select
                label="Gender"
                value={formData.gender}
                options={["Male", "Female", "Other"]}
                onChange={(v) => setFormData({ ...formData, gender: v })}
              />
              <Input
                label="Address"
                value={formData.address}
                onChange={(v) => setFormData({ ...formData, address: v })}
                className="col-span-2"
              />
            </div>

            <div className="flex justify-end mt-6 gap-2">
              <button
                onClick={() => {
                  setSelectedCustomer(null);
                  setFormData(null);
                }}
                className="px-4 py-2 text-sm border rounded-lg"
              >
                Cancel
              </button>
              <button
                disabled={saving}
                onClick={async () => {
                  try {
                    setSaving(true);
                    await updateCustomer(selectedCustomer.id, formData);
                    setSelectedCustomer(null);
                    setFormData(null);
                  } catch {
                    alert("Update failed");
                  } finally {
                    setSaving(false);
                  }
                }}
                className={`px-4 py-2 text-sm rounded-lg text-white ${
                  saving ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== REUSABLE INPUTS ===== */

function Input({ label, value, onChange, className = "" }) {
  return (
    <div className={className}>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
      />
    </div>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}