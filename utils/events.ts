export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  image?: string;
}

// Save events to localStorage
export const saveEvents = (events: Event[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('events', JSON.stringify(events));
  }
};

// Get events from localStorage
export const getEvents = (): Event[] => {
  if (typeof window !== 'undefined') {
    const events = localStorage.getItem('events');
    return events ? JSON.parse(events) : [];
  }
  return [];
};
