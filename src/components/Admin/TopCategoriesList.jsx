export default function TopCategoriesList({ categories = [] }) {
  return (
    <div className="bg-white p-6 rounded-xl h-100">
      <h3 className="font-bold mb-6">Top categories by highest revenue</h3>

      <div className="space-y-5">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#7dac8c] text-white flex items-center justify-center font-bold">
              {c.rank}
            </div>

            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-gray-500">
                {(c.revenue ?? 0).toLocaleString("vi-VN")}point
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
