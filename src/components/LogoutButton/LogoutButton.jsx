import { logout } from '@/services/Auth/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

function LogoutButton() {
  const navigate = useNavigate();

  const logOut = async () => {
    const response = await logout();

    if (!response.error) {
      navigate('/');
    }
  };
  return (
    <Button variant='outline' size='sm' onClick={logOut}>
      Logout
    </Button>
  );
}

export default LogoutButton;
