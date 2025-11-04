import React, { useState, useEffect } from 'react';
import { AdminContext } from './adminContextValue';

export const AdminProvider = ({ children }) => {
  // Always enable admin mode (everyone can edit/delete)
  const [isAdminMode, setIsAdminMode] = useState(true);

  // Load admin mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('adminMode');
    // Default to true if not set
    setIsAdminMode(savedMode === 'false' ? false : true);
  }, []);

  // Store admin mode in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('adminMode', isAdminMode.toString());
  }, [isAdminMode]);

  const toggleAdminMode = () => {
    setIsAdminMode(prev => !prev);
  };

  return (
    <AdminContext.Provider value={{ isAdminMode, toggleAdminMode }}>
      {children}
    </AdminContext.Provider>
  );
};
