import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/apis/products';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { List, Grid } from 'lucide-react';
import toast from 'react-hot-toast';

type Product = {
  id: string;
  name: string;
  description: string;
  subscribed: boolean;
};

const CheckInPage = () => {
  const [viewMode, setViewMode] = useState(localStorage.getItem('viewMode') || 'grid');

  const { data: products, isLoading, error } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching products: {error.message}</div>;
  }

  const subscribedProducts = products?.filter(p => p.subscribed) || [];
  const availableProducts = products?.filter(p => !p.subscribed) || [];

  const handleSubscribe = (productName: string) => {
    toast.success(`Subscribed to ${productName}!`);
    // Here you would typically call a mutation to update the subscription status
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Check-In</h1>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Your Subscribed Products</CardTitle>
              <CardDescription>Products you are currently subscribed to.</CardDescription>
            </div>
            <Tabs value={viewMode} onValueChange={setViewMode}>
              <TabsList>
                <TabsTrigger value="grid"><Grid className="h-4 w-4" /></TabsTrigger>
                <TabsTrigger value="list"><List className="h-4 w-4" /></TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={viewMode}>
            <TabsContent value="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subscribedProducts.map(product => (
                <Card key={product.id}>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{product.description}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="list" className="space-y-4">
              {subscribedProducts.map(product => (
                <Card key={product.id}>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Discover Other Products</h2>
        <Accordion type="single" collapsible className="w-full">
          {availableProducts.map(product => (
            <AccordionItem value={product.id} key={product.id}>
              <AccordionTrigger>{product.name}</AccordionTrigger>
              <AccordionContent>
                <div className="flex justify-between items-center">
                  <p>{product.description}</p>
                  <Button onClick={() => handleSubscribe(product.name)}>Subscribe</Button>
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
