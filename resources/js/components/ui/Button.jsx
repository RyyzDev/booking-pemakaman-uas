import React from 'react';


const Button = ({ children, variant = 'default', className = '', ...props }) => {
  // Kelas CSS dasar untuk tombol
  let baseStyles = 'px-4 py-2 rounded-md font-semibold shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Menentukan gaya berdasarkan varian
  switch (variant) {
    case 'primary':
      baseStyles += ' bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
      break;
    case 'secondary':
      baseStyles += ' bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';
      break;
    case 'danger':
      baseStyles += ' bg-red-500 text-white hover:bg-red-600 focus:ring-red-500';
      break;
    case 'ghost':
        baseStyles += ' bg-transparent text-blue-600 hover:bg-blue-100 shadow-none focus:ring-blue-500';
        break;
    case 'default':
    default:
      baseStyles += ' bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500';
      break;
  }

  // Gabungkan kelas dasar dengan kelas kustom yang diberikan pengguna
  const combinedClassName = `${baseStyles} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export { Button };
