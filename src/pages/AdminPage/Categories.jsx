import React, { useEffect, useState } from "react";
import useCategory from "@/hooks/useCategory";
import { Search, ChevronLeft, ChevronRight, MoreVertical, X, Upload } from "lucide-react";

export default function Categories() {
  const {
    categories,
    loading,
    error,
    page,
    setPage,
    totalPages,
    totalCategories,
    searchTerm,
    setSearchTerm,
    updateCategory,
  } = useCategory({ pageSize: 8 });

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    imageFile: null,
    imagePreview: null,
  });

  /* ===== OPEN EDIT ===== */
  const openEditModal = (c) => {
    setSelectedCategory(c);
    setEditForm({
      name: c.name,
      description: c.description || "",
      imageFile: null,
      imagePreview: c.image || null,
    });
    setShowEditModal(true);
  };

  /* ===== UPDATE ===== */
  const handleUpdateCategory = async () => {
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("description", editForm.description);
    if (editForm.imageFile) {
      formData.append("image", editForm.imageFile);
    }

    await updateCategory(selectedCategory.id, formData);
    setShowEditModal(false);
  };

  /* ===== CLEAN PREVIEW ===== */
  useEffect(() => {
    return () => {
      if (editForm.imageFile && editForm.imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(editForm.imagePreview);
      }
    };
  }, [editForm.imagePreview]);

  if (loading) return <p className="text-sm text-gray-500">Loading categories...</p>;
  if (error) return <p className="text-sm text-red-500">Failed to load categories</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Categories</h2>

      <div className="bg-white rounded-xl border p-6">
        {/* SEARCH */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* TABLE */}
        <table className="w-full text-sm">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="py-3 text-left">Category</th>
              <th className="py-3 text-center">Total Products</th>
              <th className="py-3 text-center">Total Earning</th>
              <th className="py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <img src={c.image} className="w-10 h-10 rounded object-cover" />
                    <span className="font-medium">{c.name}</span>
                  </div>
                </td>
                <td className="py-3 text-center">{c.soldCount}</td>
                <td className="py-3 text-center">{c.revenue}</td>
                <td className="py-3 text-center">
                  <button
                    onClick={() => openEditModal(c)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between mt-6 text-sm">
          <span>{totalCategories} Results</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft />
            </button>
            {page}/{totalPages || 1}
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* ===== EDIT MODAL ===== */}
      {showEditModal && (
        <Modal title="Edit Category" onClose={() => setShowEditModal(false)} size="md">
          <Input
            label="Category Name"
            value={editForm.name}
            onChange={(v) => setEditForm({ ...editForm, name: v })}
          />
          <Textarea
            label="Description"
            value={editForm.description}
            onChange={(v) => setEditForm({ ...editForm, description: v })}
          />

          {/* IMAGE */}
          <div>
            <label className="text-xs text-gray-500">Category Image</label>
            <label className="mt-2 block cursor-pointer border-2 border-dashed rounded-lg p-2 text-center">
              {editForm.imagePreview ? (
                <img src={editForm.imagePreview} className="max-h-32 mx-auto rounded" />
              ) : (
                <div className="text-gray-400 flex flex-col items-center gap-2">
                  <Upload size={20} />
                  <span className="text-xs">Click to upload</span>
                </div>
              )}
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setEditForm((prev) => ({
                    ...prev,
                    imageFile: file,
                    imagePreview: URL.createObjectURL(file),
                  }));
                }}
              />
            </label>
          </div>

          <ModalFooter
            onCancel={() => setShowEditModal(false)}
            onConfirm={handleUpdateCategory}
            confirmText="Save Changes"
          />
        </Modal>
      )}
    </div>
  );
}

/* ===== REUSABLE ===== */

function Modal({ title, children, onClose, size = "md" }) {
  const maxWidthClass = size === "md" ? "max-w-md" : "max-w-lg";
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className={`bg-white w-full ${maxWidthClass} rounded-xl p-4 relative space-y-4`}>
        <button onClick={onClose} className="absolute right-4 top-4">
          <X size={18} />
        </button>
        <h3 className="text-xl font-semibold">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function ModalFooter({ onCancel, onConfirm, confirmText }) {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <button onClick={onCancel} className="px-4 py-2 border rounded-lg text-sm">
        Cancel
      </button>
      <button onClick={onConfirm} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">
        {confirmText}
      </button>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
      />
    </div>
  );
}
