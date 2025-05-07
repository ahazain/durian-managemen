import React, { useState } from 'react';
import { Calendar, Plus, Search, Edit, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Schedule } from '../../types';

export const AdminScheduling: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Mock schedules data
  const mockSchedules: Schedule[] = [
    {
      id: '1',
      title: 'Morning Harvesting',
      description: 'Collect ripe durians from the east orchard',
      start: '2025-05-10T07:00:00',
      end: '2025-05-10T11:00:00',
      employeeId: '3',
      employeeName: 'Budi Santoso',
      status: 'pending',
    },
    {
      id: '2',
      title: 'Sorting and Cleaning',
      description: 'Sort and clean harvested durians',
      start: '2025-05-10T13:00:00',
      end: '2025-05-10T17:00:00',
      employeeId: '4',
      employeeName: 'Sarah Wijaya',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Quality Inspection',
      description: 'Inspect durians for quality assurance',
      start: '2025-05-11T09:00:00',
      end: '2025-05-11T12:00:00',
      employeeId: '6',
      employeeName: 'Ahmad Rahman',
      status: 'pending',
    },
    {
      id: '4',
      title: 'Packaging and Storage',
      description: 'Package quality durians and store in cold room',
      start: '2025-05-11T14:00:00',
      end: '2025-05-11T18:00:00',
      employeeId: '3',
      employeeName: 'Budi Santoso',
      status: 'pending',
    },
    {
      id: '5',
      title: 'Market Delivery',
      description: 'Deliver packaged durians to local market',
      start: '2025-05-12T06:00:00',
      end: '2025-05-12T10:00:00',
      employeeId: '4',
      employeeName: 'Sarah Wijaya',
      status: 'pending',
    },
  ];
  
  // Filter schedules based on search term
  const filteredSchedules = mockSchedules.filter(schedule => 
    schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.employeeName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatScheduleDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };
  
  const formatScheduleTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };
  
  const AddScheduleForm = () => (
    <Card className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Add New Schedule</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Title"
            placeholder="Schedule title"
            required
          />
          
          <div className="md:col-span-2">
            <Input
              label="Description"
              placeholder="Schedule description"
            />
          </div>
          
          <Input
            label="Start Date & Time"
            type="datetime-local"
            required
          />
          
          <Input
            label="End Date & Time"
            type="datetime-local"
            required
          />
          
          <Input
            label="Assign Employee"
            placeholder="Select employee"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button 
            variant="outline" 
            onClick={() => setShowAddForm(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="primary"
            type="submit"
          >
            Create Schedule
          </Button>
        </div>
      </form>
    </Card>
  );
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Scheduling</h1>
        <p className="text-gray-600">Create and manage work schedules for employees.</p>
      </div>
      
      {showAddForm ? (
        <AddScheduleForm />
      ) : (
        <div className="flex justify-end mb-6">
          <Button
            variant="primary"
            onClick={() => setShowAddForm(true)}
            icon={<Plus size={16} />}
          >
            Add New Schedule
          </Button>
        </div>
      )}
      
      <div className="mb-6">
        <Input
          placeholder="Search schedules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search size={18} />}
        />
      </div>
      
      <div className="space-y-4">
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule) => (
            <Card key={schedule.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-durian-100 rounded-md">
                      <Calendar className="h-5 w-5 text-durian-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{schedule.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{schedule.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          {formatScheduleDate(schedule.start)}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                          {formatScheduleTime(schedule.start)} - {formatScheduleTime(schedule.end)}
                        </span>
                        {schedule.employeeName && (
                          <span className="inline-flex items-center rounded-full bg-durian-yellow-50 px-2 py-1 text-xs font-medium text-durian-yellow-700">
                            {schedule.employeeName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Edit size={16} />}
                    onClick={() => console.log(`Edit schedule ${schedule.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<Trash size={16} />}
                    onClick={() => console.log(`Delete schedule ${schedule.id}`)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No schedules found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or create a new schedule.
              </p>
              <div className="mt-6">
                <Button
                  variant="primary"
                  onClick={() => setShowAddForm(true)}
                >
                  Create New Schedule
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};