import TopUsersContainer from "../../components/Admin/TopUsersContainer";
import TopCategoriesContainer from "../../components/Admin/TopCategoriesContainer";

export default function Dashboard() {
  return (
    <div className="space-y-4">
      {/* TITLE */}
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      {/* CARD */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="h-full">
            <TopUsersContainer />
          </div>

          <div className="h-full">
            <TopCategoriesContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
