"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Menu,
  X,
  ArrowRight,
  Calendar,
  Clock,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getEvents, Event } from '@/utils/events';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activePage, setActivePage] = useState("home");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedBlogPost, setSelectedBlogPost] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const scrollThreshold = 50; // minimum scroll distance to trigger hide/show

  const membershipLevels = [
    {
      level: "Bronze Member",
      fee: "₦10,000",
      benefits: [
        "Access to quarterly newsletters",
        "Invitation to annual general meeting",
        "Certificate of membership",
      ],
    },
    {
      level: "Silver Member",
      fee: "₦25,000",
      benefits: [
        "All Bronze benefits",
        "Priority registration for events",
        "Access to member-only workshops",
        "Quarterly mentorship sessions",
      ],
    },
    {
      level: "Gold Member",
      fee: "₦50,000",
      benefits: [
        "All Silver benefits",
        "Leadership opportunities",
        "Speaking opportunities at events",
        "Featured member profile",
        "Access to exclusive networking events",
      ],
    },
    {
      level: "Platinum Member",
      fee: "₦100,000",
      benefits: [
        "All Gold benefits",
        "Board member consideration",
        "VIP access to all events",
        "Personal development coaching",
        "Recognition in annual report",
        "Exclusive merchandise",
      ],
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setRegistrationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", registrationForm);
    // Reset form and close modal
    setRegistrationForm({
      fullName: "",
      email: "",
      phone: "",
      membershipLevel: "",
      occupation: "",
      reasonForJoining: "",
      yearsOfExperience: "",
      skills: "",
      interests: "",
    });
    setShowRegistrationModal(false);
  };

  const slides = [
    {
      id: 'slide-1',
      image:
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Uniben Past and Present",
      subtitle: "Serving humanity through dedication and compassion",
    },
    {
      id: 'slide-2',
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Making a Difference",
      subtitle: "Together we can create positive change",
    },
    {
      id: 'slide-3',
      image:
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Join Our Cause",
      subtitle: "Be part of something greater",
    },
  ];

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "projects", label: "Projects" },
    { id: "pictures", label: "Pictures" },
    { id: "blog", label: "Blog" },
    { id: "events", label: "Events" },
  ];

  const pictureFolders = [
    {
      id: "medical-camps",
      title: "Medical Camps",
      images: [
        "https://images.unsplash.com/photo-1584515933487-779824d29309",
        "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
      ],
    },
    {
      id: "community-outreach",
      title: "Community Outreach",
      images: [
        "https://images.unsplash.com/photo-1593113630400-ea4288922497",
        "https://images.unsplash.com/photo-1593113598332-cd288d649433",
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b",
      ],
    },
    {
      id: "health-education",
      title: "Health Education",
      images: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
      ],
    },
    {
      id: "volunteer-training",
      title: "Volunteer Training",
      images: [
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
      ],
    },
    {
      id: "emergency-response",
      title: "Emergency Response",
      images: [
        "https://images.unsplash.com/photo-1587745416684-47953f16f02f",
        "https://images.unsplash.com/photo-1587745416684-47953f16f02f",
        "https://images.unsplash.com/photo-1587745416684-47953f16f02f",
      ],
    },
    {
      id: "blood-drives",
      title: "Blood Drives",
      images: [
        "https://images.unsplash.com/photo-1615461066841-6116e61058f4",
        "https://images.unsplash.com/photo-1615461066841-6116e61058f4",
        "https://images.unsplash.com/photo-1615461066841-6116e61058f4",
      ],
    },
    {
      id: "first-aid",
      title: "First Aid Training",
      images: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
      ],
    },
    {
      id: "youth-programs",
      title: "Youth Programs",
      images: [
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
      ],
    },
    {
      id: "disaster-relief",
      title: "Disaster Relief",
      images: [
        "https://images.unsplash.com/photo-1587745416684-47953f16f02f",
        "https://images.unsplash.com/photo-1587745416684-47953f16f02f",
        "https://images.unsplash.com/photo-1587745416684-47953f16f02f",
      ],
    },
    {
      id: "community-service",
      title: "Community Service",
      images: [
        "https://images.unsplash.com/photo-1593113598332-cd288d649433",
        "https://images.unsplash.com/photo-1593113598332-cd288d649433",
        "https://images.unsplash.com/photo-1593113598332-cd288d649433",
      ],
    },
    {
      id: "health-awareness",
      title: "Health Awareness",
      images: [
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
      ],
    },
    {
      id: "special-events",
      title: "Special Events",
      images: [
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
      ],
    },
    {
      id: "awards",
      title: "Awards & Recognition",
      images: [
        "https://images.unsplash.com/photo-1569038786784-24a715a36507",
        "https://images.unsplash.com/photo-1569038786784-24a715a36507",
        "https://images.unsplash.com/photo-1569038786784-24a715a36507",
      ],
    },
    {
      id: "partnerships",
      title: "Partnerships",
      images: [
        "https://images.unsplash.com/photo-1556761175-b413da4baf72",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72",
      ],
    },
    {
      id: "workshops",
      title: "Workshops",
      images: [
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
      ],
    },
    {
      id: "celebrations",
      title: "Celebrations",
      images: [
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
      ],
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Essential First Aid Skills Every Volunteer Should Know",
      excerpt:
        "Learn the fundamental first aid techniques that can make a difference between life and death in emergency situations.",
      author: "Dr. Sarah Johnson",
      date: "March 15, 2024",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "First Aid",
    },
    {
      id: 2,
      title: "The Impact of Community Health Outreach Programs",
      excerpt:
        "Exploring how local health initiatives are transforming communities and improving public health outcomes.",
      author: "Michael Chen",
      date: "March 12, 2024",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Community Outreach",
    },
    {
      id: 3,
      title: "Volunteering in Healthcare: A Personal Journey",
      excerpt:
        "A volunteer's perspective on the challenges and rewards of serving in healthcare communities.",
      author: "Emma Williams",
      date: "March 10, 2024",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Volunteerism",
    },
    {
      id: 4,
      title: "Mental Health First Aid: Breaking the Stigma",
      excerpt:
        "Understanding the importance of mental health first aid and how to support those in crisis.",
      author: "Dr. James Patterson",
      date: "March 8, 2024",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Mental Health",
    },
    {
      id: 5,
      title: "Building Sustainable Health Programs in Communities",
      excerpt:
        "Strategies for creating lasting impact through sustainable community health initiatives.",
      author: "Lisa Thompson",
      date: "March 5, 2024",
      readTime: "9 min read",
      image:
        "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Community Development",
    },
    {
      id: 6,
      title: "Emergency Response: When Every Second Counts",
      excerpt:
        "Real-life stories and lessons from emergency response volunteers in critical situations.",
      author: "Robert Martinez",
      date: "March 3, 2024",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1587745416684-47953f16f02f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Emergency Response",
    },
    {
      id: 7,
      title: "Youth in Healthcare: Inspiring the Next Generation",
      excerpt:
        "How young volunteers are making a difference and shaping the future of healthcare.",
      author: "Jessica Lee",
      date: "February 28, 2024",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Youth Programs",
    },
    {
      id: 8,
      title: "The Role of Technology in Community Health",
      excerpt:
        "Exploring how digital innovations are revolutionizing community healthcare delivery.",
      author: "Tech. David Kumar",
      date: "February 25, 2024",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Healthcare Technology",
    },
    {
      id: 9,
      title: "Preventive Healthcare: The Community Approach",
      excerpt:
        "Understanding the importance of preventive care and community education in public health.",
      author: "Dr. Maria Rodriguez",
      date: "February 22, 2024",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Preventive Care",
    },
    {
      id: 10,
      title: "Cross-Cultural Healthcare: Bridging Gaps",
      excerpt:
        "Insights into providing culturally sensitive healthcare services in diverse communities.",
      author: "Dr. Ahmed Hassan",
      date: "February 20, 2024",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Cultural Competency",
    },
  ];

  const projects = [
    {
      id: "pad-up-project",
      title: "Pad UP Project",
      status: "Active Project",
      description: "A menstrual hygiene initiative providing free sanitary pads to secondary school girls, coupled with educational programs on menstrual health and hygiene management.",
      image: "/pad-up.jpeg",
      metrics: {
        value: "2,000+",
        label: "Girls Supported"
      },
      fullDescription: `Our Pad UP Project is a comprehensive menstrual hygiene initiative that aims to break barriers and promote dignity among secondary school girls.

Key Features:
- Free sanitary pad distribution
- Educational workshops on menstrual health
- Hygiene management training
- Peer support groups
- Parent and teacher engagement

Impact:
We have reached over 2,000 girls across multiple schools, providing them with both products and knowledge to manage their menstrual health with confidence.`
    },
    {
      id: "waca-project",
      title: "WACA (War Against Cardiac Arrest)",
      status: "Ongoing",
      description: "A comprehensive initiative focused on cardiac health awareness, prevention, and emergency response training in communities and schools.",
      image: "/waca-project.jpg",
      metrics: {
        value: "5,000+",
        label: "People Trained"
      },
      fullDescription: `The War Against Cardiac Arrest (WACA) project is our flagship initiative to combat sudden cardiac arrest through education and training.

Key Components:
- CPR training workshops
- AED awareness and usage training
- Cardiac health education
- Emergency response protocols
- Community outreach programs

Achievement:
Successfully trained over 5,000 individuals in life-saving techniques and emergency response procedures.`
    },
    // Add other projects here
  ];

  const [registrationForm, setRegistrationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    membershipLevel: "",
    occupation: "",
    reasonForJoining: "",
    yearsOfExperience: "",
    skills: "",
    interests: "",
  });

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
  };

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "home";
      setActivePage(hash);
    };

    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const currentScrollY = window.scrollY;
        const scrollDifference = currentScrollY - lastScrollY;

        // Always show navbar at the top of the page
        if (currentScrollY < scrollThreshold) {
          setIsNavbarVisible(true);
        } 
        // Hide navbar when scrolling down, show when scrolling up
        else if (Math.abs(scrollDifference) > scrollThreshold) {
          setIsNavbarVisible(scrollDifference < 0);
        }

        setLastScrollY(currentScrollY);
      }, 100); // debounce time
    };

    const savedEvents = getEvents();
    setEvents(savedEvents);

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleHashChange();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      clearInterval(autoSlideInterval);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-navy-900">Join UPP</h2>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* Membership Levels */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {membershipLevels.map((membership) => (
                <div
                  key={membership.level}
                  className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {membership.level}
                  </h3>
                  <p className="text-red-600 font-bold mb-3">
                    {membership.fee}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {membership.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={registrationForm.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={registrationForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={registrationForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Membership Level
                  </label>
                  <select
                    name="membershipLevel"
                    value={registrationForm.membershipLevel}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Select a level</option>
                    {membershipLevels.map((level) => (
                      <option key={level.level} value={level.level}>
                        {level.level}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={registrationForm.occupation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={registrationForm.yearsOfExperience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills & Expertise
                </label>
                <textarea
                  name="skills"
                  value={registrationForm.skills}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Why do you want to join UPP?
                </label>
                <textarea
                  name="reasonForJoining"
                  value={registrationForm.reasonForJoining}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Areas of Interest
                </label>
                <textarea
                  name="interests"
                  value={registrationForm.interests}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={3}
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowRegistrationModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}

      {/* Blog Post Modal */}
      {selectedBlogPost !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-navy-900">
                    {blogPosts.find(post => post.id === selectedBlogPost)?.title}
                  </h2>
                  <div className="flex items-center mt-2 text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span className="mr-4">
                      {blogPosts.find(post => post.id === selectedBlogPost)?.author}
                    </span>
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="mr-4">
                      {blogPosts.find(post => post.id === selectedBlogPost)?.date}
                    </span>
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                      {blogPosts.find(post => post.id === selectedBlogPost)?.readTime}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBlogPost(null)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
              
              <div className="relative h-[300px] mb-6">
                <img
                  src={blogPosts.find(post => post.id === selectedBlogPost)?.image}
                  alt={blogPosts.find(post => post.id === selectedBlogPost)?.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600">
                  {blogPosts.find(post => post.id === selectedBlogPost)?.excerpt}
                </p>
                {/* Add more content here - for now we're just showing the excerpt */}
                <p className="text-gray-600 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-gray-600 mt-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                  in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Project Modal */}
      {selectedProject !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-2">
                    {projects.find(p => p.id === selectedProject)?.status}
                  </span>
                  <h2 className="text-3xl font-bold text-navy-900">
                    {projects.find(p => p.id === selectedProject)?.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
              
              <div className="relative h-[300px] mb-6">
                <img
                  src={projects.find(p => p.id === selectedProject)?.image}
                  alt={projects.find(p => p.id === selectedProject)?.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="mb-6">
                  <div className="text-red-600 font-bold text-2xl">
                    {projects.find(p => p.id === selectedProject)?.metrics.value}
                  </div>
                  <div className="text-gray-600">
                    {projects.find(p => p.id === selectedProject)?.metrics.label}
                  </div>
                </div>

                <div className="whitespace-pre-line text-gray-600">
                  {projects.find(p => p.id === selectedProject)?.fullDescription}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Navbar */}
      <nav 
        className={`
          bg-[#17236b] 
          text-white 
          sticky 
          top-0 
          z-50 
          transition-transform 
          duration-300 
          ease-in-out
          ${isNavbarVisible ? "transform translate-y-0" : "transform -translate-y-full"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-5">
              <Image
                src={"/assets/redCross.png"}
                alt="UPP logo"
                width={50}
                height={50}
                className="object-cover z-10"
                priority
              />
              <div>
                <span className="text-xl font-bold md:hidden">UPP</span>
                <span className="text-xl font-bold hidden md:block">Uniben Past and Present</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors ${
                    activePage === item.id
                      ? "text-red-500 font-semibold border-b-2 border-red-500"
                      : "hover:text-red-500"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    activePage === item.id
                      ? "bg-red-500 text-white font-semibold"
                      : "hover:text-red-500"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {activePage === "about" ? (
        <section className="py-16 bg-gray-50" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-navy-900 mb-6">
                  About Us
                </h2>
                <div className="prose prose-lg">
                  <p className="text-gray-600 mb-6">
                    Birthed in 2016, Uniben Past and Present has grown from a
                    small group of passionate individuals into a thriving
                    community dedicated to making a difference. Our journey
                    began with a simple vision: to bridge the gap between past
                    and present students while serving humanity through
                    dedication and compassion.
                  </p>
                  <p className="text-gray-600 mb-6">
                    Over the years, we have expanded our reach and impact,
                    organizing numerous medical camps, community outreach
                    programs, and educational initiatives. Our commitment to
                    excellence and service has made us a beacon of hope in our
                    community.
                  </p>
                  <p className="text-gray-600">
                    Today, we continue to grow and evolve, staying true to our
                    core values of compassion, integrity, and dedication to
                    service. Join us in our mission to create positive change
                    and build a better future for all.
                  </p>
                </div>
                <div className="mt-8">
                  <button
                    onClick={() => setShowRegistrationModal(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                  >
                    Join Our Mission
                  </button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Community service"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-red-600 mb-2">9</div>
                  <div className="text-gray-600">Years of Service</div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  1000+
                </div>
                <div className="text-gray-600">Lives Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
                <div className="text-gray-600">Medical Camps</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">200+</div>
                <div className="text-gray-600">Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">30+</div>
                <div className="text-gray-600">Community Projects</div>
              </div>
            </div>
          </div>
        </section>
      ) : activePage === "pictures" ? (
        <section className="py-16 bg-gray-50" id="pictures">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-8">
              Photo Gallery
            </h2>

            {selectedFolder ? (
              <div>
                <button
                  onClick={() => setSelectedFolder("")}
                  className="mb-8 inline-flex items-center text-red-600 hover:text-red-700 font-semibold"
                >
                  <ArrowRight className="rotate-180 mr-2" size={16} /> Back to
                  Folders
                </button>
                <h3 className="text-2xl font-semibold text-navy-900 mb-6">
                  {pictureFolders.find((f) => f.id === selectedFolder)?.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pictureFolders
                    .find((f) => f.id === selectedFolder)
                    ?.images.map((image, idx) => (
                      <div
                        key={idx}
                        className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <img
                          src={`${image}?auto=format&fit=crop&w=800&q=80`}
                          alt={`Gallery image ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pictureFolders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className="group relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
                  >
                    <img
                      src={`${folder.images[0]}?auto=format&fit=crop&w=800&q=80`}
                      alt={folder.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <h3 className="text-white font-semibold p-4 w-full text-left">
                        {folder.title}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : activePage === "blog" ? (
        <section className="py-16 bg-gray-50" id="blog">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-8">
              Latest Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-2" />
                        <span className="mr-4">{post.author}</span>
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{post.readTime}</span>
                      </div>
                      <Link
                        href={`#${post.category.toLowerCase().replace(' ', '-')}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedBlogPost(post.id);
                        }}
                        className="group whitespace-nowrap inline-flex items-center justify-center px-4 py-2 font-medium transition-all bg-gradient-to-r from-red-600 to-red-500 rounded-md text-white hover:from-red-700 hover:to-red-600 active:scale-95 transform duration-200 ease-in-out"
                      >
                        Learn More
                        <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : activePage === "projects" ? (
        <section className="py-16 bg-gray-50" id="projects">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-8">
              Our Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pad UP Project */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img
                    src="/assets/pad-up.jpeg"
                    alt="Pad UP Project"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        Pad UP Project
                      </h3>
                      <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                        Active Project
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    A menstrual hygiene initiative providing free sanitary pads
                    to secondary school girls, coupled with educational programs
                    on menstrual health and hygiene management.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-red-600 font-semibold">2,000+</div>
                      <div className="text-gray-600">Girls Supported</div>
                    </div>
                    <Link
                      href="#pad-up-project"
                      onClick={(e) => {
                        e.preventDefault();
                        handleProjectClick("pad-up-project");
                      }}
                      className="group whitespace-nowrap inline-flex items-center justify-center px-4 py-2 font-medium transition-all bg-gradient-to-r from-red-600 to-red-500 rounded-md text-white hover:from-red-700 hover:to-red-600 active:scale-95 transform duration-200 ease-in-out"
                    >
                      Learn More
                      <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* WACA Project */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                    alt="WACA Project"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        WACA (War Against Cardiac Arrest)
                      </h3>
                      <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                        Ongoing
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    A comprehensive initiative focused on cardiac health
                    awareness, prevention, and emergency response training in
                    communities and schools.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-red-600 font-semibold">5,000+</div>
                      <div className="text-gray-600">People Trained</div>
                    </div>
                    <Link
                      href="#waca-project"
                      onClick={(e) => {
                        e.preventDefault();
                        handleProjectClick("waca-project");
                      }}
                      className="group whitespace-nowrap inline-flex items-center justify-center px-4 py-2 font-medium transition-all bg-gradient-to-r from-red-600 to-red-500 rounded-md text-white hover:from-red-700 hover:to-red-600 active:scale-95 transform duration-200 ease-in-out"
                    >
                      Learn More
                      <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Project HINIVUU */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                    alt="Project HINIVUU"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        Project HINIVUU
                      </h3>
                      <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                        Ongoing
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    HIV/AIDS awareness and prevention program, providing
                    education, testing services, and support for affected
                    communities.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-red-600 font-semibold">10,000+</div>
                      <div className="text-gray-600">People Reached</div>
                    </div>
                    <Link
                      href="#hinivuu-project"
                      onClick={(e) => {
                        e.preventDefault();
                        handleProjectClick("hinivuu-project");
                      }}
                      className="group whitespace-nowrap inline-flex items-center justify-center px-4 py-2 font-medium transition-all bg-gradient-to-r from-red-600 to-red-500 rounded-md text-white hover:from-red-700 hover:to-red-600 active:scale-95 transform duration-200 ease-in-out"
                    >
                      Learn More
                      <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* First Aid Plus */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                    alt="First Aid Plus"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        First Aid Plus
                      </h3>
                      <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                        Flagship Program
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Advanced first aid training program providing comprehensive
                    emergency response skills to healthcare students and
                    community volunteers.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-red-600 font-semibold">3,000+</div>
                      <div className="text-gray-600">Certified</div>
                    </div>
                    <Link
                      href="#first-aid-plus"
                      onClick={(e) => {
                        e.preventDefault();
                        handleProjectClick("first-aid-plus");
                      }}
                      className="group whitespace-nowrap inline-flex items-center justify-center px-4 py-2 font-medium transition-all bg-gradient-to-r from-red-600 to-red-500 rounded-md text-white hover:from-red-700 hover:to-red-600 active:scale-95 transform duration-200 ease-in-out"
                    >
                      Learn More
                      <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="mt-16 bg-[#17236b] rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-8 text-center">
                Our Impact
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">
                    20,000+
                  </div>
                  <div className="text-gray-300">Lives Impacted</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">4</div>
                  <div className="text-gray-300">Major Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">
                    50+
                  </div>
                  <div className="text-gray-300">Communities</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">9</div>
                  <div className="text-gray-300">Years of Impact</div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">
                Want to Support Our Projects?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Join us in making a difference. Whether through volunteering,
                donations, or partnerships, your support helps us create lasting
                impact in our communities.
              </p>
              <button
                onClick={() => setShowRegistrationModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
              >
                Get Involved
              </button>
            </div>
          </div>
        </section>
      ) : activePage === "events" ? (
        <section className="py-16 bg-gray-50" id="events">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-8">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.length > 0 ? (
                events.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {event.image && (
                      <div className="relative h-48">
                        <Image
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          fill
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <div className="text-gray-600 mb-2">
                        <p>{new Date(event.date).toLocaleDateString()}</p>
                        <p>{event.location}</p>
                      </div>
                      <p className="text-gray-700 mb-4">{event.description}</p>
                      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-600">
                  No upcoming events at this time.
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative h-[calc(100vh-80px)] overflow-hidden">
            <div className="absolute inset-0">
              <div
                className="relative h-full w-full"
                style={{ height: 'calc(100vh - 80px)' }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      currentSlide === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="relative h-full w-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40" />
                      <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center text-white">
                          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                            {slide.title}
                          </h1>
                          <p className="text-lg sm:text-xl lg:text-2xl mb-8">
                            {slide.subtitle}
                          </p>
                          <button
                            onClick={() => setShowRegistrationModal(true)}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                          >
                            Join Us Today
                            <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </section>
          {/* Featured Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Medical camp"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-navy-900">
                      Latest Events
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Join our upcoming community outreach programs and medical
                      camps. Make a difference in your community today.
                    </p>
                    <Link
                      href="#events"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick("events");
                      }}
                      className="group whitespace-nowrap inline-flex items-center justify-center px-4 py-2 font-medium transition-all bg-gradient-to-r from-red-600 to-red-500 rounded-md text-white hover:from-red-700 hover:to-red-600 active:scale-95 transform duration-200 ease-in-out"
                    >
                      View Events
                      <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1542884748-2b87b36c6b90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Community project"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-navy-900">
                      Our Projects
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Discover how we&akpos;re making a difference in the
                      community through various initiatives and programs.
                    </p>
                    <Link
                      href="#projects"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick("projects");
                      }}
                      className="group whitespace-nowrap inline-flex items-center justify-center px-4 py-2 font-medium transition-all bg-gradient-to-r from-red-600 to-red-500 rounded-md text-white hover:from-red-700 hover:to-red-600 active:scale-95 transform duration-200 ease-in-out"
                    >
                      View Projects
                      <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Volunteer work"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-navy-900">
                      Get Involved
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Learn how you can contribute to our cause and make an
                      impact. Join our volunteer program today.
                    </p>
                    <button
                      onClick={() => setShowRegistrationModal(true)}
                      className="group whitespace-nowrap inline-flex items-center justify-center px-4 py-2 font-medium transition-all bg-gradient-to-r from-red-600 to-red-500 rounded-md text-white hover:from-red-700 hover:to-red-600 active:scale-95 transform duration-200 ease-in-out"
                    >
                      Learn More
                      <ArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-[#17236b] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">UPP</h4>
              <p className="text-gray-300">
                Serving the community since establishment
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <div className="space-y-2">
                <p className="flex items-center">
                  <MapPin size={18} className="mr-2" /> Treatment Room, Hall 3,
                  University of Benin, Benin, Nigeria
                </p>
                <p className="flex items-center">
                  <Phone size={18} className="mr-2" /> +234 813 762 7522
                </p>
                <p className="flex items-center">
                  <Mail size={18} className="mr-2" /> uppcrossers@gmail.com
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#about"
                    onClick={() => handleNavClick("about")}
                    className="hover:text-red-500"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#blog"
                    onClick={() => handleNavClick("blog")}
                    className="hover:text-red-500"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#projects"
                    onClick={() => handleNavClick("projects")}
                    className="hover:text-red-500"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="#events"
                    onClick={() => handleNavClick("events")}
                    className="hover:text-red-500"
                  >
                    Events
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-red-500">
                  <Facebook size={24} />
                </Link>
                <Link href="#" className="hover:text-red-500">
                  <Twitter size={24} />
                </Link>
                <Link href="#" className="hover:text-red-500">
                  <Instagram size={24} />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} UPP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;