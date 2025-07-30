/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-mixed-operators */
import React, { useContext, useState } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import EmployeeForm from './EmployeeForm';
import './EmployeeList.css';

const EmployeeList = () => {
  const { employees, deleteEmployee, loading } = useContext(EmployeeContext);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const getPhotoSrc = (photo) => {
    try {
      if (
        !photo ||
        !photo.data ||
        !photo.contentType ||
        !Array.isArray(photo.data) && !Array.isArray(photo.data?.data)
      ) {
        return null;
      }

      const bufferArray = Array.isArray(photo.data) ? photo.data : photo.data.data;
      if (!Array.isArray(bufferArray)) return null;

      const uint8Array = new Uint8Array(bufferArray);
      const base64String = btoa(String.fromCharCode(...uint8Array));
      return `data:${photo.contentType};base64,${base64String}`;
    } catch (err) {
      console.error("Failed to convert photo:", err);
      return null;
    }
  };


  return (
    <div className="employee-list-container">
      <h1>Employee Directory</h1>

      <button
        className="add-employee-button"
        onClick={() => {
          setEditingEmployee(null);
          setShowForm(true);
        }}
      >
        + Add New Employee
      </button>

      {showForm && (
        <EmployeeForm
          closeForm={() => setShowForm(false)}
          initialData={editingEmployee || undefined}
        />
      )}

      {loading ? (
        <p className="loading-text">Loading employees...</p>
      ) : employees.length === 0 ? (
        <p className="no-employees-message">No employees to display. Add one to get started!</p>
      ) : (
        <ul className="employee-cards-grid">
          {employees.map(emp => (
            <li key={emp._id} className="employee-card">
              <div className="employee-info">
                {getPhotoSrc(emp.photo) && (
                  <img
                    src={getPhotoSrc(emp.photo)}
                    alt={`${emp.name}'s photo`}
                    className="employee-photo-thumbnail"
                  />
                )}
                <strong>{emp.name}</strong>
                <span>{emp.email}</span>
                <span>Age: {emp.age ? emp.age : 'N/A'}</span>
                {emp.address && <span>Address: {emp.address}</span>}
              </div>
              <div className="employee-actions">
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditingEmployee(emp);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteEmployee(emp._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeList;
