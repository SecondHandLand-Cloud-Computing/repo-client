import { useEffect, useMemo, useState, useCallback } from "react";
import { customerApi } from "@/api/customerApi";
import { mapCustomerListFromApiToUI, mapCustomerFromUIToApi } from "@/utils/customer.mapper";

export default function useCustomer({ pageSize = 8 } = {}) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  /* ===== FETCH ===== */
  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await customerApi.getList({
        page: 1,
        limit: 100,
      });

      setCustomers(mapCustomerListFromApiToUI(res.data.data));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  /* ===== UPDATE CUSTOMER ===== */
  const updateCustomer = async (id, formData) => {
    try {
      const payload = mapCustomerFromUIToApi(formData);
      await customerApi.update(id, payload);

      // ✅ giữ nguyên logic: update xong fetch lại
      await fetchCustomers();
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  /* ===== FILTER ===== */
  const filteredCustomers = useMemo(() => {
    const keyword = searchTerm.toLowerCase();

    return customers.filter(
      (c) =>
        c.id.toLowerCase().includes(keyword) ||
        c.email.toLowerCase().includes(keyword) ||
        c.name.toLowerCase().includes(keyword)
    );
  }, [customers, searchTerm]);

  /* ===== PAGINATION ===== */
  const totalPages = Math.ceil(filteredCustomers.length / pageSize);

  const pagedCustomers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCustomers.slice(start, start + pageSize);
  }, [filteredCustomers, page, pageSize]);

  return {
    loading,
    error,

    customers: pagedCustomers,
    totalCustomers: filteredCustomers.length,
    totalPages,

    page,
    setPage,
    searchTerm,
    setSearchTerm,

    updateCustomer,
  };
}