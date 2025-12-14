import React, { useState, useEffect, useCallback } from 'react';
import { Trees, MapPin, User, AlertCircle, Settings, LayoutGrid, X, CreditCard, CheckCircle, Loader2, Copy  } from 'lucide-react';
import axios from './config/axios';
import { formatRupiah } from './utils/formatRupiah';
import { ORDER_STATUSES } from './utils/constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlotMap from './components/PlotMap';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/AdminDashboard';
import AboutSection from './components/AboutSection';
import FeatureSection from './components/FeatureSection';
import Footer from './components/Footer';
import Testimony from './components/Testimony';
import CTASection from './components/CTASection';
 
export default function App() {
  // --- STATE MANAGEMENT ---
  const [isInitializing, setIsInitializing] = useState(true);
  const [view, setView] = useState('home');
  const [plots, setPlots] = useState([]); 
  const [orders, setOrders] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // --- STATE PEMBAYARAN ---
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [countdown, setCountdown] = useState(10);
  
  // Loading state
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    address: ''
  });

  // --- NOTIFICATION HANDLER ---
  const showNotification = useCallback((msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  // --- LOGOUT HANDLER ---
  const handleLogout = async () => {
    try {
        await axios.post('/api/logout'); 
    } catch (error) {
        console.error("Logout error:", error.response || error);
    } finally {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        delete axios.defaults.headers.common['Authorization'];
        
        setIsAdmin(false); 
        setView('login');
        
        showNotification('Berhasil logout. Sampai jumpa! 👋', 'success');
    }
  };

  // --- FETCHING DATA ---
  const fetchPlots = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/plots');
      setPlots(response.data.data.map(p => ({
        ...p,
        status: p.status || 'available',
        price: p.price,
        size: p.size,
        number: p.number,
        description: p.description,
        images: p.images
      })));
    } catch (error) {
      console.error("Gagal mengambil data kavling:", error);
      showNotification('Gagal memuat data kavling.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
        const response = await axios.get('/api/orders');
        setOrders(response.data.orders || response.data); 
      } catch (error) {
        console.error("Gagal mengambil orders:", error);
        
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          setIsAdmin(false);
          setView('login');
          setNotification({ type: 'error', msg: 'Anda belum login atau sesi telah berakhir.' });
        } else {
          setNotification({ type: 'error', msg: 'Gagal memuat daftar pesanan dari server.' });
        }
      } finally {
        setIsLoading(false);
      }
    }, []
  );

  // --- USEEFFECT: CSRF TOKEN ---
  useEffect(() => {
    const fetchCSRFToken = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie'); 
            console.log("Sanctum CSRF cookie berhasil dimuat.");
        } catch (error) {
            console.error("Gagal memuat CSRF cookie:", error);
        }
    };
    fetchCSRFToken();
  }, []);

  // --- USEEFFECT: AUTH INITIALIZATION ---
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('=== INITIALIZING AUTH ===');
      
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      const lastView = localStorage.getItem('lastView') || 'home';
      
      console.log('Token exists:', !!token);
      console.log('UserData exists:', !!userData);
      console.log('Last view:', lastView);
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          console.log('Parsed user:', user);
          
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          console.log('Token set to axios headers');
          
          console.log('Verifying token with /api/user...');
          const response = await axios.get('/api/user');
          console.log('Verification response:', response.data);
          
          // Response dari /api/user adalah array
          const verifiedUser = Array.isArray(response.data) ? response.data[0] : response.data;
          console.log('Verified user:', verifiedUser);
          
          if (verifiedUser && verifiedUser.id) {
            setIsAdmin(true);
            console.log(`✅ Auth restored: ${user.name} (${user.email})`);
            
            if (lastView === 'admin') {
              setView('admin');
              console.log('View set to: admin');
            } else {
              setView(lastView);
              console.log('View set to:', lastView);
            }
          } else {
            console.error('❌ No user ID found in response');
            throw new Error('User verification failed');
          }
        } catch (error) {
          console.error("❌ Token invalid or expired:", error.message);
          console.error("Error details:", error.response?.data || error);
          
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          delete axios.defaults.headers.common['Authorization'];
          setIsAdmin(false);
          
          if (lastView === 'admin') {
            setView('login');
            showNotification('Sesi telah berakhir. Silakan login kembali.', 'error');
            console.log('Redirected to login - session expired');
          } else {
            setView(lastView);
            console.log('View restored to:', lastView);
          }
        }
      } else {
        console.log('No token or userData found');
        
        if (lastView === 'admin') {
          setView('login');
          console.log('No auth - redirected to login');
        } else {
          setView(lastView);
          console.log('View restored to:', lastView);
        }
      }
      
      setIsInitializing(false);
      console.log('=== AUTH INITIALIZATION COMPLETE ===');
    };
    
    initializeAuth();
  }, [showNotification]);

  // --- USEEFFECT: FETCH PLOTS ---
  useEffect(() => {
    if (view === 'home' || view === 'booking') {
      fetchPlots();
    }
  }, [view, fetchPlots]);

  // --- USEEFFECT: FETCH ORDERS ---
  useEffect(() => {
    if (view === 'admin' && isAdmin) {
        fetchOrders();
        fetchPlots();
    }
  }, [view, isAdmin, fetchOrders, fetchPlots]);

  // --- USEEFFECT: SAVE LAST VIEW ---
  useEffect(() => {
    localStorage.setItem('lastView', view);
  }, [view]);

  // --- USEEFFECT: PAYMENT SIMULATION ---
  useEffect(() => {
    let timer;
    let countdownInterval;
    
    if (showPaymentModal && paymentStatus === 'pending') {
        countdownInterval = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        timer = setTimeout(() => {
            setPaymentStatus('success');
            
            setTimeout(() => {
                setShowPaymentModal(false);
                setFormData({ name: '', email: '', phone: '', address: '', notes: '' });
                showNotification('Pembayaran Berhasil! Pesanan diproses.', 'success');
            }, 3000); 

        }, 10000);
    }
    
    return () => {
        if (timer) clearTimeout(timer);
        if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [showPaymentModal, paymentStatus, showNotification]);

  // --- HANDLERS ---
  const handlePlotClick = (plot) => {
    if (plot.status === 'occupied' || plot.status === 'booked') return; 
    setSelectedPlot(plot);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    if (!selectedPlot || isLoading) return;
    setIsLoading(true);

    try {
      const payload = {
        kavling_id: selectedPlot.id,
        customer_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        notes: formData.notes
      };

      await axios.post('/api/bookings', payload);

      setShowModal(false);
      setShowPaymentModal(true);
      setPaymentStatus('pending');
      setCountdown(10);
      
      await fetchPlots(); 
      setView('booking');

    } catch (error) {
      console.error("Gagal mengirim booking:", error.response || error);
      showNotification('Gagal mengirim booking. Mohon cek koneksi atau ketersediaan kavling.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
        const response = await axios.put(`/api/orders/${orderId}/status`, { status: newStatus });
        const updatedBooking = response.data.booking;

        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.id === updatedBooking.id 
                    ? { 
                        ...order,
                       ...updatedBooking, 
                       kavling: order.kavling,
                      }
                    : order
            )
        );

        if (newStatus === 'completed') {
             await fetchPlots(); 
        }

        showNotification(`Status Order ${orderId} diperbarui ke ${ORDER_STATUSES[newStatus].label}.`, 'success');

    } catch (error) {
        console.error("Gagal mengubah status:", error.response || error);
        showNotification('Gagal mengubah status. Pastikan Anda sudah login sebagai Admin.', 'error');
    } finally {
        setIsLoading(false);
    }
  };

  // --- LOADING SCREEN ---
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-stone-600 font-medium">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* NOTIFICATION */}
      {notification && (
        <div 
          className={`fixed z-100 mt-10 right-5 px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-2 transition-transform duration-150 ease-out 
          ${notification.type === 'success' ? 'bg-emerald-800 text-white' : 'bg-red-600 text-white'}`}
        >
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {notification.msg}
        </div>
      )}

      {/* NAVBAR */}
      <Navbar setView={setView} view={view} isAdmin={isAdmin} handleLogout={handleLogout} />
      
      {/* MAIN CONTENT */}
      <div>
        {/* HOME VIEW */}
        {view === 'home' && (
          <>
            <Hero setView={setView} />
            <div className="relative bg-white pb-20">  
              <style>
                {`
                  @keyframes move-forever {
                    0% { transform: translate3d(-90px,0,0); }
                    100% { transform: translate3d(85px,0,0); }
                  }
                `}
              </style>
              <AboutSection />
              <FeatureSection />
              <Testimony />
              <CTASection setView={setView} />
            </div>
            <Footer />
          </>
        )}
        
        {/* BOOKING VIEW */}
        {view === 'booking' && (
          <div className="pt-30">
            <PlotMap plots={plots} handlePlotClick={handlePlotClick} isLoading={isLoading} />
          </div>
        )}

        {/* LOGIN VIEW */}
        {view === 'login' && !isAdmin && ( 
          <div className="flex justify-center items-center h-full pt-40">
            <LoginForm 
              setView={setView} 
              setIsAdmin={setIsAdmin} 
              isLoggingIn={isLoggingIn} 
              setIsLoggingIn={setIsLoggingIn} 
              setNotification={setNotification}
              showNotification={showNotification}
            />
          </div>
        )}
        
        {/* ADMIN VIEW - AUTHORIZED */}
        {view === 'admin' && isAdmin && (
          <div className="pt-8">
            <AdminDashboard
              orders={orders}
              plots={plots}
              fetchPlots={fetchPlots}
              fetchOrders={fetchOrders} 
              isLoading={isLoading} 
              handleStatusChange={handleStatusChange} 
              handleLogout={handleLogout}
              showNotification={showNotification}
            />
          </div>
        )}

        {/* ADMIN VIEW - UNAUTHORIZED */}
        {view === 'admin' && !isAdmin && (
          <div className="flex justify-center items-center h-full pt-40">
            <div className="text-center bg-white p-8 rounded-xl shadow-lg">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-stone-800 mb-2">Akses Ditolak</h3>
              <p className="text-stone-600 mb-4">Anda harus login sebagai admin untuk mengakses halaman ini.</p>
              <button 
                onClick={() => setView('login')}
                className="bg-emerald-800 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Login Sekarang
              </button>
            </div>
          </div>
        )}
      </div>  

      {/* MODAL BOOKING */}
      {showModal && selectedPlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md md:max-w-4xl shadow-2xl animate-in zoom-in duration-300 overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="bg-emerald-900 p-4 flex justify-between items-center text-white shrink-0">
              <h3 className="font-bold text-lg">Booking Kavling {selectedPlot.number}</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full hover:bg-white/10 transition" 
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="flex flex-col md:flex-row gap-6">
                
                <div className="md:w-5/12 space-y-4">
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 h-full">
                    <img 
                      src={selectedPlot.images} 
                      alt="Visualisasi Makam"
                      className="w-full h-48 md:h-64 object-cover rounded-lg border border-stone-200 shadow-sm"
                    />
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                        <span className="text-stone-500 text-sm">Harga</span>
                        <span className="font-bold text-emerald-800 text-lg">{formatRupiah(selectedPlot.price)}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                        <span className="text-stone-500 text-sm">Ukuran</span>
                        <span className="font-medium text-stone-800">{selectedPlot.size}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-stone-500 text-sm">ID Kavling</span>
                        <span className="font-mono text-xs font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded">{selectedPlot.id}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-7/12">
                  <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2 md:hidden">
                    Data Pemesan
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input 
                        name="name" 
                        type="text" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="Nama Lengkap *" 
                        className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none" 
                        required 
                      />
                      <input 
                        name="phone" 
                        type="tel" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        placeholder="Nomor Telepon *" 
                        className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none" 
                        required 
                      />
                    </div>

                    <input 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="Email *" 
                      className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none" 
                      required 
                    />
                    
                    <textarea 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange} 
                      placeholder="Alamat Lengkap *" 
                      className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none resize-none" 
                      rows={3}
                    />
                    
                    <textarea 
                      name="notes" 
                      value={formData.notes} 
                      onChange={handleInputChange} 
                      placeholder="Catatan Tambahan (Opsional)" 
                      className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none resize-none" 
                      rows={2}
                    />
                    
                    <div className="pt-2">
                      <button 
                        onClick={handleSubmitBooking}
                        className="w-full bg-emerald-800 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-semibold shadow-md active:scale-[0.98] transform duration-100" 
                        disabled={isLoading}
                      >
                        {isLoading ? 'Memproses...' : 'Kirim Permintaan Booking'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PEMBAYARAN VIRTUAL ACCOUNT */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            
            <div className="bg-stone-50 border-b border-stone-200 p-4 text-center">
              <h3 className="font-bold text-stone-800 text-lg">
                {paymentStatus === 'pending' ? 'Menunggu Pembayaran' : 'Pembayaran Berhasil'}
              </h3>
            </div>

            <div className="p-6 flex flex-col items-center justify-center space-y-6">
              
              {paymentStatus === 'pending' ? (
                <>
                  <div className="w-full space-y-2 text-center">
                    <p className="text-stone-500 text-sm">Nomor Virtual Account</p>
                    <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg flex items-center justify-between group cursor-pointer relative">
                      <span className="font-mono text-2xl font-bold text-emerald-800 tracking-wider">
                        8800 1234 5678
                      </span>
                      <Copy className="w-4 h-4 text-emerald-600 opacity-50 group-hover:opacity-100" />
                    </div>
                    <p className="text-xs text-orange-500 font-medium animate-pulse">
                      Otomatis terbayar dalam {countdown} detik...
                    </p>
                  </div>

                  <div className="w-full border-t border-stone-100"></div>

                  <div className="w-full text-center space-y-3">
                    <p className="text-xs text-stone-400 uppercase font-bold tracking-widest">Metode Pembayaran</p>
                    <div className="flex justify-center gap-3">
                      <div className="h-8 w-12 bg-white border border-stone-200 rounded flex items-center justify-center shadow-sm">
                        <span className="font-bold text-blue-800 italic text-xs">VISA</span>
                      </div>
                      <div className="h-8 w-12 bg-white border border-stone-200 rounded flex items-center justify-center shadow-sm relative overflow-hidden">
                        <div className="flex -space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                          <div className="w-3 h-3 rounded-full bg-orange-400/80"></div>
                        </div>
                      </div>
                      <div className="h-8 w-12 bg-white border border-stone-200 rounded flex items-center justify-center shadow-sm">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-stone-400 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memproses transaksi...
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center space-y-4 py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <div className="text-center space-y-1">
                    <h4 className="text-xl font-bold text-emerald-800">Pembayaran Diterima!</h4>
                    <p className="text-stone-500 text-sm">Booking Anda telah dikonfirmasi.</p>
                  </div>
                </div>
              )}
            </div>
            
            {paymentStatus === 'pending' && (
              <div className="p-4 border-t border-stone-100 bg-stone-50">
                <button 
                  onClick={() => {
                    setShowPaymentModal(false);
                    setPaymentStatus('pending');
                    setCountdown(10);
                  }}
                  className="w-full py-2 text-stone-400 text-sm hover:text-stone-600 transition"
                >
                  Batalkan Pembayaran
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}