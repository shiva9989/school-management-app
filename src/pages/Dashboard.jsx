// src/pages/Dashboard.jsx
import { useApp } from '../context/AppContext';
import StatsCard from '../components/dashboard/StatsCard';
import AnalyticsGraph from '../components/dashboard/AnalyticsGraph';
import { UserGroupIcon, AcademicCapIcon, UserIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { classes, teachers, students } = useApp();

  const totalFees = students.reduce((sum, student) => sum + student.feesPaid, 0);
  const totalSalaries = teachers.reduce((sum, teacher) => sum + teacher.salary, 0);
//this only to give a proffesional ui, as it was for cuvette mockgraph data will be sufficient
  const mockGraphData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={students.length}
          icon={UserGroupIcon}
        />
        <StatsCard
          title="Total Teachers"
          value={teachers.length}
          icon={UserIcon}
        />
        <StatsCard
          title="Total Classes"
          value={classes.length}
          icon={AcademicCapIcon}
        />
        <StatsCard
          title="Revenue"
          value={`$${totalFees - totalSalaries}`}
          icon={CurrencyDollarIcon}
          // trend={5.5}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsGraph
          data={mockGraphData}
          title="Monthly Revenue"
        />
        <AnalyticsGraph
          data={mockGraphData}
          title="Student Enrollment"
        />
      </div>
    </div>
  );
}