import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/apis/products';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import toast from 'react-hot-toast';

type Product = {
  id: string;
  name: string;
  description: string;
  subscribed: boolean;
  redirect?: string;
};

const CheckInPage = () => {
  const navigate = useNavigate();

  const { data: products, isLoading, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // useEffect(() => {
  //   localStorage.setItem('viewMode', viewMode);
  // }, [viewMode]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error fetching products: {error.message}</div>;
  }

  const subscribedProducts = products?.filter(p => p.subscribed) || [];
  const availableProducts = products?.filter(p => !p.subscribed) || [];

  const handleSubscribe = (productName: string) => {
    toast.success(`Subscribed to ${productName}!`);
    // Here you would typically call a mutation to update the subscription status
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Check-In</h1>

      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl sm:text-2xl">Your Subscribed Products</CardTitle>
          <CardDescription>Products you are currently subscribed to.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscribedProducts.map(product => (
              <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => product.redirect && navigate(product.redirect)}>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{product.name}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{product.description}</CardDescription>
              </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Discover Other Products</h2>
        <Accordion type="single" collapsible className="w-full">
          {availableProducts.map(product => (
            <AccordionItem value={product.id} key={product.id}>
              <AccordionTrigger className="text-sm sm:text-base">{product.name}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <p className="text-sm sm:text-base">{product.description}</p>
                  <Button 
                    onClick={() => handleSubscribe(product.name)}
                    className="w-full sm:w-auto"
                  >
                    Subscribe
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default CheckInPage;