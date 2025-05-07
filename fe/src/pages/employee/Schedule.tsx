import React, { useState } from 'react';
import { Calendar, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Schedule } from '../../types';

export const EmployeeSchedule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock schedule data
  const today = new Date();
  const mockSchedules: Schedule[] = [
    {
      id: '1',
      title: 'Morning Harvesting',
      description: 'Collect ripe durians from the east orchard',
      start: format(addDays(today, 1), "yyyy-MM-dd'T'07:00:00"),
      end: format(addDays(today, 1), "yyyy-MM-dd'T'11:00:00"),
      status: 'pending',
    },
    {
      id: '2',
      title: 'Quality Inspection',
      description: 'Inspect harvested durians for quality grading',
      start: format(addDays(today, 2), "yyyy-MM-dd'T'09:00:00"),
      end: format(addDays(today, 2), "yyyy-MM-dd'T'12:00:00"),
      status: 'pending',
    },
    {
      id: '3',
      title: 'Packaging Durians',
      description: 'Package graded durians for market distribution',
      start: format(addDays(today, 2), "yyyy-MM-dd'T'13:00:00"),
      end: format(addDays(today, 2), "yyyy-MM-dd'T'16:00:00"),
      status: 'pending',
    },
    {
      id: '4',
      title: 'Market Delivery',
      description: 'Deliver packaged durians to the local market',
      start: format(addDays(today, 3), "yyyy-MM-dd'T'06:00:00"),
      end: format(addDays(today, 3), "yyyy-MM-dd'T'10:00:00"),
      status: 'pending',
    },
    {
      id: '5',
      title: 'Orchard Maintenance',
      description: 'Clean up the orchard and prepare for next harvest',
      start: format(addDays(today, 4), "yyyy-MM-dd'T'08:00:00"),
      end: format(addDays(today, 4), "yyyy-MM-dd'T'12:00:00"),
      status: 'pending',
    },
  ];
  
  // Helper functions
  const formatScheduleDate = (dateString: string) => {
    return format(new Date(dateString), 'EEEE, MMMM d, yyyy');
  };
  
  const formatScheduleTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };
  
  // Filter schedules based on search term
  const filteredSchedules = mockSchedules.filter(schedule => 
    schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get schedules for the selected date
  const schedulesForSelectedDate = filteredSchedules.filter(schedule => 
    isSameDay(new Date(schedule.start), selectedDate)
  );
  
  // Generate next 7 days for the date picker
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(today, i));
  
  // Navigate between weeks
  const navigatePreviousWeek = () => {
    setSelectedDate(prevDate => addDays(prevDate, -7));
  };
  
  const navigateNextWeek = () => {
    setSelectedDate(prevDate => addDays(prevDate, 7));
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Schedule</h1>
        <p className="text-gray-600">View your upcoming work schedule.</p>
      </div>
      
      {/* Date Navigation */}
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={navigatePreviousWeek}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-semibold">
            {format(selectedDate, 'MMMM yyyy')}
          </h3>
          <button
            onClick={navigateNextWeek}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {next7Days.map((date, index) => (
            <button
              key={index}
              className={`flex-shrink-0 flex flex-col items-center p-3 rounded-lg transition-colors ${
                isSameDay(date, selectedDate)
                  ? 'bg-durian-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <span className="text-xs font-medium">
                {format(date, 'EEE')}
              </span>
              <span className="text-lg font-bold">
                {format(date, 'd')}
              </span>
            </button>
          ))}
        </div>
      </Card>
      
      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Search schedules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search size={18} />}
        />
      </div>
      
      {/* Schedule List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {formatScheduleDate(selectedDate.toISOString())}
        </h3>
        
        {schedulesForSelectedDate.length > 0 ? (
          schedulesForSelectedDate.map((schedule) => (
            <Card key={schedule.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-durian-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-durian-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{schedule.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{schedule.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                      {formatScheduleTime(schedule.start)} - {formatScheduleTime(schedule.end)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No schedules for this day</h3>
              <p className="mt-1 text-sm text-gray-500">
                You don't have any scheduled tasks for {format(selectedDate, 'MMMM d, yyyy')}.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};