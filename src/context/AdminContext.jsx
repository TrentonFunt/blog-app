import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Load admin mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('adminMode') === 'true';
    setIsAdminMode(savedMode);
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

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
