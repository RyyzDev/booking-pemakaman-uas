import React, { useState, useEffect, useMemo } from 'react';
// Tambahkan import ArrowUpDown untuk ikon sort
import { Plus, RefreshCcwDot, Pencil, Trash2, X, ArrowUpDown } from 'lucide-react';
import axios from '../config/axios';
import { formatRupiah } from '../utils/formatRupiah';

const KavlingManagement = ({ plots, fetchPlots, showNotification }) => {
    // STATE MANAGEMENT
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPlot, setCurrentPlot] = useState(null); 
    const [formData, setFormData] = useState({ number: '', size: '', price: '', status: '' });
    const [isLoading, setIsLoading] = useState(false); 
    const [sortOrder, setSortOrder] = useState('asc'); 

    useEffect(() => {
        fetchPlots(); 
    }, [fetchPlots]);

    // LOGIKA SORTING
    const sortedPlots = useMemo(() => {
        let dataToSort = [...plots];

        dataToSort.sort((a, b) => {
            const valA = a.number ? a.number.toString() : '';
            const valB = b.number ? b.number.toString() : '';

            if (sortOrder === 'asc') {
                return valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' });
            } else {
                return valB.localeCompare(valA, undefined, { numeric: true, sensitivity: 'base' });
            }
        });

        return dataToSort;
    }, [plots, sortOrder]);

    // HANDLER UNTUK UBAH URUTAN
    const toggleSort = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    // HANDLERS LAINNYA
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditClick = (plot) => {
        setCurrentPlot(plot);
        setFormData({ number: plot.number, size: plot.size, price: String(plot.price), status: plot.status }); 
        setIsModalOpen(true);
    };

    const handleAddClick = () => { 
        setCurrentPlot(null);
        setFormData({ number: '', size: '', price: '', status: '' });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const endpoint = currentPlot 
            ? `/api/plots/${currentPlot.id}`
            : '/api/plots'; 

        const method = currentPlot ? axios.put : axios.post;

        try {
            const response = await method(endpoint, formData);
            showNotification(response.data.message || 'Data kavling berhasil diperbarui.', 'success');
            fetchPlots(); 
        } catch (error) {
            console.error("Kavling CRUD Error:", error);
            showNotification('Gagal menyimpan data kavling.', 'error');
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus kavling ini?')) return;
        setIsLoading(true);
        try {
            const response = await axios.delete(`/api/plots/${id}`);
            showNotification(response.data.message || 'Kavling berhasil dihapus.', 'success');
            fetchPlots(); 
        } catch (error) {
            console.error("Kavling Delete Error:", error);
            showNotification('Gagal menghapus kavling, Karena ada yang Order!!', 'error');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="space-y-6">
            <h2 className="text-2xl text-center font-arial font-bold text-emerald-800 mb-6">Kelola Kavling</h2>
            <div className="flex justify-between items-center">
                <button
                    onClick={handleAddClick} 
                    className="flex items-center gap-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                    disabled={isLoading}
                >
                    <Plus size={18} /> Tambah Kavling Baru
                </button>
                <button 
                    onClick={fetchPlots}
                    className="flex items-center gap-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                    disabled={isLoading}
                >
                    <RefreshCcwDot size={20} />Refresh
                </button>
            </div>

            {/* TABEL DAFTAR KAVLING */}
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-4 border-b border-stone-200 bg-stone-50 font-medium text-stone-700">
                    Daftar Semua Kavling ({plots.length})
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-stone-500 bg-stone-50 uppercase text-xs">
                            <tr>   
                                <th 
                                    className="px-6 py-3 cursor-pointer hover:bg-stone-200 transition group select-none"
                                    onClick={toggleSort}
                                    title="Klik untuk mengurutkan"
                                >
                                    <div className="flex items-center gap-1">
                                        Nomor Kavling
                                        <ArrowUpDown size={14} className={`text-stone-400 ${sortOrder === 'asc' ? 'text-emerald-600' : ''}`} />
                                    </div>
                                </th>

                                <th className="px-6 py-3">Ukuran</th>
                                <th className="px-6 py-3">Harga</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPlots.map((plot) => (
                                <tr key={plot.id} className="bg-white border-b hover:bg-stone-50 transition">
                                    <td className="px-6 py-4 font-bold">{plot.number}</td>
                                    <td className="px-6 py-4">{plot.size}</td>
                                    <td className="px-6 py-4 text-emerald-700 font-medium">{formatRupiah(plot.price)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${plot.status === 'available' ? 'bg-green-100 text-green-800' : plot.status === 'booked' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                            {plot.status.charAt(0).toUpperCase() + plot.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex space-x-2">
                                        <button 
                                            onClick={() => handleEditClick(plot)} 
                                            className="text-blue-500 hover:text-blue-700"
                                            disabled={isLoading}
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(plot.id)} 
                                            className="text-red-500 hover:text-red-700"
                                            disabled={isLoading}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl w-full max-w-md p-6 space-y-4 animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center pb-2 border-b">
                            <h3 className="text-xl font-bold text-emerald-800">{currentPlot ? 'Edit Kavling ' + currentPlot.number : 'Tambah Kavling Baru'}</h3>
                            <button type="button" onClick={() => setIsModalOpen(false)} className="text-stone-500 hover:text-red-600">
                                <X size={20} />
                            </button>
                        </div>
                        {!currentPlot && (
                            <input 
                                name="number" 
                                type="text" 
                                value={formData.number} 
                                onChange={handleInputChange} 
                                placeholder="Nomor Kavling (A1, B5)" 
                                className="w-full p-3 border rounded-lg" 
                                required 
                                disabled={isLoading} 
                            />
                        )}

                        <select
                              name="size"
                              value={formData.size}
                              onChange={handleInputChange}
                              className="w-full p-3 border rounded-lg"
                              required
                              disabled={isLoading}
                            >
                              <option value="" disabled>Pilih Ukuran</option>
                              <option value="Single">Single</option>
                              <option value="Family">Family</option>
                              <option value="Deluxe">Deluxe</option>
                        </select>
                        <input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Harga (tanpa Rp)" className="w-full p-3 border rounded-lg" required disabled={isLoading} />
                         <select
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                              className="w-full p-3 border rounded-lg"
                              required
                              disabled={isLoading}
                            >
                              <option value="" disabled>Pilih Status</option>
                              <option value="available">Tersedia</option>
                              <option value="booked">Ter-booking</option>
                              <option value="occupied">Terisi</option>
                        </select>
                        <div className="flex justify-end space-x-2 pt-4">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="bg-stone-200 text-stone-700 px-4 py-2 rounded-lg hover:bg-stone-300 transition" disabled={isLoading}>Batal</button>
                            <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition" disabled={isLoading}>
                                {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default KavlingManagement;