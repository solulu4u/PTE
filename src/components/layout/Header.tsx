import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const menuItems = [
    { label: 'Home', href: '/' },
    {
      label: 'Speaking',
      href: '/practice/speaking',
      children: [
        { label: 'Read Aloud', href: '/practice/speaking/read-aloud' },
        { label: 'Repeat Sentence', href: '/practice/speaking/repeat-sentence' },
        { label: 'Describe Image', href: '/practice/speaking/describe-image' },
        { label: 'Re-tell Lecture', href: '/practice/speaking/retell-lecture' },
        { label: 'Answer Short Question', href: '/practice/speaking/short-question' },
      ],
    },
    {
      label: 'Writing',
      href: '/practice/writing',
      children: [
        { label: 'Summarize Written Text', href: '/practice/writing/summarize' },
        { label: 'Essay', href: '/practice/writing/essay' },
      ],
    },
    {
      label: 'Reading',
      href: '/practice/reading',
      children: [
        { label: 'Fill in the Blanks', href: '/practice/reading/fill-blanks' },
        { label: 'Multiple Choice', href: '/practice/reading/multiple-choice' },
        { label: 'Re-order Paragraphs', href: '/practice/reading/reorder' },
        { label: 'Reading & Writing Fill in Blanks', href: '/practice/reading/rw-fill-blanks' },
      ],
    },
    {
      label: 'Listening',
      href: '/practice/listening',
      children: [
        { label: 'Summarize Spoken Text', href: '/practice/listening/summarize' },
        { label: 'Multiple Choice', href: '/practice/listening/multiple-choice' },
        { label: 'Fill in the Blanks', href: '/practice/listening/fill-blanks' },
        { label: 'Highlight Correct Summary', href: '/practice/listening/highlight-summary' },
        { label: 'Select Missing Word', href: '/practice/listening/select-missing' },
        { label: 'Highlight Incorrect Words', href: '/practice/listening/highlight-incorrect' },
        { label: 'Write from Dictation', href: '/practice/listening/dictation' },
      ],
    },
    { label: 'Mock Tests', href: '/mock-tests' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-soft' : 'bg-white bg-opacity-90 backdrop-blur'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">PTE</span>
              <span className="text-2xl font-bold text-secondary-500">Practice</span>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <nav className="hidden md:flex space-x-10">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.children ? (
                  <>
                    <button
                      className="text-gray-700 group inline-flex items-center text-base font-medium hover:text-primary-600"
                      onClick={() => {}}
                    >
                      {item.label}
                      <ChevronDown size={16} className="ml-1 text-gray-500" />
                    </button>
                    <div className="absolute z-10 hidden group-hover:block pt-3 w-screen max-w-md transform -translate-x-1/4">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                            >
                              <div className="ml-4">
                                <p className="text-base font-medium text-gray-900">{child.label}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-base font-medium hover:text-primary-600 ${
                      location.pathname === item.href ? 'text-primary-600' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="ml-8 flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  <User size={18} className="mr-2" />
                  <span>Profile</span>
                </button>
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="whitespace-nowrap text-base font-medium text-gray-700 hover:text-primary-600"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div className="space-y-1">
                      <Link
                        to={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                      >
                        {item.label}
                      </Link>
                      <div className="pl-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 ${
                        location.pathname === item.href
                          ? 'text-primary-600 bg-gray-50'
                          : 'text-gray-900'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            {!user ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Link
                      to="/login"
                      className="block w-full px-5 py-3 text-center font-medium text-primary-600 bg-gray-50 hover:bg-gray-100"
                    >
                      Log in
                    </Link>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link
                      to="/register"
                      className="block w-full px-5 py-3 text-center font-medium text-white bg-primary-600 hover:bg-primary-700"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <div className="flex-1">
                    <div className="text-base font-medium leading-none text-gray-800">
                      {user.username}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-500 mt-1">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;