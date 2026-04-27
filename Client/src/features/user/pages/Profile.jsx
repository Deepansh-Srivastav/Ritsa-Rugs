import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    return (
        <div className="page-wrapper">
            <h1>My Profile</h1>
            {user ? (
                <div>
                    <p>Name: {user.firstName} {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <Button onClick={handleLogout} variant="danger">Logout</Button>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
