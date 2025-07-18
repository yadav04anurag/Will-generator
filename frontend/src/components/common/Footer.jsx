import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-300 text-base-content">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by MyWill Inc.</p>
        <p>
            <Link to="/legal-resources" className="link link-hover">Important Legal Disclaimer</Link>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;