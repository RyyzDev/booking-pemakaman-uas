import React, { useState, useMemo } from 'react';
import { Phone, Mail, Eye, AlertCircle, CheckCircle, Clock, XCircle, X, MapPin, Printer, Trash2 } from 'lucide-react';
import KavlingManagement from './KavlingManagement';
import FinancialReport from './FinancialReport'; 
import {ORDER_STATUSES} from '../utils/constants';
import {formatRupiah} from '../utils/formatRupiah';
import axios from '../config/axios'; 



// Component Helper
const DetailItem = ({ label, value, icon }) => (
    <div className="flex justify-between items-start border-b border-stone-100 pb-1">
        <span className="text-stone-500 text-xs uppercase tracking-wider">{label}:</span>
        <span className="font-medium text-stone-900 text-right flex items-center gap-2 truncate">
            {icon}
            {value}
        </span>
    </div>
);

// --- MAIN COMPONENT ---

const AdminDashboard = ({ orders = [], plots, fetchPlots, fetchOrders, isLoading, handleLogout, handleStatusChange, showNotification }) => {
    
    const [activeTab, setActiveTab] = useState('orders');
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isLoadingOrder, setIsLoadingOrder] = useState(false);
    const [filterPeriod, setFilterPeriod] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');


    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const processingCount = orders.filter(o => o.status === 'processing').length;
    const readyCount = orders.filter(o => o.status === 'ready').length;
    const completedCount = orders.filter(o => o.status === 'completed').length;
      // --- Logic Filter & Statistik
    const filteredOrders = useMemo(() => {
        if (!orders) return [];
        let filtered = [...orders];
        if (filterStatus !== 'all') {
            filtered = filtered.filter(order => order.status === filterStatus);
        }
        if (filterPeriod !== 'all') {
            const now = new Date();
            filtered = filtered.filter(order => {
                const orderDate = new Date(order.created_at);
                switch(filterPeriod) {
                    case 'today': return orderDate.toDateString() === now.toDateString();
                    case 'week': return orderDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    case 'month': return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
                    case 'year': return orderDate.getFullYear() === now.getFullYear();
                    default: return true;
                }
            });
        }
        return filtered;
    }, [orders, filterPeriod, filterStatus]);

    const statistics = useMemo(() => {
        const getPrice = (order) => Number(order.kavling?.price || 0);

        const totalRevenue = filteredOrders.reduce((sum, order) => sum + getPrice(order), 0);
        
        const completedOrders = filteredOrders.filter(o => o.status === 'completed');
        const completedRevenue = completedOrders.reduce((sum, order) => sum + getPrice(order), 0);
        
        const pendingOrders = filteredOrders.filter(o => o.status === 'pending');
        const pendingRevenue = pendingOrders.reduce((sum, order) => sum + getPrice(order), 0);
        
        return {
            totalRevenue,
            completedRevenue,
            pendingRevenue,
            totalOrders: filteredOrders.length,
            completedCount: completedOrders.length,
            pendingCount: pendingOrders.length,
            averageOrderValue: filteredOrders.length > 0 ? totalRevenue / filteredOrders.length : 0
        };
    }, [filteredOrders]);

    const monthlyData = useMemo(() => {
        const grouped = {};
        filteredOrders.forEach(order => {
            const date = new Date(order.created_at);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            if (!grouped[monthKey]) grouped[monthKey] = { count: 0, revenue: 0 };
            grouped[monthKey].count += 1;
            grouped[monthKey].revenue += Number(order.kavling?.price || 0);
        });
        return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0])).slice(-6);
    }, [filteredOrders]);

     const formatMonth = (monthKey) => {
        const [year, month] = monthKey.split('-');
        const date = new Date(year, parseInt(month) - 1);
        return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short' });
    };

    const getPeriodLabel = () => {
        switch(filterPeriod) {
            case 'today': return 'Hari Ini';
            case 'week': return '7 Hari Terakhir';
            case 'month': return 'Bulan Ini';
            case 'year': return 'Tahun Ini';
            default: return 'Semua Waktu';
        }
    };


    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setSelectedOrder(null);
        setIsDetailModalOpen(false);
    };

    const handlePrint = () => {
        window.print();
    };

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    };

    const handleDeleteOrders = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus Pesanan ini?')) return;
        setIsLoadingOrder(true);
        try {
            const response = await axios.delete(`/api/orders/${id}`);
            showNotification(response.data.message || 'Pesanan berhasil dihapus.', 'success');
            
            await fetchOrders();
            
        } catch (error) {
            console.error("Orders Delete Error:", error);
            showNotification('Gagal menghapus Pesanan!', 'error');
        } finally {
            setIsLoadingOrder(false);
        }
    };

     const getUserName = () => {
        try {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const user = JSON.parse(userData);
                return user.name || 'Admin';
            }
        } catch (error) {
            console.error('Error parsing userData:', error);
        }
        return 'Admin';
    };

    const getUserEmail = () => {
        try {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const user = JSON.parse(userData);
                return user.email || '';
            }
        } catch (error) {
            console.error('Error parsing userData:', error);
        }
        return '';
    };

    return (
     <div className="max-w-6xl mx-auto p-6">
            <div className="mb-20"></div>

            {/* TAB NAVIGATION */}
            <div className="flex border-b border-stone-300 mb-6 print:hidden">
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-6 py-3 text-sm font-medium transition duration-150 ease-in-out ${
                        activeTab === 'orders' ? 'border-b-2 border-emerald-600 text-emerald-600 font-bold' : 'text-stone-500 hover:text-emerald-500'
                    }`}
                >
                    Daftar Pesanan ({orders.length})
                </button>
                <button
                    onClick={() => setActiveTab('kavling')}
                    className={`px-6 py-3 text-sm font-medium transition duration-150 ease-in-out ${
                        activeTab === 'kavling' ? 'border-b-2 border-emerald-600 text-emerald-600 font-bold' : 'text-stone-500 hover:text-emerald-500'
                    }`}
                >
                    Kelola Kavling ({plots.length})
                </button>
                {/* TAB LAPORAN KEUANGAN */}
                <button
                    onClick={() => setActiveTab('financial')}
                    className={`px-6 py-3 text-sm font-medium transition duration-150 ease-in-out ${
                        activeTab === 'financial' ? 'border-b-2 border-emerald-600 text-emerald-600 font-bold' : 'text-stone-500 hover:text-emerald-500'
                    }`}
                >
                    Laporan Keuangan
                </button>
            </div>
            
            {/* CONTENT SWITCHING */}
            {activeTab === 'orders' && (
                <div className="max-w-6xl mx-auto p-6 print:hidden">
                  <h2 className="text-2xl text-center font-arial font-bold text-emerald-800 mb-6">Pesanan Masuk</h2>
                 
                  {isLoading && <div className="text-center text-emerald-600 mb-4">Memuat data pesanan...</div>}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 text-center">
                      <p className="mb-2 font-bold text-stone-500">Belum Proses</p>
                      <p className="text-3xl font-bold text-red-600">{pendingCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 text-center">
                      <p className="mb-2 font-bold text-stone-500">Sedang Proses</p>
                      <p className="text-3xl font-bold text-blue-600">{processingCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 text-center">
                      <p className="mb-2 font-bold text-stone-500">Siap Digunakan</p>
                      <p className="text-3xl font-bold text-emerald-600">{readyCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 text-center">
                      <p className="mb-2 font-bold text-stone-500">Selesai</p>
                      <p className="text-3xl font-bold text-gray-600">{completedCount}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                    <div className="p-4 border-b border-stone-200 bg-stone-50 font-medium text-stone-700">
                      Daftar Pesanan Masuk ({orders.length})
                    </div>
                    {orders.length === 0 && !isLoading ? (
                      <div className="p-12 text-center text-stone-400">
                        Belum ada data pesanan masuk.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                       <table className="w-full text-sm text-left">
                            <thead className="text-stone-500 bg-stone-50 uppercase text-xs">
                              <tr>
                                <th className="px-6 py-3">ID & Tanggal</th>
                                <th className="px-6 py-3">Pelanggan</th>
                                <th className="px-6 py-3">Kavling</th>
                                <th className="px-6 py-3">Kontak</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Aksi</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders.filter(order => order != null).map((order) => {
                                const statusKey = order.status || 'pending'; 
                                const statusData = ORDER_STATUSES[statusKey] || ORDER_STATUSES.pending;
                                const StatusIcon = statusData.icon;
                                
                                return (
                                  <tr key={order.id} className="bg-white border-b hover:bg-stone-50 transition">
                                    
                                    <td className="px-6 py-4">
                                      <div className="font-medium text-stone-900">#{order.id}</div>
                                      <div className="text-stone-400 text-xs">
                                        {formatDate(order.created_at)}
                                      </div>
                                    </td>
                                    
                                    <td className="px-6 py-4">
                                      <div className="font-medium text-stone-800">{order.customer_name}</div>
                                      <div className="text-stone-500 text-xs truncate max-w-[180px]" title={order.notes || 'Tidak ada catatan'}>
                                        {order.notes || '-'}
                                      </div>
                                    </td>
                                    
                                    <td className="px-6 py-4">
                                      {order.kavling ? (
                                          <div className="font-bold text-emerald-800">
                                              {order.kavling.number} 
                                              <span className="block text-xs font-normal text-stone-500">{order.kavling.size}</span>
                                          </div>
                                      ) : (
                                          <span className="text-stone-400">Kavling tidak ditemukan</span>
                                      )}
                                    </td>

                                    <td className="px-6 py-4">
                                      <div className="flex items-center gap-2 text-stone-600 mb-1">
                                        <Phone className="w-3 h-3" /> {order.phone}
                                      </div>
                                      <div className="flex items-center gap-2 text-stone-600 truncate max-w-[200px]">
                                        <Mail className="w-3 h-3" /> {order.email}
                                      </div>
                                    </td>
                                    
                                    <td className="px-6 py-4">
                                      <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${statusData.color}`}>
                                        <StatusIcon className="w-3 h-3" />
                                        {statusData.label}
                                      </span>
                                    </td>
                                    
                                    <td className="px-6 py-4 grid-cols-3">
                                      <select 
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="bg-white border border-stone-300 text-stone-700 text-xs rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2"
                                        disabled={isLoading}
                                      >
                                        {Object.entries(ORDER_STATUSES).map(([key, val]) => (
                                          <option key={key} value={key}>{val.label}</option>
                                        ))}
                                      </select>
                                    <div>
                                    <button
                                        onClick={() => handleViewDetails(order)}
                                        className="mt-2 text-blue-500 flex items-left gap-1 hover:text-blue-700 text-xs"
                                    >
                                      <Eye size={20} /> Detail
                                    </button>
                                       <button
                                          onClick={() => handleDeleteOrders(order.id)}
                                          className="text-red-500 mt-2 flex items-center hover:text-red-700 text-xs">
                                        <Trash2 size={20} /> Hapus
                                      </button>
                                    </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                      </div>
                    )}
                  </div>
                </div>
            )}

            {activeTab === 'kavling' && (
                <div className="print:hidden">
                    <KavlingManagement 
                        plots={plots} 
                        fetchPlots={fetchPlots} 
                        showNotification={showNotification}
                    />
                </div>
            )}

            {/* TAB FINANCIAL REPORT */}
            {activeTab === 'financial' && (
                <div className="print:hidden">
                    <FinancialReport 
                        orders={orders} 
                        plots={plots}
                        filteredOrders={filteredOrders}
                        statistics={statistics}
                        monthlyData={monthlyData}
                        formatMonth={formatMonth}
                        getPeriodLabel={getPeriodLabel}
                    />
                </div>
            )}

            {/* --- MODAL DAN INVOICE AREA --- */}
            {isDetailModalOpen && selectedOrder && (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm print:hidden">
                        <div className="bg-white rounded-xl w-full max-w-3xl shadow-2xl space-y-4 animate-in zoom-in duration-300">
                    
                            <div className="flex justify-between items-center p-4 border-b bg-emerald-50 rounded-t-xl">
                                <h3 className="text-2xl font-extrabold text-emerald-800">Detail Pesanan #{selectedOrder.id}</h3>
                                <button type="button" onClick={closeDetailModal} className="text-stone-600 hover:text-red-700 p-2 rounded-full hover:bg-emerald-100 transition">
                                    <X size={24} />
                                </button>
                            </div>
                            
                            <div className="p-4 grid grid-cols-3 gap-6">
                                
                                <div className="col-span-1 space-y-4 border-r pr-6">
                                    <div className="space-y-2 pb-2 border-b">
                                        <p className="text-sm font-medium text-stone-500 flex justify-between items-center"> 
                                            <span className="font-semibold text-stone-700">
                                                {formatDate(selectedOrder.created_at)}
                                            </span>
                                        </p>
                                        {(() => {
                                            const statusData = ORDER_STATUSES[selectedOrder.status] || ORDER_STATUSES.pending;
                                            const StatusIcon = statusData.icon;
                                            return (
                                                <div className="flex justify-start">
                                                    <span><strong>STATUS : </strong></span> 
                                                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold shadow-md ${statusData.color}`}>
                                                        <StatusIcon className="w-4 h-4" /> 
                                                        {statusData.label}
                                                    </span>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                    <h4 className="font-bold text-lg text-stone-700 mt-4">Informasi Pelanggan</h4>
                                    <div className="space-y-3 text-sm">
                                        <DetailItem label="Nama Lengkap" value={selectedOrder.customer_name} />
                                        <DetailItem label="Email" value={selectedOrder.email} icon={<Mail size={14} />} />
                                        <DetailItem label="Telepon" value={selectedOrder.phone} icon={<Phone size={14} />} />
                                    </div>
                                </div>

                                <div className="col-span-1 space-y-4 border-r mr-5 pr-5">
                                    <h4 className="font-bold text-lg text-stone-700">Alamat Customer</h4>
                                    <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-sm">
                                        <p className="font-medium text-stone-900 flex items-start gap-2">
                                            <MapPin size={16} className="mt-0.5 text-stone-500 flex-shrink-0" />
                                            {selectedOrder.address || 'Alamat tidak tersedia.'}
                                        </p>
                                    </div>
                                    <h4 className="font-bold text-lg text-stone-700 pt-3">Detail Kavling</h4>
                                    {selectedOrder.kavling ? (
                                        <div className="space-y-3 text-sm">
                                            <DetailItem label="Nomor Kavling" value={<span className="font-extrabold text-xl text-emerald-700">{selectedOrder.kavling.number}</span>} />
                                            <DetailItem label="Ukuran/Tipe" value={selectedOrder.kavling.size} />
                                            <DetailItem label="Harga Total" value={<span className="font-bold text-l text-red-700">{formatRupiah(selectedOrder.kavling.price)}</span>} />
                                        </div>
                                    ) : (
                                        <div className="text-sm text-stone-500 italic p-3 bg-red-50 rounded-lg">Data kavling tidak tersedia.</div>
                                    )}
                                </div>

                                <div className="col-span-1 space-y-4">
                                    <h4 className="font-bold text-lg text-stone-700">Pesan Customer</h4>
                                    <div className="p-4 h-full bg-stone-100 border border-stone-200 rounded-lg text-sm text-stone-700 overflow-y-auto max-h-[300px] shadow-inner">
                                        {selectedOrder.notes || 'Tidak ada catatan tambahan dari customer.'}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 flex justify-between bg-stone-50 rounded-b-xl border-t">
                                <button 
                                    onClick={handlePrint}
                                    className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition shadow-md font-semibold"
                                >
                                    <Printer size={18} />
                                    Cetak Struk
                                </button>
                                <button 
                                    onClick={closeDetailModal}
                                    className="bg-stone-300 text-stone-700 px-6 py-2 rounded-lg hover:bg-stone-400 transition shadow-md font-semibold"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>


             {/* Invoice */}
                   <div className="hidden print:block print:fixed print:inset-0 print:bg-white print:z-[100] print:p-12 text-black print:overflow-visible">
                        
                        <div className="flex justify-between items-start border-b-2 border-stone-800 pb-6 mb-8">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-emerald-900 mb-1">Eternity Gardens</h1>
                                <p className="text-sm text-stone-600">Jl. UIN Jakarta, Fakultas Sains dan Teknologi, Teknik Informatika 2025 D, Kelompok 1</p>
                                <p className="text-sm text-stone-600">admin@cemetery.com | (08) 123-4567</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-4xl font-extrabold text-stone-300 uppercase tracking-widest">INVOICE</h2>
                                <div className="mt-2 text-sm">
                                    <p className="font-bold text-stone-800">No. #{selectedOrder.id}</p>
                                    <p className="text-stone-600">{formatDate(selectedOrder.created_at)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-12 mb-8">
                            <div>
                                <h3 className="text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Kepada:</h3>
                                <p className="font-bold text-xl text-stone-900 mb-1">{selectedOrder.customer_name}</p>
                                <p className="text-sm text-stone-700 mb-2">{selectedOrder.address || 'Alamat tidak tersedia'}</p>
                                <p className="text-sm text-stone-700 mt-1 flex items-center gap-2"><Phone size={12}/> {selectedOrder.phone}</p>
                                <p className="text-sm text-stone-700 flex items-center gap-2"><Mail size={12}/> {selectedOrder.email}</p>
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <h3 className="text-xs font-bold uppercase text-stone-500 mb-2 tracking-wider">Status Pembayaran:</h3>
                                {(() => {
                                    const statusLabel = ORDER_STATUSES[selectedOrder.status]?.label || 'Pending';
                                    return (
                                        <div className="border-2 border-stone-800 px-6 py-2 rounded text-center">
                                            <span className="font-bold text-lg uppercase text-stone-900">{statusLabel}</span>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>

                        <div className="mb-8 mt-4">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-stone-800">
                                        <th className="py-3 text-sm font-bold text-stone-800 uppercase">Deskripsi Item</th>
                                        <th className="py-3 text-sm font-bold text-stone-800 uppercase text-center">Tipe / Ukuran</th>
                                        <th className="py-3 text-sm font-bold text-stone-800 uppercase text-right">Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.kavling ? (
                                        <tr className="border-b border-stone-200">
                                            <td className="py-4">
                                                <p className="font-bold text-stone-900 text-lg">Kavling Nomor {selectedOrder.kavling.number}</p>
                                                <p className="text-xs text-stone-500 mt-1">Ref ID: {selectedOrder.kavling.id}</p>
                                            </td>
                                            <td className="py-4 text-center text-stone-700 font-medium">
                                                {selectedOrder.kavling.size}
                                            </td>
                                            <td className="py-4 text-right font-bold text-stone-900 text-lg">
                                                {formatRupiah(selectedOrder.kavling.price)}
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="py-4 text-center italic text-stone-500">Data kavling tidak tersedia</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end mb-12">
                            <div className="w-1/2">
                                <div className="flex justify-between py-2 border-b border-stone-300">
                                    <span className="font-medium text-stone-600">Subtotal</span>
                                    <span className="font-medium text-stone-900">{selectedOrder.kavling ? formatRupiah(selectedOrder.kavling.price) : 'Rp 0'}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b-2 border-stone-800 mt-2">
                                    <span className="text-xl font-bold text-stone-900">Total</span>
                                    <span className="text-xl font-bold text-emerald-900">{selectedOrder.kavling ? formatRupiah(selectedOrder.kavling.price) : 'Rp 0'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-stone-200 pt-6 mt-auto">
                            <h4 className="text-xs font-bold uppercase text-stone-500 mb-2">Catatan:</h4>
                            <p className="text-sm text-stone-600 mb-8 italic bg-stone-50 p-4 border border-stone-100 rounded">
                                "{selectedOrder.notes || 'Tidak ada catatan khusus untuk pesanan ini.'}"
                            </p>
                            
                            <div className="text-center mt-12 text-xs text-stone-400">
                                <p>Terima kasih atas kepercayaan Anda.</p>
                                <p>Dokumen ini dicetak secara otomatis oleh sistem administrasi.</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
  };

export default AdminDashboard;