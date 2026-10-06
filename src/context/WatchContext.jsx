import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_WATCHES, 
  INITIAL_ORDERS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_INQUIRIES 
} from '../data/watches';
import { 
  toggleAmbientEscapement, 
  isAmbientEscapementActive, 
  playMechanicalTick 
} from '../utils/audioEngine';
import { getAssetUrl } from '../utils/assets';

const WatchContext = createContext();

export const CURRENCY_RATES = {
  CHF: { symbol: 'CHF', rate: 1.0, prefix: '', suffix: ' CHF' },
  USD: { symbol: '$', rate: 1.12, prefix: '$', suffix: '' },
  EUR: { symbol: '€', rate: 1.04, prefix: '€', suffix: '' },
  GBP: { symbol: '£', rate: 0.88, prefix: '£', suffix: '' },
  JPY: { symbol: '¥', rate: 165.5, prefix: '¥', suffix: '' },
  AED: { symbol: 'AED', rate: 4.11, prefix: '', suffix: ' AED' }
};

export function WatchProvider({ children }) {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedWatchId, setSelectedWatchId] = useState('chr-6002g');
  const [activeFilterCategory, setActiveFilterCategory] = useState('all');

  // Timepieces (Persisted in localStorage with initial fallback)
  const [watches, setWatches] = useState(() => {
    const saved = localStorage.getItem('chronova_watches');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(w => ({
          ...w,
          images: (w.images || []).map(img => getAssetUrl(img)),
          video: w.video ? getAssetUrl(w.video) : ''
        }));
      } catch (e) {
        return INITIAL_WATCHES;
      }
    }
    return INITIAL_WATCHES;
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('chronova_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Appointments State
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('chronova_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  // Inquiries State
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('chronova_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  // User State (Collector Vault)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('chronova_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.registeredWatches) {
          parsed.registeredWatches = parsed.registeredWatches.map(rw => ({
            ...rw,
            image: getAssetUrl(rw.image)
          }));
        }
        return parsed;
      } catch (e) {
        // fallback to default
      }
    }
    return {
      isLoggedIn: true,
      name: "Lord Julian Blackwood",
      email: "j.blackwood@mayfair-estates.co.uk",
      role: "collector", // 'collector' | 'admin'
      tier: "Grand Complication Patron",
      memberSince: "2021",
      registeredWatches: [
        {
          serial: "CHR-6002-884920",
          model: "Celestial Sky Grand Tourbillon",
          ref: "Ref. 6002G-010",
          acquiredDate: "2026-09-28",
          certificateId: "CH-GE-6002G-884920",
          hallmark: "Poinçon de Genève",
          image: getAssetUrl("images/image-1.png")
        },
        {
          serial: "CHR-5270-391048",
          model: "Perpetual Calendar Flyback Chronograph",
          ref: "Ref. 5270P-001",
          acquiredDate: "2026-09-15",
          certificateId: "CH-GE-5270P-391048",
          hallmark: "Chronova Hallmark",
          image: getAssetUrl("images/image-15.png")
        }
      ]
    };
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('chronova_wishlist');
    return saved ? JSON.parse(saved) : ['chr-5303r', 'chr-5990r'];
  });

  // Compare Tray (up to 4 items)
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('chronova_compare');
    return saved ? JSON.parse(saved) : ['chr-6002g', 'chr-5270p'];
  });

  // Cart & Acquisition
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('chronova_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Currency
  const [currency, setCurrency] = useState('CHF');

  // Theme & Palette State
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('chronova_theme_mode') || 'dark';
  });

  const [colorScheme, setColorScheme] = useState(() => {
    return localStorage.getItem('chronova_color_scheme') || 'gold'; // 'gold' | 'rosegold' | 'platinum' | 'emerald' | 'sapphire'
  });

  // Audio Ambient Escapement
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutWatch, setCheckoutWatch] = useState(null);
  const [isQuickLookOpen, setIsQuickLookOpen] = useState(false);
  const [quickLookWatch, setQuickLookWatch] = useState(null);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Persist items
  useEffect(() => {
    localStorage.setItem('chronova_watches', JSON.stringify(watches));
  }, [watches]);

  useEffect(() => {
    localStorage.setItem('chronova_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('chronova_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('chronova_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('chronova_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('chronova_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('chronova_user', JSON.stringify(user));
  }, [user]);

  // Sync theme mode and palette to HTML root
  useEffect(() => {
    localStorage.setItem('chronova_theme_mode', themeMode);
    localStorage.setItem('chronova_color_scheme', colorScheme);
    
    const root = document.documentElement;
    if (themeMode === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    root.setAttribute('data-theme', themeMode);
    root.setAttribute('data-palette', colorScheme);
  }, [themeMode, colorScheme]);

  const toggleThemeMode = () => {
    setThemeMode(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showToast(next === 'light' ? 'Geneva Salon Light Atmosphere Activated' : 'Obsidian Vault Dark Atmosphere Activated', 'gold');
      return next;
    });
  };

  const changeColorScheme = (scheme) => {
    setColorScheme(scheme);
    const names = {
      gold: '18K Geneva Gold',
      rosegold: '4N Rose Gold & Cognac',
      platinum: '950 Ice Platinum',
      emerald: 'Imperial Geneva Emerald',
      sapphire: 'Midnight Celestial Sapphire'
    };
    showToast(`Prestige Palette switched to: ${names[scheme] || scheme}`, 'gold');
  };

  // Toast Notification helper
  const showToast = (message, type = 'gold') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Currency Converter helper
  const formatPrice = (priceInCHF) => {
    const { symbol, rate, prefix, suffix } = CURRENCY_RATES[currency] || CURRENCY_RATES.CHF;
    const converted = Math.round(priceInCHF * rate);
    const formattedNum = converted.toLocaleString('en-US');
    return `${prefix}${formattedNum}${suffix}`;
  };

  // Navigation Helper
  const navigateTo = (page, watchId = null, filterCategory = null) => {
    playMechanicalTick(1.2);
    if (watchId) setSelectedWatchId(watchId);
    if (filterCategory) setActiveFilterCategory(filterCategory);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sound Toggle
  const handleToggleSound = () => {
    const active = toggleAmbientEscapement((newStatus) => {
      setIsAudioActive(newStatus);
    });
    setIsAudioActive(active);
    showToast(active ? "Swiss Escapement Calibre Sound Engaged" : "Escapement Sound Muted", "gold");
  };

  // Wishlist Actions
  const toggleWishlist = (watchId) => {
    playMechanicalTick(1.4);
    if (wishlist.includes(watchId)) {
      setWishlist(wishlist.filter(id => id !== watchId));
      showToast("Removed from Collector's Wishlist", "info");
    } else {
      setWishlist([...wishlist, watchId]);
      showToast("Added to Collector's Wishlist", "gold");
    }
  };

  // Compare Actions
  const toggleCompare = (watchId) => {
    playMechanicalTick(1.3);
    if (compareList.includes(watchId)) {
      setCompareList(compareList.filter(id => id !== watchId));
      showToast("Removed from Calibre Comparison", "info");
    } else {
      if (compareList.length >= 4) {
        showToast("Maximum 4 Timepieces can be compared simultaneously", "error");
        return;
      }
      setCompareList([...compareList, watchId]);
      showToast("Added to Calibre Comparison", "gold");
      setIsCompareDrawerOpen(true);
    }
  };

  // Quick Look
  const openQuickLook = (watch) => {
    playMechanicalTick(1.1);
    setQuickLookWatch(watch);
    setIsQuickLookOpen(true);
  };

  // Checkout Flow
  const startAcquisition = (watch) => {
    playMechanicalTick(1.5);
    setCheckoutWatch(watch);
    setIsCheckoutModalOpen(true);
  };

  const completeOrder = (orderData) => {
    const newOrder = {
      id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: user ? user.name : orderData.name,
      customerEmail: user ? user.email : orderData.email,
      timepieceId: checkoutWatch.id,
      watchName: checkoutWatch.name,
      ref: checkoutWatch.ref,
      price: checkoutWatch.price,
      status: "Order Confirmed — Handcrafting & Vault Preparation",
      orderDate: new Date().toISOString().split('T')[0],
      deliveryEstimate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      deliveryType: orderData.deliveryType || "White-Glove Armored Escort (Brinks Global)",
      serialNumber: `CHR-${checkoutWatch.ref.replace(/[^0-9]/g, '').slice(0, 4)}-${Math.floor(100000 + Math.random() * 900000)}`,
      certificateId: checkoutWatch.certificateId || `CH-GE-${Math.floor(100000 + Math.random() * 900000)}`,
      engraving: orderData.engraving || "Maison Bespoke",
      paymentMethod: orderData.paymentMethod || "Swiss Bank Wire Escrow",
      destination: orderData.destination || "Geneva, Switzerland"
    };

    setOrders([newOrder, ...orders]);
    
    // Also add to user's registered collection
    if (user) {
      setUser({
        ...user,
        registeredWatches: [
          {
            serial: newOrder.serialNumber,
            model: checkoutWatch.name,
            ref: checkoutWatch.ref,
            acquiredDate: newOrder.orderDate,
            certificateId: newOrder.certificateId,
            hallmark: checkoutWatch.hallmark,
            image: checkoutWatch.images[0]
          },
          ...user.registeredWatches
        ]
      });
    }

    setIsCheckoutModalOpen(false);
    showToast(`Acquisition of ${checkoutWatch.name} registered. Order #${newOrder.id}`, 'gold');
    navigateTo('dashboard');
    return newOrder;
  };

  // Appointment Submission
  const bookAppointment = (appointmentData) => {
    const newApt = {
      id: `APT-${Math.floor(8000 + Math.random() * 2000)}`,
      status: "Confirmed",
      dateCreated: new Date().toISOString().split('T')[0],
      ...appointmentData
    };
    setAppointments([newApt, ...appointments]);
    showToast(`VIP Boutique Appointment #${newApt.id} confirmed with Geneva Concierge`, 'gold');
    return newApt;
  };

  // Inquiry Submission
  const submitInquiry = (inquiryData) => {
    const newInq = {
      id: `INQ-${Math.floor(5000 + Math.random() * 5000)}`,
      date: new Date().toISOString().split('T')[0],
      status: "Transmitted to Master Horologist",
      priority: "High",
      ...inquiryData
    };
    setInquiries([newInq, ...inquiries]);
    showToast(`Bespoke Inquiry #${newInq.id} transmitted to Geneva Maison`, 'gold');
    return newInq;
  };

  // Admin Actions
  const updateWatch = (updatedWatch) => {
    setWatches(watches.map(w => w.id === updatedWatch.id ? updatedWatch : w));
    showToast(`Timepiece ${updatedWatch.name} updated in Vault catalog`, 'gold');
  };

  const addWatch = (newWatch) => {
    setWatches([newWatch, ...watches]);
    showToast(`New Masterpiece ${newWatch.name} added to catalog`, 'gold');
  };

  const deleteWatch = (watchId) => {
    setWatches(watches.filter(w => w.id !== watchId));
    showToast(`Timepiece removed from catalog`, 'info');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order #${orderId} status updated to: ${newStatus}`, 'gold');
  };

  const updateAppointmentStatus = (aptId, newStatus) => {
    setAppointments(appointments.map(a => a.id === aptId ? { ...a, status: newStatus } : a));
    showToast(`Appointment #${aptId} updated to: ${newStatus}`, 'gold');
  };

  const updateInquiryStatus = (inqId, newStatus) => {
    setInquiries(inquiries.map(i => i.id === inqId ? { ...i, status: newStatus } : i));
    showToast(`Inquiry #${inqId} status updated`, 'gold');
  };

  // Auth Quick Switcher for Demo
  const loginAs = (role = 'collector') => {
    if (role === 'admin') {
      setUser({
        isLoggedIn: true,
        name: "Jean-Pierre de Valmont",
        email: "devalmont@chronova-geneve.ch",
        role: "admin",
        tier: "Master Horologist & Atelier Director",
        memberSince: "1994",
        registeredWatches: []
      });
      showToast("Signed in as Maison Atelier Director (Admin Access Granted)", "gold");
    } else {
      setUser({
        isLoggedIn: true,
        name: "Lord Julian Blackwood",
        email: "j.blackwood@mayfair-estates.co.uk",
        role: "collector",
        tier: "Grand Complication Patron",
        memberSince: "2021",
        registeredWatches: [
          {
            serial: "CHR-6002-884920",
            model: "Celestial Sky Grand Tourbillon",
            ref: "Ref. 6002G-010",
            acquiredDate: "2026-09-28",
            certificateId: "CH-GE-6002G-884920",
            hallmark: "Poinçon de Genève",
            image: getAssetUrl("images/image-1.png")
          },
          {
            serial: "CHR-5270-391048",
            model: "Perpetual Calendar Flyback Chronograph",
            ref: "Ref. 5270P-001",
            acquiredDate: "2026-09-15",
            certificateId: "CH-GE-5270P-391048",
            hallmark: "Chronova Hallmark",
            image: getAssetUrl("images/image-15.png")
          }
        ]
      });
      showToast("Signed in as VIP Collector (Lord Julian Blackwood)", "gold");
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    showToast("Signed out of Collector's Vault", "info");
  };

  const selectedWatch = watches.find(w => w.id === selectedWatchId) || watches[0];

  return (
    <WatchContext.Provider value={{
      currentPage,
      setCurrentPage,
      navigateTo,
      selectedWatchId,
      setSelectedWatchId,
      selectedWatch,
      activeFilterCategory,
      setActiveFilterCategory,
      watches,
      orders,
      appointments,
      inquiries,
      user,
      setUser,
      loginAs,
      logout,
      wishlist,
      toggleWishlist,
      compareList,
      toggleCompare,
      isCompareDrawerOpen,
      setIsCompareDrawerOpen,
      currency,
      setCurrency,
      formatPrice,
      themeMode,
      setThemeMode,
      toggleThemeMode,
      colorScheme,
      setColorScheme,
      changeColorScheme,
      isAudioActive,
      handleToggleSound,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isCheckoutModalOpen,
      setIsCheckoutModalOpen,
      checkoutWatch,
      startAcquisition,
      completeOrder,
      isQuickLookOpen,
      setIsQuickLookOpen,
      quickLookWatch,
      openQuickLook,
      bookAppointment,
      submitInquiry,
      updateWatch,
      addWatch,
      deleteWatch,
      updateOrderStatus,
      updateAppointmentStatus,
      updateInquiryStatus,
      notification,
      showToast
    }}>
      {children}
    </WatchContext.Provider>
  );
}

export function useWatch() {
  const context = useContext(WatchContext);
  if (!context) {
    throw new Error('useWatch must be used within a WatchProvider');
  }
  return context;
}
