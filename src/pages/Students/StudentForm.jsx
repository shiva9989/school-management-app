// src/pages/Students/StudentForm.jsx
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';

export default function StudentForm({ initialData = null, onSubmit }) {
  const { classes } = useApp();
  const [formData, setFormData] = useState(initialData || {
    name: '',
    gender: '',
    dob: '',
    email: '',
    phone: '',
    classId: '',
    feesPaid: 0
  });

  // In StudentForm.jsx
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure classId is a string
    const submissionData = {
      ...formData,
      classId: typeof formData.classId === 'string' ? formData.classId : formData.classId.toString()
    };
    
    onSubmit(submissionData);
  };
  
  return (
    <Card title={initialData ? 'Edit Student' : 'Add New Student'}>
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
          <label className="block text-sm font-medium text-gray-700">Fees Paid</label>
          <input
            type="number"
            value={formData.feesPaid}
            onChange={(e) => setFormData({...formData, feesPaid: parseFloat(e.target.value)})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update' : 'Create'} Student
          </Button>
        </div>
      </form>
    </Card>
  );
}