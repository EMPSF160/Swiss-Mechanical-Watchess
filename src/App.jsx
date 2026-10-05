import React from 'react';
import { WatchProvider, useWatch } from './context/WatchContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CompareDrawer from './components/CompareDrawer';
import QuickLookModal from './components/QuickLookModal';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';

// Pages
import Home from './pages/Home';
import WatchCollection from './pages/WatchCollection';
import WatchDetails from './pages/WatchDetails';
import Heritage from './pages/Heritage';
import ContactAppointment from './pages/ContactAppointment';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';

function AppContent() {
  const { currentPage } = useWatch();

  return (
    <div className="flex flex-col min-h-screen bg-[#07080B] text-slate-200">
      {/* Haute Horlogerie Navigation */}
      <Navbar />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <Home />}
        {currentPage === 'collection' && <WatchCollection />}
        {currentPage === 'details' && <WatchDetails />}
        {currentPage === 'heritage' && <Heritage />}
        {currentPage === 'contact' && <ContactAppointment />}
        {currentPage === 'dashboard' && <CustomerDashboard />}
        {currentPage === 'admin' && <AdminDashboard />}
      </main>

      {/* Haute Horlogerie Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CompareDrawer />
      <QuickLookModal />
      <AuthModal />
      <CheckoutModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <WatchProvider>
      <AppContent />
    </WatchProvider>
  );
}
