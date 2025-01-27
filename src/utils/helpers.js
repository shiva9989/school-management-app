// src/utils/helpers.js
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  export const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  
  export const getClassCapacityStatus = (currentStudents, maxStudents) => {
    const percentage = (currentStudents / maxStudents) * 100;
    if (percentage >= 90) return 'full';
    if (percentage >= 70) return 'filling';
    return 'available';
  };
  
  export const calculateClassStats = (classData, students) => {
    const classStudents = students.filter(s => s.classId === classData.id);
    const totalFeesPaid = classStudents.reduce((sum, student) => sum + student.feesPaid, 0);
    const totalFeesExpected = classData.fees * classStudents.length;
    const feeCollection = (totalFeesPaid / totalFeesExpected) * 100;
  
    return {
      totalStudents: classStudents.length,
      maleStudents: classStudents.filter(s => s.gender === 'Male').length,
      femaleStudents: classStudents.filter(s => s.gender === 'Female').length,
      feeCollection,
      totalFeesPaid,
      totalFeesExpected
    };
  };