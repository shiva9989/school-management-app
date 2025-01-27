import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Table from '../../components/shared/Table';
import Button from '../../components/shared/Button';
import Modal from '../../components/shared/Modal';
import StudentForm from './StudentForm';

export default function StudentList() {
  const { students, classes, addStudent, updateStudent, deleteStudent } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const handleAdd = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = (student) => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent._id, formData);
      } else {
        await addStudent(formData);
      }
      setIsModalOpen(false);
    } catch (error) {
      // Optionally show an error message to the user
      alert('Failed to add/update student: ' + (error.response?.data?.message || error.message));
    }
  };

  const confirmDelete = async () => {
    try {
      if (studentToDelete) {
        await deleteStudent(studentToDelete._id);
        setShowDeleteConfirm(false);
        setStudentToDelete(null);
      }
    } catch (error) {
      alert('Failed to delete student: ' + (error.response?.data?.message || error.message));
    }
  };

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Class',
      accessorKey: 'classId',
      cell: info => {
        const classData = classes.find(c => c._id === info.getValue());
        return classData ? classData.name : 'Not Assigned';
      }
    },
    {
      header: 'Fees Paid',
      accessorKey: 'feesPaid',
      cell: info => `$${info.getValue()}`
    },
    {
      header: 'Actions',
      cell: info => (
        <div className="space-x-2">
          <Button
            variant="secondary"
            onClick={() => handleEdit(info.row.original)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(info.row.original)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Students</h1>
        <Button onClick={handleAdd}>Add Student</Button>
      </div>

      <Table data={students} columns={columns} />

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedStudent ? 'Edit Student' : 'Add New Student'}
      >
        <StudentForm
          initialData={selectedStudent}
          onSubmit={handleSubmit}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete {studentToDelete?.name}?</p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}