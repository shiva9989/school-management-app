import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Table from '../../components/shared/Table';
import Button from '../../components/shared/Button';
import Modal from '../../components/shared/Modal';
import ClassForm from './ClassForm';
import { Link } from 'react-router-dom';

export default function ClassList() {
  const { classes, teachers, addClass, updateClass, deleteClass } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);

  const handleAdd = () => {
    setSelectedClass(null);
    setIsModalOpen(true);
  };

  const handleEdit = (classData) => {
    setSelectedClass(classData);
    setIsModalOpen(true);
  };

  const handleDelete = (classData) => {
    setClassToDelete(classData);
    setShowDeleteConfirm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      console.log('Received class data:', {
        ...formData,
        teacherIdType: typeof formData.teacherId
      });
  
      const classData = {
        name: formData.name,
        year: formData.year,
        teacherId: formData.teacherId,
        maxStudents: formData.maxStudents,
        fees: formData.fees,
        students: formData.students || []
      };
  
      console.log('Formatted class data:', {
        ...classData,
        teacherIdType: typeof classData.teacherId
      });
  
      if (selectedClass) {
        await updateClass(selectedClass._id, classData);
      } else {
        await addClass(classData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add/update class:', error);
      alert(`Failed to ${selectedClass ? 'update' : 'add'} class: ${error.message}`);
    }
  };
  const confirmDelete = () => {
    if (classToDelete) {
      deleteClass(classToDelete._id);
      setShowDeleteConfirm(false);
      setClassToDelete(null);
    }
  };

  const columns = [
    {
      header: 'Class Name',
      accessorKey: 'name',
      cell: info => (
        <Link 
          to={`/classes/${info.row.original._id}`} 
          className="text-primary-600 hover:text-primary-700"
        >
          {info.getValue() || 'Unnamed Class'}
        </Link>
      )
    },
    {
      header: 'Year',
      accessorKey: 'year',
      cell: info => info.getValue() || 'N/A'
    },
    {
      header: 'Teacher',
      accessorKey: 'teacherId',
      cell: info => {
        const teacherId = info.getValue();
        if (!teacherId) return 'Not Assigned';
        
        const teacher = teachers.find(t => t._id === teacherId);
        return teacher ? teacher.name : 'Not Assigned';
      }
    },
    {
      header: 'Max Students', // Updated header
    accessorKey: 'maxStudents', // Updated accessorKey
    cell: info => info.getValue() || 0 
    },
    {
      header: 'Actions',
      cell: info => (
        <div className="space-x-2">
          <Button 
            variant="secondary" 
            onClick={() => handleEdit(info.row.original)}
            disabled={!info.row.original._id}
          >
            Edit
          </Button>
          <Button 
            variant="danger" 
            onClick={() => handleDelete(info.row.original)}
            disabled={!info.row.original._id}
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
        <h1 className="text-2xl font-semibold text-gray-900">Classes</h1>
        <Button onClick={handleAdd}>Add Class</Button>
      </div>
      
      <Table 
        data={Array.isArray(classes) ? classes : []} 
        columns={columns} 
      />

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClass(null);
        }}
        title={selectedClass ? 'Edit Class' : 'Add New Class'}
      >
        <ClassForm
          initialData={selectedClass}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedClass(null);
          }}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setClassToDelete(null);
        }}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete {classToDelete?.name || 'this class'}?
            {classToDelete?.students?.length > 0 && (
              <span className="block text-red-600 mt-2">
                Warning: This class has {classToDelete.students.length} enrolled students.
              </span>
            )}
          </p>
          <div className="flex justify-end space-x-2">
            <Button 
              variant="secondary" 
              onClick={() => {
                setShowDeleteConfirm(false);
                setClassToDelete(null);
              }}
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