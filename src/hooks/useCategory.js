import { useEffect, useMemo, useState } from "react";
import { categoryApi } from "@/api/categoryApi";
import { mapCategoryListFromApiToUI } from "@/utils/category.mapper";

export default function useCategory({ pageSize = 8 } = {}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  /* ===== FETCH ===== */
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await categoryApi.getList();
      setCategories(mapCategoryListFromApiToUI(res.data.data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ===== FILTER ===== */
  const filteredCategories = useMemo(() => {
    return categories.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [categories, searchTerm]);

  /* ===== PAGINATION ===== */
  const totalPages = Math.ceil(filteredCategories.length / pageSize);

  const pagedCategories = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCategories.slice(start, start + pageSize);
  }, [filteredCategories, page, pageSize]);

  /* ===== UPDATE ONLY ===== */
  const updateCategory = async (id, formData) => {
    await categoryApi.update(id, formData);
    fetchCategories();
  };

  return {
    categories: pagedCategories,
    totalCategories: filteredCategories.length,
    totalPages,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    updateCategory,
  };
}
