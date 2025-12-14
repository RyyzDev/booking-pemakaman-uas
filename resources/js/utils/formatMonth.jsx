 export const formatMonth = (monthKey) => {
        const [year, month] = monthKey.split('-');
        const date = new Date(year, parseInt(month) - 1);
        return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short' });
    };