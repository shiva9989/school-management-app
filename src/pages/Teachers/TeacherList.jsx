import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Table from '../../components/shared/Table';
import Button from '../../components/shared/Button';
import Modal from '../../components/shared/Modal';
import TeacherForm from './TeacherForm';

export default function TeacherList() {
  const { teachers, classes, addTeacher, updateTeacher, deleteTeacher } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  const handleAdd = () => {
    setSelectedTeacher(null);
    setIsModalOpen(true);
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleDelete = (teacher) => {
    setTeacherToDelete(teacher);
    setShowDeleteConfirm(true);
  };

  const handleSubmit = (formData) => {
    if (selectedTeacher) {
      updateTeacher(selectedTeacher._id, formData);
    } else {
      addTeacher(formData);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (teacherToDelete) {
      deleteTeacher(teacherToDelete._id);
      setShowDeleteConfirm(false);
      setTeacherToDelete(null);
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
      header: 'Assigned Class',
      accessorKey: 'assignedClass',
      cell: (info) => {
        const classData = classes.find((c) => c._id === info.getValue());
        return classData ? classData.name : 'Not Assigned';
      },
    },
    {
      header: 'Salary',
      accessorKey: 'salary',
      cell: (info) => `$${info.getValue()}`,
    },
    {
      header: 'Actions',
      cell: (info) => (
        <div className="space-x-2">
          <Button variant="secondary" onClick={() => handleEdit(info.row.original)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(info.row.original)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Teachers</h1>
        <Button onClick={handleAdd}>Add Teacher</Button>
      </div>

      <Table data={teachers} columns={columns} />

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTeacher ? 'Edit Teacher' : 'Add New Teacher'}
      >
        <TeacherForm initialData={selectedTeacher} onSubmit={handleSubmit} />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete {teacherToDelete?.name}?</p>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}