'use client';

import { useState, useEffect } from 'react';
import { Upload, Calendar, Settings, LogOut, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Event, saveEvents, getEvents } from '@/utils/events';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('events');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({
    id: '',
    title: '',
    date: '',
    description: '',
    location: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Load events when component mounts
  useEffect(() => {
    const savedEvents = getEvents();
    setEvents(savedEvents);
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      const eventWithId = {
        ...newEvent,
        id: Date.now().toString(),
        image: imageUrl,
      };
      const updatedEvents = [...events, eventWithId];
      setEvents(updatedEvents);
      saveEvents(updatedEvents); // Save to localStorage

      // Reset form
      setNewEvent({
        id: '',
        title: '',
        date: '',
        description: '',
        location: '',
      });
      setSelectedImage(null);
    }
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('adminToken');
    Cookies.remove('adminToken', { path: '/' });
    
    // Redirect to login page
    router.push('/admin/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg text-gray-700 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            {isSidebarOpen && (
              <h2 className="text-xl font-bold text-red-600">Admin Panel</h2>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-600 hover:text-red-600"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <nav className="space-y-6">
            <button
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center space-x-4 p-2 rounded-lg transition-colors ${
                activeTab === 'events'
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <Calendar size={24} className="flex-shrink-0" />
              {isSidebarOpen && <span className="font-medium">Events</span>}
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center space-x-4 p-2 rounded-lg transition-colors ${
                activeTab === 'media'
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <Upload size={24} className="flex-shrink-0" />
              {isSidebarOpen && <span className="font-medium">Media</span>}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-4 p-2 rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <Settings size={24} className="flex-shrink-0" />
              {isSidebarOpen && <span className="font-medium">Settings</span>}
            </button>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 p-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={24} className="flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-red-600">Admin Panel</h1>
          <button onClick={toggleSidebar} className="p-2">
            {isSidebarOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        <div className="flex-1 p-4 lg:p-8">
          {activeTab === 'events' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manage Events</h2>
              <form onSubmit={handleEventSubmit} className="bg-white p-4 lg:p-6 rounded-lg shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full"
                      required
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                      rows={4}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                >
                  Add Event
                </button>
              </form>

              {/* Events List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-2">{event.date}</p>
                    <p className="text-gray-600 mb-2">{event.location}</p>
                    <p className="text-gray-600">{event.description}</p>
                    <div className="mt-4 flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Media Tab Content */}
          {activeTab === 'media' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Media Library</h2>
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full"
                    multiple
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {/* Removed uploadedImages.map */}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab Content */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md">
                {/* Add settings form here */}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
