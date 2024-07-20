import React from 'react';

const FormattedPrice = ({ price }) => {
  const formattedPrice = new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 0,
  }).format(price);

  return <>{formattedPrice}</>;
};

export default FormattedPrice;
