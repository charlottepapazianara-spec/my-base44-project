import { useCallback, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Programs from './components/Programs.jsx';
import About from './components/About.jsx';
import Process from './components/Process.jsx';
import Testimonials from './components/Testimonials.jsx';
import CtaBand from './components/CtaBand.jsx';
import Footer from './components/Footer.jsx';
import BookingModal from './components/BookingModal.jsx';
import useReveal from './hooks/useReveal.js';

export default function App() {
  const [booking, setBooking] = useState({ open: false, program: '' });
  useReveal();

  const openBooking = useCallback((program = '') => {
    setBooking({ open: true, program });
  }, []);

  const closeBooking = useCallback(() => {
    setBooking((current) => ({ ...current, open: false }));
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        رفتن به محتوا
      </a>

      <Header onBook={openBooking} />

      <main id="main">
        <Hero onBook={openBooking} />
        <Programs onBook={openBooking} />
        <About onBook={openBooking} />
        <Process onBook={openBooking} />
        <Testimonials />
        <CtaBand onBook={openBooking} />
      </main>

      <Footer onBook={openBooking} />

      <BookingModal
        open={booking.open}
        program={booking.program}
        onClose={closeBooking}
      />
    </>
  );
}
