import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, Eye } from 'lucide-react';
import { ORDER_STATUSES } from '../utils/constants';
import KavlingManagement from './KavlingManagement';

const AdminDashboard = ({ orders, plots, fetchPlots, isLoading, handleLogout, handleStatusChange, showNotification }) => {
    
    const [activeTab, setActiveTab] = useState('');
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    // Hitung status order
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const processingCount = orders.filter(o => o.status === 'processing').length;
    const readyCount = orders.filter(o => o.status === 'ready').length;
    const completedCount = orders.filter(o => o.status === 'completed').length;

    const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
   };

    const closeDetailModal = () => {
        setSelectedOrder(null);
        setIsDetailModalOpen(false);
    };

    return (
     <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-serif font-bold text-stone-800 mb-6">Admin Dashboard</h2>

            {/* TAB NAVIGATION */}
            <div className="flex border-b border-stone-300 mb-6">
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
            </div>
            
            {/* CONTENT SWITCHING */}
            {activeTab === 'orders' && (
                <div className="max-w-6xl mx-auto p-6">
                  <h2 className="text-2xl font-serif font-bold text-stone-800 mb-6">Admin Dashboard</h2>
                 
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
                              const statusData = ORDER_STATUSES[order.status] || ORDER_STATUSES.pending;
                              const StatusIcon = statusData.icon;
                              return (
                                <tr key={order.id} className="bg-white border-b hover:bg-stone-50 transition">
                                  <td className="px-6 py-4">
                                    <div className="font-medium text-stone-900">{order.id}</div>
                                    <div className="text-stone-400 text-xs">order date: null</div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="font-medium text-stone-800">{order.customer_name}</div>
                                    <div className="text-stone-500 text-xs truncate max-w-[150px]">{order.notes || '-'}</div>
                                  </td>
                                  <td className="px-6 py-4 font-bold text-emerald-800">
                                    {order.kavling_number || 'Nomor Kavling Belum Ada'}
                                </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-stone-600 mb-1">
                                      <Phone className="w-3 h-3" /> {order.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-stone-600">
                                      <Mail className="w-3 h-3" /> {order.email}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${statusData.color}`}>
                                      <StatusIcon className="w-3 h-3" />
                                      {statusData.label}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
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
                                    <button
                                        onClick={() => handleViewDetails(order)}
                                        className="border-stone-200 mt-2 text-blue-500 hover:text-blue-700 text-xs flex items-center gap-1"
                                    >
                                      <Eye size={20} /> Detail
                                    </button>
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
                <KavlingManagement 
                    plots={plots} 
                    fetchPlots={fetchPlots} 
                    showNotification={showNotification}
                />
            )}

            {isDetailModalOpen && selectedOrder && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 ">
        <div className="bg-white mt-25 rounded-xl w-full max-w-lg shadow-2xl space-y-4 animate-in zoom-in duration-300">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center p-3 border-b bg-stone-50 rounded-t-xl">
                <h3 className="text-xl font-bold text-emerald-800">Detail Pesanan #{selectedOrder.id}</h3>
                <button type="button" onClick={closeDetailModal} className="text-stone-500 hover:text-red-600">
                    <X size={20} />
                </button>
            </div>
            
            {/* Body Detail */}
            <div className="pl-5 mt-0 space-y-5">
                
                  {/* Status & ID */}
                      <div className="flex justify-between items-center pb-0 pt-0 border-b border-stone-100">
                          <p className="text-sm font-medium text-stone-500">Tanggal Order: <span className="font-semibold text-stone-700">{selectedOrder.order_date || 'N/A'}</span></p>
                          {(() => {
                              const statusData = ORDER_STATUSES[selectedOrder.status] || ORDER_STATUSES.pending;
                              const StatusIcon = statusData.icon;
                              
                              return (
                                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${statusData.color}`}>
                                      <StatusIcon className="w-3 h-3" /> 
                                      {statusData.label}
                                  </span>
                              );
                          })()}
                
            </div>

                {/* Informasi Pelanggan */}
                <h4 className="font-bold text-stone-700 border-b pb-1">Informasi Pelanggan</h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div className="flex flex-col">
                        <span className="text-stone-500 text-xs">Nama Lengkap:</span>
                        <span className="font-medium text-stone-900">{selectedOrder.customer_name}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-stone-500 text-xs">Email:</span>
                        <span className="font-medium text-stone-900 flex items-center gap-1"><Mail size={12} /> {selectedOrder.email}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-stone-500 text-xs">Telepon:</span>
                        <span className="font-medium text-stone-900 flex items-center gap-1"><Phone size={12} /> {selectedOrder.phone}</span>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <span className="text-stone-500 text-xs">Alamat:</span>
                        <span className="font-medium text-stone-900 flex items-center gap-1"><MapPin size={12} /> {selectedOrder.address || '-'}</span>
                    </div>
                </div>

                {/* Detail Kavling */}
                <h4 className="font-bold text-stone-700 border-b pb-1 pt-3">Detail Kavling</h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div className="flex flex-col">
                        <span className="text-stone-500 text-xs">Nomor Kavling:</span>
                        {/* ASUMSI data kavling ada di selectedOrder.kavling.number */}
                        <span className="font-bold text-emerald-700 text-lg">{selectedOrder.kavling_number || 'Data Kavling Hilang'}</span> 
                    </div>
                    <div className="flex flex-col">
                        <span className="text-stone-500 text-xs">Ukuran/Tipe:</span>
                        <span className="font-medium text-stone-900">{selectedOrder.kavling_size || '-'}</span>
                    </div>
                    <div className="flex flex-col col-span-2">
                        <span className="text-stone-500 text-xs">Harga Total:</span>
                        <span className="font-bold text-emerald-600 text-md">{selectedOrder.total_price ? formatRupiah(selectedOrder.total_price) : 'N/A'}</span>
                    </div>
                </div>

                {/* Catatan Tambahan */}
                <h4 className="font-bold text-stone-700 border-b pb-1 pt-3">Catatan Admin/Internal</h4>
                <div className="p-3 bg-stone-50 border rounded-lg text-sm text-stone-700">
                    {selectedOrder.notes || 'Tidak ada catatan tambahan.'}
                </div>
            </div>

            {/* Footer Modal */}
            <div className="p-4 flex justify-end bg-stone-50 rounded-b-xl">
                <button 
                    onClick={closeDetailModal}
                    className="bg-stone-300 text-stone-700 px-4 py-2 rounded-lg hover:bg-stone-400 transition"
                >
                    Tutup
                </button>
            </div>
        </div>
    </div>
)}
        </div>
    );
  };

export default AdminDashboard;
