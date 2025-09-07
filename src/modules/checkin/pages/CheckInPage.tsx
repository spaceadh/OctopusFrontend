import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/modules/auth/apis/products';
import toast from 'react-hot-toast';
import { useTheme, ModuleTheme, Theme } from '@/context/theme-provider';

type Product = {
  id: string;
  name: string;
  description: string;
  subscribed: boolean;
  redirect?: string;
};

const CheckInPage = () => {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const { data: products, isLoading, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <div className="loading loading-spinner text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <div className="text-error text-center">Error fetching products: {error.message}</div>
      </div>
    );
  }

  const subscribedProducts = products?.filter((p) => p.subscribed) || [];
  const availableProducts = products?.filter((p) => !p.subscribed) || [];

  const handleSubscribe = (productName: string) => {
    toast.success(`Subscribed to ${productName}!`);
    // Here you would typically call a mutation to update the subscription status
  };

  const themeMap: { [key: string]: Theme } = {
    // auth: 'module-auth' as Theme,
    lending: 'module-lending' as Theme,
    properties: 'module-properties' as Theme,
    sacco: 'module-sacco' as Theme,
    chama: 'module-chama' as Theme,
  };

  const handleProductSwitch = (product: Product) => {
    if (product.redirect) {
      toast.loading(`Loading ${(product.name).toUpperCase()} product...`, { duration: 1000 });
      setTheme(themeMap[product.id] || ('system' as Theme));
      console.log('theme set to', themeMap[product.id] || ('system' as Theme));
      console.log('navigating to', product.redirect);
      navigate(product.redirect);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content mb-4 sm:mb-6 font-playfair">Check-In</h1>

        <div className="card bg-base-200 rounded-2xl shadow-sm border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-xl sm:text-2xl text-base-content">Your Subscribed Products</h2>
            <p className="text-base-content/70 mb-4">Products you are currently subscribed to.</p>
            <div className="space-y-4">
              {subscribedProducts.map((product) => (
                <div
                  key={product.id}
                  className="card bg-base-100 rounded-xl border border-base-300 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => product.redirect && handleProductSwitch(product)}
                >
                  <div className="card-body">
                    <h3 className="text-lg sm:text-xl font-medium text-base-content">{product.name}</h3>
                    <p className="text-sm sm:text-base text-base-content/70">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-base-content mb-4 font-playfair">Discover Other Products</h2>
          <div className="space-y-2">
            {availableProducts.map((product) => (
              <div key={product.id} className="collapse collapse-arrow bg-base-200 rounded-xl border border-base-300">
                <input
                  type="checkbox"
                  checked={openAccordion === product.id}
                  onChange={() => setOpenAccordion(openAccordion === product.id ? null : product.id)}
                  className="peer"
                />
                <div className="collapse-title text-sm sm:text-base font-medium text-base-content">{product.name}</div>
                <div className="collapse-content">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <p className="text-sm sm:text-base text-base-content/70">{product.description}</p>
                    <button
                      className="btn h-12 btn-primary rounded-xl font-medium transition-all duration-200 w-full sm:w-auto"
                      onClick={() => handleSubscribe(product.name)}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInPage;