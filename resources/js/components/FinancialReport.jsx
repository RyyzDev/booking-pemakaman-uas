import React, { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, Calendar, FileText, Printer } from 'lucide-react';
import { formatRupiah } from '../utils/formatRupiah'; 
import { ORDER_STATUSES } from '../utils/constants'; 
import {formatMonth} from '../utils/formatMonth';

const FinancialReport = ({ orders, plots, getPeriodLabel }) => {
    const [filterPeriod, setFilterPeriod] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

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

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
            {/* === BAGIAN LAYAR (Header & Controls) === */}
            <div className="print:hidden flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-emerald-800 flex items-center gap-2">
                    <DollarSign className="w-7 h-7" />
                    Laporan Keuangan
                </h2>
            </div>
            <div className="print:hidden flex flex-wrap gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm border border-stone-200">
                <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Periode Waktu:</label>
                    <select
                        value={filterPeriod}
                        onChange={(e) => setFilterPeriod(e.target.value)}
                        className="bg-stone-50 border border-stone-300 text-stone-700 text-sm rounded-lg px-4 py-2 outline-none min-w-[150px]"
                    >
                        <option value="all">Semua Waktu</option>
                        <option value="today">Hari Ini</option>
                        <option value="week">7 Hari Terakhir</option>
                        <option value="month">Bulan Ini</option>
                        <option value="year">Tahun Ini</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Status Pesanan:</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-stone-50 border border-stone-300 text-stone-700 text-sm rounded-lg px-4 py-2 outline-none min-w-[150px]"
                    >
                        <option value="all">Semua Status</option>
                        <option value="completed">Selesai</option>
                        <option value="processing">Sedang Proses</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-xl shadow-lg text-white">
                    <p className="text-emerald-100 text-sm font-medium mb-2">Total Pendapatan Berjalan</p>
                    <p className="text-3xl font-bold">{formatRupiah(statistics.totalRevenue)}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
                    <p className="text-blue-100 text-sm font-medium mb-2">Pendapatan Selesai</p>
                    <p className="text-3xl font-bold">{formatRupiah(statistics.completedRevenue)}</p>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-xl shadow-lg text-white">
                    <p className="text-amber-100 text-sm font-medium mb-2">Pending</p>
                    <p className="text-3xl font-bold">{formatRupiah(statistics.pendingRevenue)}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 mb-6">
                <h3 className="text-lg font-bold text-stone-800 mb-4">Tren Pendapatan (6 Bulan Terakhir)</h3>
                <div className="space-y-4">
                    {monthlyData.map(([month, data]) => {
                        const maxRevenue = Math.max(...monthlyData.map(([, d]) => d.revenue));
                        const percentage = maxRevenue > 0 ? (data.revenue / maxRevenue) * 100 : 0;
                        return (
                            <div key={month} className="flex items-center gap-4">
                                <div className="w-24 text-sm text-stone-600 font-medium text-right">{formatMonth(month)}</div>
                                <div className="flex-1 bg-stone-100 rounded-full h-6 relative overflow-hidden">
                                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${percentage}%` }}></div>
                                </div>
                                <div className="w-32 text-right text-sm font-bold text-stone-700">{formatRupiah(data.revenue)}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* === TABEL === */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden mb-6 print:border-none print:shadow-none">
                <div className="print:hidden p-4 border-b border-stone-200 bg-stone-50 font-medium text-stone-700 flex justify-between">
                    <span>Detail Transaksi</span>
                    <span className="text-xs font-normal text-stone-500 self-center">Menampilkan {filteredOrders.length} data</span>
                </div>
                
                {filteredOrders.length === 0 ? (
                    <div className="p-12 text-center text-stone-400">Tidak ada transaksi.</div>
                ) : (
                    <div className="overflow-x-auto print:overflow-visible">
                        <table className="w-full text-sm text-left">
                            <thead className="text-stone-500 bg-stone-50 uppercase text-xs print:bg-stone-100 print:text-black">
                                <tr>
                                    <th className="px-6 py-3">Tanggal</th>
                                    <th className="px-6 py-3">ID Pesanan</th>
                                    <th className="px-6 py-3">Pelanggan</th>
                                    <th className="px-6 py-3">Kavling</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Nilai</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order, index) => {
                                    const statusData = ORDER_STATUSES[order.status] || ORDER_STATUSES.pending;
                                    return (
                                        <tr key={order.id} className="bg-white border-b print:border-stone-300">
                                            <td className="px-6 py-4 text-stone-600 whitespace-nowrap">
                                                {new Date(order.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-stone-900">#{order.id}</td>
                                            <td className="px-6 py-4 text-stone-700">{order.customer_name}</td>
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 print:border-none print:bg-transparent print:p-0">
                                                    {order.kavling?.number || '-'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${statusData.color} print:bg-transparent print:text-stone-800 print:p-0 print:border-none`}>
                                                    {statusData.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-stone-900">
                                                {order.kavling ? formatRupiah(Number(order.kavling.price)) : 'Rp 0'}
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
    );
};

export default FinancialReport;