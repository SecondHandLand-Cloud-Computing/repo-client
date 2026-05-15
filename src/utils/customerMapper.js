export const mapTopSellingCustomers = (customers, limit = 5) =>
  customers.slice(0, limit).map((c, index) => ({
    id: c._id,
    rank: index + 1,
    name: `${c.name.firstName} ${c.name.lastName}`,
    soldCount: c.soldCount,
    revenue: c.totalRevenue,
  }));
