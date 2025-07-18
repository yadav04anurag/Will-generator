// import { BrowserRouter, Routes, Route, Navigate } from "react-router";
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from "./context/AuthContext";
// import { ThemeProvider } from "./context/ThemeContext";
// import Layout from "./components/common/Layout";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import DashboardPage from "./pages/DashboardPage";
// import CreateWillPage from "./pages/CreateWillPage";
// import WillHistoryPage from "./pages/WillHistoryPage";
// import LegalResourcesPage from "./pages/LegalResourcesPage";
// import SettingsPage from "./pages/SettingsPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import EditWillPage from "./pages/EditWillPage";
// import { Navigate, useLocation } from 'react-router';
// import { useAuth } from './context/AuthContext';

// function App() {
//   return (
//     <BrowserRouter>
//       <ThemeProvider>
//         <AuthProvider>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<HomePage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />

//             {/* Routes that can be viewed without login */}
//             <Route element={<Layout isPublic={true} />}>
//               <Route path="/legal-resources" element={<LegalResourcesPage />} />
//             </Route>

//             {/* Protected Routes */}
            
//               <Route element={<Layout />}>
//                 <Route path="/dashboard" element={<DashboardPage />} />
//                 <Route path="/create-will" element={<CreateWillPage />} />
//                 <Route path="/edit-will/:willId" element={<EditWillPage />} />
//                 <Route path="/wills" element={<WillHistoryPage />} />
//                 <Route path="/settings" element={<SettingsPage />} />
//               </Route>

//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </AuthProvider>
//       </ThemeProvider>
//     </BrowserRouter>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router";
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/common/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CreateWillPage from "./pages/CreateWillPage";
import WillHistoryPage from "./pages/WillHistoryPage";
import LegalResourcesPage from "./pages/LegalResourcesPage";
import SettingsPage from "./pages/SettingsPage";
import EditWillPage from "./pages/EditWillPage";

function AppRoutes() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Public Layout Routes */}
      <Route element={<Layout isPublic={true} />}>
        <Route path="/legal-resources" element={<LegalResourcesPage />} />
      </Route>

      {/* Protected Routes with Ternary Check */}
      <Route element={user ? <Layout /> : <Navigate to="/login" state={{ from: location }} replace />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create-will" element={<CreateWillPage />} />
        <Route path="/edit-will/:willId" element={<EditWillPage />} />
        <Route path="/wills" element={<WillHistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-All Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
