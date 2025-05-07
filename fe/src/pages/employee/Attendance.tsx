import React, { useState } from 'react';
import { format } from 'date-fns';
import { CheckCircle, Calendar, Clock } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

export const EmployeeAttendance: React.FC = () => {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const today = new Date();
  
  // Mock attendance history
  const attendanceHistory = [
    { date: '2025-05-09', checkInTime: '07:45', status: 'verified' },
    { date: '2025-05-08', checkInTime: '07:50', status: 'verified' },
    { date: '2025-05-07', checkInTime: '08:05', status: 'verified', notes: 'Late - Traffic' },
    { date: '2025-05-06', checkInTime: '07:40', status: 'verified' },
    { date: '2025-05-05', checkInTime: '07:42', status: 'verified' },
    { date: '2025-05-04', checkInTime: '-', status: 'absent', notes: 'Sick leave' },
    { date: '2025-05-03', checkInTime: '07:47', status: 'verified' },
  ];
  
  const handleCheckIn = () => {
    setHasCheckedIn(true);
    // In a real app, this would submit the attendance to an API
    console.log('Checked in at:', format(new Date(), 'HH:mm:ss'));
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
        <p className="text-gray-600">Record your daily attendance and view history.</p>
      </div>
      
      {/* Today's Attendance */}
      <Card className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-durian-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Today's Attendance</h2>
            </div>
            <p className="text-gray-600 mt-1">
              {format(today, 'EEEE, MMMM d, yyyy')}
            </p>
            <p className="text-gray-600">
              Current Time: {format(today, 'h:mm a')}
            </p>
          </div>
          
          <div className="text-center">
            {hasCheckedIn ? (
              <div className="flex flex-col items-center">
                <div className="mb-2 p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="font-medium text-green-700">Checked In</p>
                <p className="text-green-600 text-sm">
                  {format(today, 'h:mm a')}
                </p>
              </div>
            ) : (
              <Button
                variant="primary"
                icon={<Clock size={18} />}
                onClick={handleCheckIn}
                size="lg"
              >
                Check In Now
              </Button>
            )}
          </div>
        </div>
      </Card>
      
      {/* Attendance History */}
      <Card title="Attendance History">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceHistory.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDate(record.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {record.checkInTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === 'verified' 
                        ? 'bg-green-100 text-green-800' 
                        : record.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status === 'verified' 
                        ? 'Present' 
                        : record.status === 'pending'
                        ? 'Pending'
                        : 'Absent'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {record.notes || '-'}
                    </div>
                  </td>
                </tr>
              ))}
              
              {hasCheckedIn && (
                <tr className="bg-green-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {format(today, 'MMMM d, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(today, 'HH:mm')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">-</div>
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