export const formatPrice = cents => {
    return (cents / 500).toLocaleString('zh', {
      style: 'currency',
      currency: 'CAD'
    });
};