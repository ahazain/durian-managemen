import React, { useState } from 'react';
import { CheckCircle, Search, Filter, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Attendance } from '../../types';

export const AdminAttendance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'unverified'>('all');
  
  // Mock attendance data
  const mockAttendance: Attendance[] = [
    {
      id: '1',
      employeeId: '3',
      employeeName: 'Budi Santoso',
      date: '2025-05-10',
      checkInTime: '07:45:00',
      verified: false,
      notes: '',
    },
    {
      id: '2',
      employeeId: '4',
      employeeName: 'Sarah Wijaya',
      date: '2025-05-10',
      checkInTime: '07:52:00',
      verified: false,
      notes: '',
    },
    {
      id: '3',
      employeeId: '6',
      employeeName: 'Ahmad Rahman',
      date: '2025-05-10',
      checkInTime: '08:05:00',
      verified: true,
      notes: 'Late due to traffic',
    },
    {
      id: '4',
      employeeId: '3',
      employeeName: 'Budi Santoso',
      date: '2025-05-09',
      checkInTime: '07:40:00',
      verified: true,
      notes: '',
    },
    {
      id: '5',
      employeeId: '4',
      employeeName: 'Sarah Wijaya',
      date: '2025-05-09',
      checkInTime: '07:48:00',
      verified: true,
      notes: '',
    },
  ];
  
  // Filter attendance records
  const filteredAttendance = mockAttendance.filter(record => {
    const matchesSearch = 
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.date.includes(searchTerm) ||
      record.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'verified') return matchesSearch && record.verified;
    if (filter === 'unverified') return matchesSearch && !record.verified;
    return matchesSearch;
  });
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };
  
  const handleVerify = (id: string) => {
    console.log(`Verify attendance with ID: ${id}`);
    // In a real app, this would call an API to verify the attendance
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendance Verification</h1>
        <p className="text-gray-600">Verify employee attendance records.</p>
      </div>
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mb-6">
        <div className="flex space-x-2">
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline'} 
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'verified' ? 'primary' : 'outline'} 
            onClick={() => setFilter('verified')}
          >
            Verified
          </Button>
          <Button 
            variant={filter === 'unverified' ? 'primary' : 'outline'} 
            onClick={() => setFilter('unverified')}
          >
            Unverified
          </Button>
        </div>
        
        <div className="w-full md:w-64">
          <Input
            placeholder="Search by name or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={18} />}
          />
        </div>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-in Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((attendance) => (
                  <tr key={attendance.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{attendance.employeeName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(attendance.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{attendance.checkInTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        attendance.verified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {attendance.verified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{attendance.notes || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {!attendance.verified && (
                        <Button
                          variant="success"
                          size="sm"
                          icon={<CheckCircle size={16} />}
                          onClick={() => handleVerify(attendance.id)}
                        >
                          Verify
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No attendance records found matching your criteria
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