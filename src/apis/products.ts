// Mock data for products
const allProducts = [
  { id: 'prop', name: 'Property Management', description: 'Manage properties, tenants, and leases.', subscribed: true },
  { id: 'lend', name: 'Lending Engine', description: 'Manage loans, borrowers, and repayments.', subscribed: true },
  { id: 'sacco', name: 'Sacco Management', description: 'Manage sacco members, contributions, and loans.', subscribed: false },
  { id: 'chama', name: 'Chama Management', description: 'Manage chama groups, savings, and payouts.', subscribed: false },
  { id: 'crm', name: 'CRM', description: 'Manage customer relationships, sales, and marketing.', subscribed: false },
];

// Mock API function to get all products
export const getProducts = async () => {
  // Simulate an API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return allProducts;
};
