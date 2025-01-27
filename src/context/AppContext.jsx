import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Teacher from '../models/Teacher.js';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const baseUrl = '/api';

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classRes, teacherRes, studentRes] = await Promise.all([
          axios.get(`${baseUrl}/classes`),
          axios.get(`${baseUrl}/teachers`),
          axios.get(`${baseUrl}/students`),
        ]);
        setClasses(classRes.data);
        setTeachers(teacherRes.data);
        setStudents(studentRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // CRUD operations for classes
  const addClass = async (newClass) => {
    try {
      console.log('Adding new class:', {
        ...newClass,
        teacherIdType: typeof newClass.teacherId
      });
      
      const res = await axios.post(`${baseUrl}/classes`, newClass, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Class added successfully:', res.data);
      
      setClasses([...classes, res.data]);
      return res.data;
    } catch (error) {
      console.error('Error adding class:', error);
      console.error('Error response:', error.response);
      console.error('Error details:', error.response?.data);
      
      throw error;
    }
  };
  const updateClass = async (id, updatedClass) => {
    try {
      const res = await axios.put(`${baseUrl}/classes/${id}`, updatedClass);
      setClasses(classes.map((c) => (c._id === id ? res.data : c)));
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  const deleteClass = async (id) => {
    try {
      // Extract the class ID correctly
      const classId = typeof id === 'object' ? id._id?.$oid || id._id : id;
  
      console.log('Deleting class with ID:', classId);
  
      // Send the DELETE request
      await axios.delete(`${baseUrl}/classes/${classId}`);
  
      // Update the state by filtering out the deleted class
      setClasses(classes.filter((c) => (c._id?.$oid || c._id) !== classId));
    } catch (error) {
      console.error('Error deleting class:', error.response?.data || error.message);
    }
  };
  
  // CRUD operations for teachers
  const addTeacher = async (newTeacher) => {
    try {
      // Validate that assignedClass is provided and is a valid class ID
      // if (!newTeacher.assignedClass || !classes.find((c) => c._id === newTeacher.assignedClass)) {
      //   throw new Error('Invalid class selected');
      // }
  
      const formattedTeacher = {
        ...newTeacher,
        dob: new Date(newTeacher.dob).toISOString(),
        assignedClass: newTeacher.classId, // Ensure it's a valid class ID
      };
  
      console.log('Sending formatted teacher data:', formattedTeacher);
  
      const res = await axios.post(`${baseUrl}/teachers`, formattedTeacher);
      setTeachers([...teachers, res.data]);
      return res.data;
    } catch (error) {
      console.error('Error adding teacher:', error);
      console.error('Error response:', error.response?.data);
      throw error; // Re-throw to allow handling in the component
    }
  };

  const updateTeacher = async (id, updatedTeacher) => {
    try {
      // Extract the teacher's ID correctly
      const teacherId = typeof id === 'object' ? id._id?.$oid || id._id : id;
  
      // Format the teacher data for update
      const formattedTeacher = {
        ...updatedTeacher,
        dob: new Date(updatedTeacher.dob).toISOString(), // Ensure correct date format
        assignedClass: updatedTeacher.classId,    // Maintain assigned class ID
      };
  
      console.log('Updating teacher - ID:', teacherId);
      console.log('Teacher Data:', formattedTeacher);
  
      // Send the PUT request
      const res = await axios.put(`${baseUrl}/teachers/${teacherId}`, formattedTeacher);
  
      // Update the teachers' state
      setTeachers(teachers.map((t) => (t._id === teacherId ? res.data : t)));
  
      return res.data;
    } catch (error) {
      console.error('Error updating teacher:', error.response?.data || error.message);
      throw error; // Re-throw to allow handling in the component
    }
  };
  

  const deleteTeacher = async (id) => {
    try {
      // Ensure you're using the full ObjectId string
      const teacherId = typeof id === 'object' ? id._id.$oid : id;
  
      console.log('Deleting teacher with ID:', teacherId);
  
      await axios.delete(`${baseUrl}/teachers/${teacherId}`);
      setTeachers(teachers.filter((t) => (t._id.$oid ? t._id.$oid : t._id) !== teacherId));
    } catch (error) {
      console.error('Error deleting teacher:', error.response ? error.response.data : error);
  
      if (error.response) {
        console.error('Server response:', error.response.data);
      } else {
        console.error('Error:', error);
      }
    }
  };
  // CRUD operations for students
  const addStudent = async (newStudent) => {
    try {
      // Validate that classId is provided and is a number
      if (!newStudent.classId) {
        throw new Error('Class must be selected');
      }

      const formattedStudent = {
        ...newStudent,
        dob: new Date(newStudent.dob).toISOString(),
        classId: newStudent.classId, // Ensure it's a number
      };

      console.log('Sending formatted student data:', formattedStudent);

      const res = await axios.post(`${baseUrl}/students`, formattedStudent);
      setStudents([...students, res.data]);
      return res.data;
    } catch (error) {
      console.error('Error adding student:', error);
      console.error('Error response:', error.response?.data);
      throw error; // Re-throw to allow handling in the component
    }
  };

  const updateStudent = async (id, updatedStudent) => {
    try {
      // Ensure id is a string
      const studentId = typeof id === 'object' ? id._id : id;
      
      const formattedStudent = {
        ...updatedStudent,
        dob: new Date(updatedStudent.dob).toISOString(),
        classId: updatedStudent.classId,
      };
      
      console.log('Updating student - ID:', studentId);
      console.log('Student Data:', formattedStudent);
      
      const res = await axios.put(`${baseUrl}/students/${studentId}`, formattedStudent);
      console.log('Update response:', res.data);
      
      setStudents(students.map((s) => (s._id === id ? res.data : s)));
      return res.data;
    } catch (error) {
      console.error('Error updating student:', error);
      console.error('Error details:', error.response?.data);
      throw error;
    }
  };
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${baseUrl}/students/${id}`);
      setStudents(students.filter((s) => s._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  };
  return (
    <AppContext.Provider
      value={{
        classes,
        teachers,
        students,
        addClass,
        updateClass,
        deleteClass,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}