import React, { useState } from 'react';
import { Edit2, Trash2, Search, UserPlus, Users } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const AdminAccounts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState<'all' | 'admin' | 'employee'>('all');
  
  // Mock employee data
  const mockEmployees = [
    { id: '1', name: 'Admin User', username: 'admin', email: 'admin@durian.com', role: 'admin', status: 'active' },
    { id: '2', name: 'Sample Employee', username: 'employee', email: 'employee@durian.com', role: 'employee', status: 'active' },
    { id: '3', name: 'Budi Santoso', username: 'budi', email: 'budi@durian.com', role: 'employee', status: 'active' },
    { id: '4', name: 'Sarah Wijaya', username: 'sarah', email: 'sarah@durian.com', role: 'employee', status: 'active' },
    { id: '5', name: 'Dewi Lestari', username: 'dewi', email: 'dewi@durian.com', role: 'employee', status: 'inactive' },
    { id: '6', name: 'Ahmad Rahman', username: 'ahmad', email: 'ahmad@durian.com', role: 'employee', status: 'active' },
    { id: '7', name: 'Rina Manager', username: 'rina', email: 'rina@durian.com', role: 'admin', status: 'active' },
  ];
  
  // Filter employees based on search term and tab
  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (currentTab === 'all') return matchesSearch;
    return matchesSearch && employee.role === currentTab;
  });
  
  const handleEditEmployee = (id: string) => {
    console.log(`Edit employee with ID: ${id}`);
    // In a real app, this would open a modal or navigate to an edit page
  };
  
  const handleDeleteEmployee = (id: string) => {
    console.log(`Delete employee with ID: ${id}`);
    // In a real app, this would show a confirmation dialog and then delete
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Account Management</h1>
        <p className="text-gray-600">Manage employee and admin accounts.</p>
      </div>
      
      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="mb-4 sm:mb-0 w-full sm:w-auto">
            <div className="flex space-x-2">
              <Button 
                variant={currentTab === 'all' ? 'primary' : 'outline'} 
                onClick={() => setCurrentTab('all')}
              >
                All
              </Button>
              <Button 
                variant={currentTab === 'admin' ? 'primary' : 'outline'} 
                onClick={() => setCurrentTab('admin')}
              >
                Admins
              </Button>
              <Button 
                variant={currentTab === 'employee' ? 'primary' : 'outline'} 
                onClick={() => setCurrentTab('employee')}
              >
                Employees
              </Button>
            </div>
          </div>
          
          <div className="w-full sm:w-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative">
              <Input
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={18} />}
                className="w-full sm:w-64"
              />
            </div>
            
            <Button
              variant="primary"
              icon={<UserPlus size={18} />}
              onClick={() => console.log('Add new employee')}
            >
              Add New
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-durian-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-durian-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">@{employee.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        employee.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-durian-100 text-durian-800'
                      }`}>
                        {employee.role === 'admin' ? 'Admin' : 'Employee'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        employee.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {employee.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditEmployee(employee.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No accounts found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};