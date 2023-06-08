import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2023 JobConnect.</p>
      <nav>
            <Link to="/aboutus">About Us</Link>
      </nav>
    </footer>
  );
}

export default Footer;