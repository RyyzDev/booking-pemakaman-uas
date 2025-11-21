import { AlertCircle, Clock, MapPin, CheckCircle } from 'lucide-react';

// Status
export const ORDER_STATUSES = {
  pending: { label: 'Belum Diproses', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
  processing: { label: 'Sedang Diproses', color: 'bg-blue-100 text-blue-800', icon: Clock },
  ready: { label: 'Siap Digunakan', color: 'bg-emerald-100 text-emerald-800', icon: MapPin },
  completed: { label: 'Selesai', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
};
