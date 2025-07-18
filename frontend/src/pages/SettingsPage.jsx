import { useForm } from 'react-hook-form';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { updateProfile, changePassword } from '../services/authService';
import toast from 'react-hot-toast';
import { Moon, Sun, User, Lock, LogOut } from 'lucide-react';

const UpdateProfileForm = () => {
    const { user, updateUserName } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: { name: user?.name }
    });

    const onSubmit = async (data) => {
        const toastId = toast.loading('Updating profile...');
        try {
            await updateProfile(data.name);
            updateUserName(data.name);
            toast.success('Profile updated successfully!', { id: toastId });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile.', { id: toastId });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
                <label className="label"><span className="label-text m-5">Full Name</span></label>
                <input {...register('name', { required: 'Name is required' })} className="input input-bordered" />
                {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? <span className="loading loading-spinner"></span> : 'Save Changes'}
            </button>
        </form>
    );
};

const ChangePasswordForm = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm();
    
    const onSubmit = async (data) => {
        const toastId = toast.loading('Changing password...');
        try {
            await changePassword(data.currentPassword, data.newPassword);
            toast.success('Password changed successfully!', { id: toastId });
            reset();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to change password.', { id: toastId });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
                <label className="label"><span className="label-text m-5">Current Password</span></label>
                <input type="password" {...register('currentPassword', { required: 'Current password is required' })} className="input input-bordered" />
                {errors.currentPassword && <span className="text-error text-sm mt-1">{errors.currentPassword.message}</span>}
            </div>
            <div className="form-control">
                <label className="label"><span className="label-text m-5">New Password</span></label>
                <input type="password" {...register('newPassword', { required: 'New password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })} className="input input-bordered" />
                {errors.newPassword && <span className="text-error text-sm mt-1">{errors.newPassword.message}</span>}
            </div>
            <div className="form-control">
                <label className="label"><span className="label-text m-5">Confirm New Password</span></label>
                <input type="password" {...register('confirmPassword', { required: 'Please confirm your new password', validate: value => value === watch('newPassword') || 'Passwords do not match' })} className="input input-bordered" />
                {errors.confirmPassword && <span className="text-error text-sm mt-1">{errors.confirmPassword.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? <span className="loading loading-spinner"></span> : 'Change Password'}
            </button>
        </form>
    );
};

const SettingsPage = () => {
    const { darkMode, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Account Settings</h1>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-xl flex items-center gap-2"><User /> Profile Information</h2>
                    <p className="text-base-content/70">Update your name and email address.</p>
                    <p><strong>Email:</strong> {user?.email} (cannot be changed)</p>
                    <div className="divider my-4"></div>
                    <UpdateProfileForm />
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-xl flex items-center gap-2"><Lock /> Security</h2>
                     <p className="text-base-content/70">Change your password here.</p>
                    <div className="divider my-4"></div>
                    <ChangePasswordForm />
                </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Preferences</h2>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text text-lg">Theme</span>
                            <div className="flex items-center gap-2">
                                <Sun/>
                                <input type="checkbox" className="toggle toggle-primary" checked={darkMode} onChange={() => toggleTheme(!!user)} />
                                <Moon/>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body flex-row justify-between items-center">
                    <div>
                        <h2 className="card-title text-xl flex items-center gap-2"><LogOut /> Logout</h2>
                        <p className="text-base-content/70">End your current session.</p>
                    </div>
                    <button onClick={logout} className="btn btn-error">Logout Now</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;