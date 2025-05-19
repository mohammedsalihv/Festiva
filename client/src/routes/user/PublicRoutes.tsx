
import Login from '@/pages/user/Auth/Login';
import Otp from '@/pages/user/Auth/Otp';
import Signup from '@/pages/user/Auth/Signup';
import { Routes , Route } from 'react-router-dom';
import Landing from '@/pages/user/Landing';
import ErrorAlert from '@/components/ErrorAlert';

const PublicRoutes = () => (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp-verification" element={<Otp />} />
      <Route path="*" element={<ErrorAlert statusCode={404}/>} />
    </Routes>
  );
  
  export default PublicRoutes;