// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import ClassList from './pages/Classes/ClassList';
import ClassDetail from './pages/Classes/ClassDetail';
import TeacherList from './pages/Teachers/TeacherList';
import StudentList from './pages/Students/StudentList';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/classes" element={<ClassList />} />
                <Route path="/classes/:id" element={<ClassDetail />} />
                <Route path="/teachers" element={<TeacherList />} />
                <Route path="/students" element={<StudentList />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}