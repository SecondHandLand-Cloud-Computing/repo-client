export default function TopUsersTable({ users = [] }) {
  return (
    <div className="bg-white p-6 rounded-xl h-full flex flex-col">
      <h3 className="font-bold mb-6">Top 5 Customers by Revenue</h3>

      <div className="flex-1">
        <table className="w-full text-sm border-collapse">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left pb-3">#</th>
              <th className="text-left pb-3">Customer</th>
              <th className="text-right pb-3">Products Sold</th>
              <th className="text-right pb-3">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b last:border-0">
                <td className="py-3">{u.rank}</td>
                <td className="py-3 font-medium">{u.name}</td>
                <td className="py-3 text-right">{u.soldCount}</td>
                <td className="py-3 text-right font-semibold">
                  {u.revenue.toLocaleString("vi-VN")}₫
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
