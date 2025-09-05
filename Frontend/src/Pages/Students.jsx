import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Plus } from "lucide-react";
import StudentFormModal from "@/components/StudentFormModal";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  const handleToggleReminder = async (id, currentValue) => {
    const newValue = !currentValue;

    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, {
        emailRemindersEnabled: newValue,
      });

      setStudents((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, emailRemindersEnabled: newValue } : s
        )
      );
    } catch (err) {
      console.error("Error updating emailRemindersEnabled:", err.message);
    }
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/export");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "students.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export CSV.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;
    try {
      const res = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
      alert("Failed to delete student.");
    }
  };

  const handleSendEmail = async (id, name) => {
    if (!window.confirm(`Send reminder email to ${name}?`)) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/students/${id}/send-email`,
        {
          method: "POST",
        }
      );
      if (!res.ok) throw new Error("Email send failed");
      alert("Email sent successfully!");
      fetchStudents(); // Refresh to update remindersSent count
    } catch (err) {
      console.error("Error sending email:", err);
      alert("Failed to send email.");
    }
  };

  const openAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Management</h1>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-green-600 px-3 py-2 rounded-md bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500"
          />
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors"
          >
            <Download size={16} /> Export CSV
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors"
          >
            <Plus size={16} /> Add Student
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-black shadow-lg rounded-lg border border-gray-200 dark:border-green-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-green-800">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider">CF Handle</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider">Current</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider">Max</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider">Last Synced</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider">Reminders</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider">Email Alerts</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-green-800">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{s.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{s.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{s.phone}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 dark:text-green-400 font-mono">
                    {s.codeforcesHandle}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-blue-600 dark:text-green-400">{s.currentRating ?? "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-blue-600 dark:text-green-400">{s.maxRating ?? "—"}</td>

                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {s.lastSynced
                      ? new Date(s.lastSynced).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "—"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-green-900 dark:text-green-200">
                      {s.remindersSent ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                    <button
                      onClick={() =>
                        handleToggleReminder(s._id, s.emailRemindersEnabled)
                      }
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                        s.emailRemindersEnabled
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      {s.emailRemindersEnabled ? "Enabled" : "Disabled"}
                    </button>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex flex-wrap gap-1">
                      <Link
                        to={`/students/${s._id}`}
                        className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-green-900 dark:text-green-200 rounded hover:bg-blue-200 dark:hover:bg-green-800 transition-colors"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => openEditModal(s)}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-green-900 dark:text-green-200 rounded hover:bg-blue-200 dark:hover:bg-green-800 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleSendEmail(s._id, s.name)}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-green-900 dark:text-green-200 rounded hover:bg-blue-200 dark:hover:bg-green-800 transition-colors"
                      >
                        Email
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="px-2 py-1 text-xs bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-10 text-gray-600 dark:text-gray-300"
                >
                  No students found.
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>

      <StudentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchStudents}
        student={editingStudent}
      />
    </div>
  );
}
