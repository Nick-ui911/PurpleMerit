import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import Pagination from "./Pagination";
import Loader from "./Loader";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/users?page=${page}`);

      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.total);
      setCurrentPage(res.data.currentPage);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.patch(`/admin/users/${id}/status`, { status });
      toast.success("Status updated");
      fetchUsers(currentPage);
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUsers(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200 border-b">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr
                        key={u.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm">{u.email}</td>
                        <td className="px-4 py-3 text-sm">{u.fullName}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              u.status === "ACTIVE"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {u.status === "ACTIVE" ? (
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
                              onClick={() => updateStatus(u.id, "INACTIVE")}
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
                              onClick={() => updateStatus(u.id, "ACTIVE")}
                            >
                              Activate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
