// src/hooks/useProducts.js
import { useEffect, useState } from "react";
import productApi from "@/api/productApi";
import { mapProducts } from "@/utils/mapProducts";

export default function useProducts({ pageSize = 8 }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ===== FETCH DATA ===== */
  useEffect(() => {
    fetchProducts();
  }, [page, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await productApi.getList({
        page,
        limit: pageSize,
        search: searchTerm,
      });

      const rawProducts = res?.data?.data?.data || [];
      const pagination = res?.data?.data?.pagination;

      const mapped = mapProducts(rawProducts);

      setProducts(mapped);
      setTotalPages(pagination?.totalPages || 1);
      setTotalResults(pagination?.total || mapped.length);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /* ===== UPDATE STATUS ===== */
  const updateProductStatus = async ({ id, status }) => {
    await productApi.updateStatus({ id, status });

    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  return {
    products,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    totalPages,
    totalResults,
    loading,
    error,
    updateProductStatus,
  };
}
