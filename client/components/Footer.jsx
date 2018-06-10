import React from 'react';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
  return (
    <nav id="footer-main" className="navbar navbar-toggler fixed-bottom navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Call 888-634-8893
      </a>
      <div className="footer-grouping">
        <SocialIcon url="https://www.google.com" />
        <SocialIcon url="https://www.twitter.com" />
        <SocialIcon url="https://www.facebook.com" />
        <SocialIcon url="https://www.instagram.com" />
        <SocialIcon url="https://www.pinterest.com" />
      </div>
      <div className="footer-grouping">
        <Link to="#">Contacts</Link>
        <Link to="#">About</Link>
      </div>
    </nav>
  );
};

export default Footer;
