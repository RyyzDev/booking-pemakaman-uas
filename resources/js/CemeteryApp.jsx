import React, { useState, useEffect, useCallback } from 'react';
import { Trees, MapPin, User, CheckCircle, AlertCircle, Settings, LayoutGrid, X } from 'lucide-react';
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
  const initialView = localStorage.getItem('lastView') || 'home';
  const [view, setView] = useState(initialView);
  const [plots, setPlots] = useState([]); 
  const [orders, setOrders] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
   // Loading state
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleLogout = async () => {
    // perlu Auth Sanctum
    try {
        await axios.post('/api/logout'); 

    } catch (error) {
        console.error("Logout error:", error.response || error);
        // showNotification('Gagal logout di server.', 'error');
    } finally {
        // Bersihkan state dan Local Storage TANPA TERGANTUNG pada API
        localStorage.removeItem('authToken');
        setIsAdmin(false); 
        setView('login'); 
    }
};


  // --- FETCHING DATA (useEffect) ---

const fetchPlots = useCallback(async () => {
    setIsLoading(true);
    try {
      // Mengambil data kavling dari endpoint
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
  }, []);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
        setIsLoading(true);
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
        // ------------------------------------

      } finally {
        setIsLoading(false);
      }
    },
    [] 
  );
  const checkAuthStatus = useCallback(async () => {
     
      const token = localStorage.getItem('authToken');
      if (!token) {
          setIsAdmin(false);
          return;
      }

      try {
          const response = await axios.get('/api/user'); 
          
          if (response.data.id) {
              setIsAdmin(true);
              console.log("Status admin dikonfirmasi.");
          }
      } catch (error) {
          localStorage.removeItem('authToken');
          delete axios.defaults.headers.common['Authorization'];
          setIsAdmin(false);
          if (view === 'admin') {
               setNotification({ type: 'error', msg: 'Sesi Admin berakhir. Silakan login kembali.' });
               setView('login');
          }
      }
  }, [setIsAdmin, setView, setNotification, view]);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };


useEffect(() => {
    if (view === 'home' || view === 'booking') {
      fetchPlots();
    }
  }, [view, fetchPlots]);

  useEffect(() => {
    if (view === 'admin' && isAdmin) {
        fetchOrders();
        fetchPlots();
    }
}, [view, isAdmin, fetchOrders, fetchPlots]);

 useEffect(() => {
    // ambil token sekali saat aplikasi dimuat
    const fetchCSRFToken = async () => {
        try {
            await axios.get('/sanctum/csrf-cookie'); 
            console.log("Sanctum CSRF cookie berhasil dimuat.");
        } catch (error) {
            console.error("Gagal memuat CSRF cookie. Pastikan server Laravel berjalan:", error);
        }
    };
    fetchCSRFToken();
  }, []);

 useEffect(() => {
    fetchPlots(); 
}, [fetchPlots]);

useEffect(() => {
    // Setiap kali 'view' berubah, simpan ke Local Storage
    localStorage.setItem('lastView', view);
}, [view]);




  // --- HANDLERS ---

const handlePlotClick = (plot) => {
    // Status dari API: 'occupied' atau 'booked'
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
      // 1. Kirim data ke API Store Booking
      const payload = {
        kavling_id: selectedPlot.id, // ID Kavling dari API
        customer_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes
      };

      await axios.post('/api/bookings', payload);

      // Berhasil: Reset & Close, fetch ulang plots
      setShowModal(false);
      setFormData({ name: '', email: '', phone: '', notes: '' });
      showNotification('Permintaan booking berhasil dikirim!', 'success');
      
      // Ambil plots terbaru agar peta terupdate (status: booked)
      await fetchPlots(); 
      setView('home');

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


  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {notification && (
        <div 
          className={`fixed top-20 mt-15 right-5 px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-2 transition-transform duration-300 ease-out 
          ${notification.type === 'success' ? 'bg-emerald-800 text-white' : 'bg-red-600 text-white'}`}
        >
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {notification.msg}
        </div>
      )}

      <Navbar setView={setView} view={view} isAdmin={isAdmin} handleLogout={handleLogout} />
      <div>
        {view === 'home' && (
          <>
            <Hero setView={setView} />
            <div className="relative bg-white pb-20">  
            {/*  <div className="relative z-10 pt-12 text-center">
                <h3 className="font-serif text-2xl text-emerald-900 mb-4">
                  Mengapa Memilih Eternity Gardens?
                </h3>
                
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-100 hover:-translate-y-1 transition duration-300">
                    <LayoutGrid className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
                    <h4 className="font-bold mb-2">Penataan Rapi</h4>
                    <p className="text-stone-500 text-sm">
                      Kavling tertata sistematis dengan akses jalan yang nyaman dan asri.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-100 hover:-translate-y-1 transition duration-300">
                    <Settings className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
                    <h4 className="font-bold mb-2">Perawatan Rutin</h4>
                    <p className="text-stone-500 text-sm">
                      Layanan kebersihan dan rumput yang dirawat selamanya oleh tim kami.
                    </p>
                  </div>
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-stone-100 hover:-translate-y-1 transition duration-300">
                    <User className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
                    <h4 className="font-bold mb-2">Layanan 24 Jam</h4>
                    <p className="text-stone-500 text-sm">
                      Keamanan dan layanan pelanggan yang siap membantu kapan saja.
                    </p>
                  </div>
                </div>
              </div>*/}
              
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
      <CTASection />
            </div>
            <Footer />
          </>
        )}
        {view === 'booking' && (
          <div className="pt-30">
            <PlotMap plots={plots} handlePlotClick={handlePlotClick} isLoading={isLoading} />
          </div>
        )}


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
        {view === 'admin' && isAdmin && (
          <div className="pt-8">
            <AdminDashboard
              orders={orders}
              plots={plots}
              fetchPlots={fetchPlots}
              isLoading={isLoading} 
              handleStatusChange={handleStatusChange} 
              handleLogout={handleLogout}
              showNotification={showNotification}
            />
          </div>
        )}

      </div>   
        {showModal && selectedPlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md animate-in zoom-in duration-300">
            <div className="bg-emerald-900 p-4 flex justify-between items-center text-white rounded-t-2xl">
              <h3 className="font-bold">Booking Kavling {selectedPlot.number}</h3>
              <button 
                  onClick={() => setShowModal(false)}
                  // Tambahkan class agar tombol lebih mudah diklik
                  className="p-1 rounded-full hover:bg-white/10 transition" 
                >
                  <X className="w-5 h-5" />
          </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-stone-50 p-3 rounded border">
                <img 
                    src="https://www.makamalazhar.co.id/wp-content/uploads/2025/04/Investasi-Akhir-Bermakna-Memiliki-Kavling-Makam-Keluarga-1024x576.jpg" 
                    alt="Visualisasi Makam"
                    className="w-full h-40 object-cover rounded-md border border-stone-200"
                  />
                <p className="text-sm mt-3 font-medium">Harga: {formatRupiah(selectedPlot.price)}</p>
                <p className="text-xs">Ukuran: {selectedPlot.size}</p>
                <p className="text-xs font-bold text-red-500">ID Kavling: {selectedPlot.id}</p>
              </div>
              
              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <input name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="Nama Lengkap" className="w-full p-3 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" required />
                <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full p-3 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" required />
                <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Nomor Telepon" className="w-full p-3 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" required />
                <textarea name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Catatan Tambahan (Opsional)" className="w-full p-3 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" rows="2" />
                <button type="submit" className="w-full bg-emerald-800 text-white py-3 rounded-lg hover:bg-emerald-700 transition" disabled={isLoading}>
                  {isLoading ? 'Memproses...' : 'Kirim Permintaan Booking'}
                </button>
              </form>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
