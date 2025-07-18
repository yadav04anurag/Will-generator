import { Outlet, useLocation } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import LegalAssistant from '../LegalAssistant';
import { useAuth } from '../../context/AuthContext';

const Layout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const noNavFooterRoutes = ['/login', '/register'];

  if (noNavFooterRoutes.includes(location.pathname)) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-200/50">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Outlet />
      </main>
      {user && <LegalAssistant />}
      <Footer />
    </div>
  );
};

export default Layout;