import React from 'react';
import { EmployeeProvider } from './context/EmployeeContext';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <EmployeeProvider>
      <EmployeeList />
    </EmployeeProvider>
  );
}

export default App;
