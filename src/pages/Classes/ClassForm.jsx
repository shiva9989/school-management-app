import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Button from '../../components/shared/Button';
import Card from '../../components/shared/Card';

export default function ClassForm({ initialData = null, onSubmit }) {
  const { teachers } = useApp();
  const [formData, setFormData] = useState(initialData || {
    name: '',
    year: new Date().getFullYear(),
    teacherId: '',
    maxStudents: 30,
    fees: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting class data:', {
      ...formData,
      teacherId: formData.teacherId, // Explicitly log teacherId
      teacherIdType: typeof formData.teacherId // Log the type of teacherId
    });
    onSubmit(formData);
  };

  return (
    <Card title={initialData ? 'Edit Class' : 'Add New Class'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Class Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Teacher
          </label>
          <select
            value={formData.teacherId}
            onChange={(e) => setFormData({...formData, teacherId: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Select Teacher</option>
            {teachers.map(teacher => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Maximum Students
          </label>
          <input
            type="number"
            value={formData.maxStudents}
            onChange={(e) => setFormData({...formData, maxStudents: parseInt(e.target.value)})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fees
          </label>
          <input
            type="number"
            value={formData.fees}
            onChange={(e) => setFormData({...formData, fees: parseFloat(e.target.value)})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update' : 'Create'} Class
          </Button>
        </div>
      </form>
    </Card>
  );
}