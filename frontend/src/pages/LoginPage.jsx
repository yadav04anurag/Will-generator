import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, user, isAuthenticated } = useAuth(); // Get user and auth status
  const { darkMode, toggleTheme, syncThemeWithUser } = useTheme(); // Get syncThemeWithUser
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Login successful!');
      navigate('/dashboard'); // Navigate to a protected route on success
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  // Sync theme with user's preference when user object is available
  useEffect(() => {
    if (user && typeof user.darkMode === 'boolean') {
      syncThemeWithUser(user.darkMode);
    }
  }, [user, syncThemeWithUser]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-base-200 px-4 sm:px-6 lg:px-8">
      {/* Theme Toggler Button */}
      <button
        onClick={() => toggleTheme(isAuthenticated)} // Pass auth status
        className="absolute top-4 right-4 btn btn-ghost btn-circle"
      >
        {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
      </button>

      <div className="w-full max-w-md space-y-8">
        <div className="card shrink-0 w-full shadow-2xl bg-base-100">
          <form className="card-body p-8 sm:p-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-center">Login to MyWill</h1>
              <p className="text-base-content/70 mt-2">Welcome back! Please enter your details.</p>
            </div>
            
            <div className="form-control">
              <label className="label"><span className="label-text m-1.5">Email</span></label>
              <input type="email" placeholder="you@example.com" className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`} {...register("email", { required: "Email is required" })} />
              {errors.email && <span className="text-error text-sm mt-2">{errors.email.message}</span>}
            </div>
            
            <div className="form-control mt-4">
              <label className="label"><span className="label-text m-1.5">Password</span></label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`} {...register("password", { required: "Password is required" })} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <span className="text-error text-sm mt-2">{errors.password.message}</span>}
            </div>
            
            <div className="form-control mt-8">
              <button type="submit" className="btn btn-primary w-full">Login</button>
            </div>
            
            <p className="text-center text-sm mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="link link-primary font-medium">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;