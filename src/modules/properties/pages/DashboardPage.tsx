import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "January", properties: 10 },
  { month: "February", properties: 15 },
  { month: "March", properties: 20 },
  { month: "April", properties: 25 },
  { month: "May", properties: 30 },
  { month: "June", properties: 35 },
];

const properties = [
  { id: "1", name: "Modern Apartment", location: "New York", price: "$2,500/month" },
  { id: "2", name: "Cozy Cottage", location: "San Francisco", price: "$3,000/month" },
  { id: "3", name: "Luxury Villa", location: "Los Angeles", price: "$5,000/month" },
  { id: "4", name: "Suburban House", location: "Chicago", price: "$2,000/month" },
  { id: "5", name: "Downtown Loft", location: "Miami", price: "$2,800/month" },
];

export const PropertiesDashboardPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Properties Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Properties Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="properties" stroke="#8884d8" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.name}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertiesDashboardPage;
