import React, { useContext, useState } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import './EmployeeForm.css';

const validateEmail = email => /\S+@\S+\.\S+/.test(email);
const validateName = name => /^[a-zA-Z\s]+$/.test(name);

const EmployeeForm = ({ initialData, closeForm }) => {
  const { addEmployee, updateEmployee } = useContext(EmployeeContext);
  const safeInitialData = initialData || {};

  const [formData, setFormData] = useState({
    name: safeInitialData.name || '',
    email: safeInitialData.email || '',
    dob: safeInitialData.dob?.substring(0, 10) || '',
    address: safeInitialData.address || '',
    photo: null
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateName(formData.name)) return alert("Invalid name (only alphabets and spaces allowed)");
    if (!validateEmail(formData.email)) return alert("Invalid email format");

    try {
      if (safeInitialData._id) {
        await updateEmployee(safeInitialData._id, formData);
      } else {
        await addEmployee(formData);
      }
      closeForm();
    } catch (error) {
      if (error.response?.data?.message === 'Email already exists') {
        alert('Email already exists. Please use a different email.');
      } else {
        alert('Something went wrong!');
        console.error(error);
      }
    }
  };

  return (
    <div className="employee-form-overlay">
      <form onSubmit={handleSubmit} className="employee-form-container">
        <h2>{safeInitialData._id ? 'Edit Employee' : 'Add New Employee'}</h2>

        <div className="form-group">
          <label htmlFor="name">Name:*</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:*</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            id="dob"
            name="dob"
            type="date"
            max={new Date().toISOString().split("T")[0]}
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo:</label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {safeInitialData._id ? 'Update Employee' : 'Add Employee'}
          </button>
          <button type="button" onClick={closeForm} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
