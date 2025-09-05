import React, { useEffect, useState } from 'react';

export default function StudentFormModal({ isOpen, onClose, onSuccess, student }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    codeforcesHandle: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        codeforcesHandle: student.codeforcesHandle || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        codeforcesHandle: '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = student
        ? `http://localhost:5000/api/students/${student._id}`
        : 'http://localhost:5000/api/students';

      const method = student ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save student');
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Form submission error:', err);
      alert(`Error: ${err.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-xl border border-gray-200 dark:border-green-800 w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {student ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white text-xl font-bold transition-colors"
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Full Name
            </label>
            <input
              name="name"
              placeholder="Enter full name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-green-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Email Address
            </label>
            <input
              name="email"
              placeholder="Enter email address"
              required
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-green-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              placeholder="Enter phone number"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-green-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Codeforces Handle
            </label>
            <input
              name="codeforcesHandle"
              placeholder="Enter Codeforces username"
              required
              value={formData.codeforcesHandle}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-green-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 dark:bg-green-600 text-white rounded-md hover:bg-blue-700 dark:hover:bg-green-700 transition-colors focus:ring-2 focus:ring-blue-500 dark:focus:ring-green-500 focus:ring-offset-2"
            >
              {student ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
