import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Departments } from './pages/Departments';
import { Doctors } from './pages/Doctors';
import { AppointmentBooking } from './pages/AppointmentBooking';
import { MyBookings } from './pages/MyBookings';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="departments" element={<Departments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="book-appointment" element={<AppointmentBooking />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

