// src/pages/Teachers/TeacherForm.jsx
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';

export default function TeacherForm({ initialData = null, onSubmit }) {
  const { classes } = useApp();
  const [formData, setFormData] = useState(initialData || {
    name: '',
    gender: '',
    dob: '',
    email: '',
    phone: '',
    salary: 0,
    assignedClass: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card title={initialData ? 'Edit Teacher' : 'Add New Teacher'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({...formData, gender: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({...formData, dob: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Class</label>
          <select
            value={formData.classId}
            onChange={(e) => setFormData({...formData, classId: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Select Class</option>
            {classes.map(classItem => (
              <option key={classItem._id} value={classItem._id}>
                {classItem.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Salary</label>
          <input
            type="number"
            value={formData.salary}
            onChange={(e) => setFormData({...formData, salary: parseFloat(e.target.value)})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update' : 'Create'} Teacher
          </Button>
        </div>
      </form>
    </Card>
  );
}