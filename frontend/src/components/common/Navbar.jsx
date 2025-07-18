import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, ShieldCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/create-will', label: 'New Will' },
    { href: '/wills', label: 'History' },
    { href: '/settings', label: 'Settings' },
  ];

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-40">
      <div className="navbar-start">
        {user && (
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </label>
            <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${isOpen ? 'block' : 'hidden'}`}>
              {navLinks.map(link => <li key={link.href}><Link to={link.href}>{link.label}</Link></li>)}
            </ul>
          </div>
        )}
        <Link to={user ? "/dashboard" : "/"} className="btn btn-ghost text-xl">
          <ShieldCheck className="text-primary"/> MyWill
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {user && (
          <ul className="menu menu-horizontal px-1">
            {navLinks.map(link => <li key={link.href}><Link to={link.href}>{link.label}</Link></li>)}
          </ul>
        )}
      </div>
      <div className="navbar-end gap-2">
        <Link to="/legal-resources" className="btn btn-ghost">Legal Resources</Link>
        <button onClick={() => toggleTheme(!!user)} className="btn btn-ghost btn-circle">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {user ? (
          <button onClick={logout} className="btn btn-ghost">Logout</button>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;