import { useState, useMemo, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import isToday from 'date-fns/isToday';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import { useTask } from '../context/TaskContext';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Custom component to display when there are no events
const NoEventsOverlay = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center p-4 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">No tasks scheduled</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Add tasks with due dates to see them here
      </p>
    </div>
  </div>
);

// Custom event component to display task details
const EventComponent = ({ event }) => {
  const { resource } = event;
  const priorityColors = {
    high: 'bg-red-500 dark:bg-red-600',
    medium: 'bg-yellow-500 dark:bg-yellow-600',
    low: 'bg-green-500 dark:bg-green-600'
  };
  
  const priorityColor = priorityColors[resource?.priority] || 'bg-blue-500 dark:bg-blue-600';
  
  return (
    <div className={`px-2 py-1 overflow-hidden rounded-md w-full h-full ${resource?.completed ? 'opacity-60' : 'opacity-95'}`}>
      <div className="flex items-center">
        <span className={`inline-block w-2 h-2 rounded-full mr-1 ${priorityColor}`}></span>
        <span className={`font-medium ${resource?.completed ? 'line-through' : ''}`}>
          {event.title}
        </span>
      </div>
    </div>
  );
};

// Custom task stats component to show statistics below the calendar
const TaskStats = ({ tasks }) => {
  // Calculate task statistics
  const totalTasks = tasks.length;
  const tasksWithDueDate = tasks.filter(task => task.dueDate).length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
  
  // Calculate completion percentage
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;
    
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-3 border dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">Scheduled</div>
        <div className="text-xl font-semibold mt-1">{tasksWithDueDate} / {totalTasks}</div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-3 border dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">Completed</div>
        <div className="text-xl font-semibold mt-1 text-green-600 dark:text-green-500">
          {completionPercentage}%
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-3 border dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">Pending</div>
        <div className="text-xl font-semibold mt-1 text-amber-600 dark:text-amber-500">
          {pendingTasks}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-3 border dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">High Priority</div>
        <div className="text-xl font-semibold mt-1 text-red-600 dark:text-red-500">
          {highPriorityTasks}
        </div>
      </div>
    </div>
  );
};

function TaskCalendar() {
  const { tasks, updateTask } = useTask();
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  // Define a custom toolbar component
  const CustomToolbar = (toolbar) => {
    const goToToday = () => {
      toolbar.onNavigate('TODAY');
    };
    
    const goToPrev = () => {
      toolbar.onNavigate('PREV');
    };
    
    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const goToMonth = () => {
      toolbar.onView('month');
    };
    
    const goToWeek = () => {
      toolbar.onView('week');
    };
    
    const goToDay = () => {
      toolbar.onView('day');
    };

    return (
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div className="flex space-x-1">
          <button 
            onClick={goToPrev}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-l-md"
          >
            &lt;
          </button>
          <button 
            onClick={goToToday}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Today
          </button>
          <button 
            onClick={goToNext}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-r-md"
          >
            &gt;
          </button>
        </div>
        
        <h2 className="text-xl font-semibold">
          {format(toolbar.date, 'MMMM yyyy')}
        </h2>
        
        <div className="flex rounded-md overflow-hidden">
          <button 
            onClick={goToMonth} 
            className={`px-3 py-1 text-sm ${toolbar.view === 'month' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
          >
            Month
          </button>
          <button 
            onClick={goToWeek}
            className={`px-3 py-1 text-sm ${toolbar.view === 'week' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
          >
            Week
          </button>
          <button 
            onClick={goToDay}
            className={`px-3 py-1 text-sm ${toolbar.view === 'day' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
          >
            Day
          </button>
        </div>
      </div>
    );
  };

  // Format tasks for react-big-calendar
  const events = useMemo(() => {
    return tasks
      .filter(task => task.dueDate) // Only include tasks with due dates
      .map(task => ({
        id: task._id,
        title: task.title,
        start: new Date(task.dueDate),
        end: new Date(task.dueDate),
        allDay: true,
        resource: task,
      }));
  }, [tasks]);

  // Day cell renderer to add styling to today and past days
  const dayPropGetter = (date) => {
    const isCurrentDay = isToday(date);
    const isPastDay = date < new Date(new Date().setHours(0, 0, 0, 0));
    
    if (isCurrentDay) {
      return {
        className: 'current-day',
        style: {
          backgroundColor: 'rgba(139, 92, 246, 0.15)', // Light purple for current day
        },
      };
    }
    
    if (isPastDay) {
      return {
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.03)', // Slight gray for past days
          color: '#999',
        },
      };
    }
    
    return {};
  };
  
  // Style events based on priority and completion status
  const eventPropGetter = (event) => {
    const { resource } = event;
    const baseStyle = {
      borderRadius: '4px',
      border: '0px',
      color: 'white',
      fontWeight: 500,
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
    };
    
    // Priority-based colors
    if (resource?.priority === 'high') {
      baseStyle.backgroundColor = resource.completed ? '#f87171' : '#ef4444'; // red
    } else if (resource?.priority === 'medium') {
      baseStyle.backgroundColor = resource.completed ? '#fbbf24' : '#f59e0b'; // amber
    } else if (resource?.priority === 'low') {
      baseStyle.backgroundColor = resource.completed ? '#34d399' : '#10b981'; // emerald
    } else {
      baseStyle.backgroundColor = resource.completed ? '#60a5fa' : '#3b82f6'; // blue
    }
    
    // Adjust style if task is completed
    if (resource?.completed) {
      baseStyle.opacity = 0.6;
    }
    
    return { style: baseStyle };
  };

  // Month view cells formatting
  const slotPropGetter = () => {
    return {
      className: 'custom-slot',
    };
  };
  
  // Handle event selection (clicking on a task)
  const handleSelectEvent = useCallback((event) => {
    const task = event.resource;
    if (task) {
      // Toggle task completion when clicked
      updateTask({
        ...task,
        completed: !task.completed
      });
    }
  }, [updateTask]);
  
  // Handle slot selection (clicking on an empty date)
  const handleSelectSlot = useCallback(({ start }) => {
    // You could potentially open task form with this date pre-selected
    console.log("Selected slot:", start);
    // This could open a modal or form to create a new task with this date
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800/90 backdrop-blur-sm border border-gray-700" style={{ height: '550px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100% - 8px)' }}
          views={{
            month: true,
            week: true,
            day: true
          }}
          view={view}
          date={date}
          onView={setView}
          onNavigate={setDate}
          dayPropGetter={dayPropGetter}
          eventPropGetter={eventPropGetter}
          slotPropGetter={slotPropGetter}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          components={{
            toolbar: CustomToolbar,
            event: EventComponent,
            noEventsInRange: NoEventsOverlay
          }}
          popup={true}
          selectable={true}
          drilldownView="day"
          showMultiDayTimes={false}
          messages={{
            today: 'Today',
            previous: 'Back',
            next: 'Next',
            month: 'Month',
            week: 'Week',
            day: 'Day',
            noEventsInRange: 'No tasks scheduled.',
          }}
        />
      </div>

      {/* Task Statistics */}
      <TaskStats tasks={tasks} />
    </div>
  );
}

export default TaskCalendar;
