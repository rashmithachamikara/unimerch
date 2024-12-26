// src/components/Header.jsx
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.navbar}>
          <h1>UniMerch</h1>
          <nav className={styles.nav}>
            <a href="#home">Home</a>
            <a href="#shop">Shop</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
            <a href="#privacy-policy">Privacy Policy</a>
          </nav>
          <div>
            <input type="text" placeholder="Search..." />
            <button>Search</button>
          </div>
          <div>
            <button>Sign In</button>
            <button>Sign Up</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
