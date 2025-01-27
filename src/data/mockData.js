// src/data/mockData.js
export const mockData = {
    classes: [
      {
        id: 1,
        name: "Class 10-A",
        year: 2024,
        teacherId: 1,
        maxStudents: 30,
        fees: 1000,
        students: [1, 2, 3]
      },
      {
        id: 2,
        name: "Class 9-B",
        year: 2024,
        teacherId: 2,
        maxStudents: 25,
        fees: 900,
        students: [4, 5]
      }
    ],
    
    teachers: [
      {
        id: 1,
        name: "John Doe",
        gender: "Male",
        dob: "1985-03-15",
        email: "john.doe@school.com",
        phone: "123-456-7890",
        salary: 5000,
        assignedClass: 1
      },
      {
        id: 2,
        name: "Jane Smith",
        gender: "Female",
        dob: "1990-07-22",
        email: "jane.smith@school.com",
        phone: "098-765-4321",
        salary: 4500,
        assignedClass: 2
      }
    ],
    
    students: [
      {
        id: 1,
        name: "Alice Johnson",
        gender: "Female",
        dob: "2010-05-12",
        email: "alice.j@school.com",
        phone: "111-222-3333",
        classId: 1,
        feesPaid: 800
      },
      {
        id: 2,
        name: "Bob Wilson",
        gender: "Male",
        dob: "2010-08-30",
        email: "bob.w@school.com",
        phone: "444-555-6666",
        classId: 1,
        feesPaid: 1000
      }
    ]
  };