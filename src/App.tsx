import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import Home from '@/src/pages/Home';
import Gallery from '@/src/pages/Gallery';
import Services from '@/src/pages/Services';
import Story from '@/src/pages/Story';
import Contact from '@/src/pages/Contact';
import Admin from '@/src/pages/Admin';
import { FirebaseProvider, useFirebase } from './components/FirebaseProvider';
import { getArtworks, seedArtworks } from './services/galleryService';
import { ARTWORKS } from './constants';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const { user } = useFirebase();

  useEffect(() => {
    const initSeed = async () => {
      // Only attempt to seed if the database is empty AND we are logged in as admin
      // This prevents "insufficient permissions" errors for random visitors
      if (user?.email === 'thejerusalemcanvas@gmail.com') {
        const existing = await getArtworks();
        if (!existing || existing.length === 0) {
          console.log('Admin detected and DB empty. Seeding initial artworks...');
          await seedArtworks(ARTWORKS);
        }
      }
    };
    initSeed();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <FirebaseProvider>
        <ScrollToTop />
        <AppContent />
      </FirebaseProvider>
    </Router>
  );
}
