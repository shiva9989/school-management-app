import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Card from '../../components/shared/Card';
import { PieChart, Pie, Cell, Legend } from 'recharts';

export default function ClassDetail() {
  const { id } = useParams(); // Ensure this matches the parameter in the route
  const { classes, teachers, students } = useApp();

  console.log('Class ID from route:', id); // Debugging log

  const classData = classes.find(c => c._id === id); // Compare string IDs
  const teacher = teachers.find(t => t._id === classData?.teacherId); // Ensure IDs match
  const classStudents = students.filter(s => String(s.classId) === id); // Ensure IDs match

  console.log('Class Data:', classData);
  console.log('Teacher Data:', teacher);

  const genderData = [
    { name: 'Male', value: classStudents.filter(s => s.gender === 'Male').length },
    { name: 'Female', value: classStudents.filter(s => s.gender === 'Female').length }
  ];

  const COLORS = ['#0ea5e9', '#ec4899'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Class Details: {classData?.name || 'Unknown'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Basic Information">
          <dl className="grid grid-cols-1 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Year</dt>
              <dd className="mt-1 text-sm text-gray-900">{classData?.year || 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Teacher</dt>
              <dd className="mt-1 text-sm text-gray-900">{teacher?.name || 'Not Assigned'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Total Students</dt>
              <dd className="mt-1 text-sm text-gray-900">{classStudents.length || 0}</dd>
            </div>
          </dl>
        </Card>

        <Card title="Gender Distribution">
          <PieChart width={400} height={300}>
            <Pie
              data={genderData}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {genderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </Card>

        <Card title="Students List">
          <div className="divide-y divide-gray-200">
            {classStudents.map(student => (
              <div key={student.id} className="py-3">
                <p className="text-sm font-medium text-gray-900">{student.name}</p>
                <p className="text-sm text-gray-500">{student.email}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
