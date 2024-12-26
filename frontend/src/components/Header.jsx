// src/components/Header.jsx
import styles from './Header.module.css';
import { MdOutlineLogin } from "react-icons/md";

function Header() {
  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.navbar}>
          <h1>UniMerch</h1>
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
            <a href='/login'>Log In <MdOutlineLogin/></a>
            <a href='/signup' className='px-4 py-2 rounded-full bg-gray-800 hover:bg-slate-950 text-white'>Sign Up</a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
