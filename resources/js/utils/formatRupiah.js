export const formatRupiah = (number) => {
    if (isNaN(number) || number === null) {
        return 'Rp 0';
    }
    
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};
