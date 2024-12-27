import { useState, useEffect, useRef } from 'react';
import { MdOutlineLogin } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import styles from './Header.module.css';

function Header() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);  // Ref for dropdown
  const profileRef = useRef(null);   // Ref for profile icon

  // Check if the user is logged in by looking for the authToken in localStorage
  const isLoggedIn = localStorage.getItem('authToken');

  const handleLogout = () => {
    // Remove the token and user data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    
    // Redirect to the homepage or login page after logging out
    window.location.href = '/';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        profileRef.current && !profileRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);  // Hide dropdown if click is outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.navbar}>
          <h1><a href="/">UniMerch</a></h1>
          <nav className={styles.nav}>
            <a href="/">Home</a>
            <a href="/">Shop</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
            <a href="#privacy-policy">Privacy Policy</a>
          </nav>
          {/* Search Bar */}
          <div className={`hidden md:flex items-center ${styles.searchbar}`}>
            <input
              type="text"
              placeholder="Product name"
              className="px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
            <button className="px-4 py-2 bg-gray-800 border border-gray-300 text-white rounded-r-full hover:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-500">
              Search
            </button>
          </div>
          <div className={styles.nav}>
            {isLoggedIn ? (
              // If logged in, show the profile icon and dropdown
              <div 
                ref={profileRef}
                className={styles.profile}
                onClick={() => setIsDropdownVisible(prev => !prev)} // Toggle dropdown visibility
              >
                <small>Hi {localStorage.getItem('userName')} </small>
                <FaRegCircleUser />
                {isDropdownVisible && (
                  <div ref={dropdownRef} className={styles.dropdown}>
                    <div className={styles.dropdownItem}>
                      <strong>{localStorage.getItem('userName')}</strong>
                      <p>{localStorage.getItem('userEmail')}</p>
                    </div>
                    {localStorage.getItem('userRole') === 'admin' && (
                      <a href="/admin/products" className="dropdownItem">
                        Admin Panel
                      </a>
                    )}
                    <button onClick={handleLogout} className="dropdownItem">
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // If not logged in, show Login and Sign Up links
              <>
                <a href='/login'>Log In <MdOutlineLogin /></a>
                <a href='/signup' className='px-4 py-2 rounded-full bg-gray-800 hover:bg-slate-950 text-white'>Sign Up</a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
