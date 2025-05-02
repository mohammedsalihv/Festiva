import NotFound from '@/components/NotFound';
import Login from '@/pages/user/Auth/Login';
import Otp from '@/pages/user/Auth/Otp';
import Signup from '@/pages/user/Auth/Signup';
import { Routes , Route } from 'react-router-dom';
import Landing from '@/pages/user/Landing';

const PublicRoutes = () => (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp-verification" element={<Otp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
  
  export default PublicRoutes;