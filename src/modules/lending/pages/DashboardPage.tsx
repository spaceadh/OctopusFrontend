import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "January", loans: 20 },
  { month: "February", loans: 25 },
  { month: "March", loans: 35 },
  { month: "April", loans: 45 },
  { month: "May", loans: 55 },
  { month: "June", loans: 70 },
];

const borrowers = [
  { id: "1", name: "Borrower A", amount: "$10,000", status: "Approved" },
  { id: "2", name: "Borrower B", amount: "$25,000", status: "Pending" },
  { id: "3", name: "Borrower C", amount: "$5,000", status: "Approved" },
  { id: "4", name: "Borrower D", amount: "$12,000", status: "Rejected" },
  { id: "5", name: "Borrower E", amount: "$30,000", status: "Pending" },
];

export const LendingDashboardPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Lending Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Loans Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="loans" stroke="#8884d8" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Borrowers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Borrower</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrowers.map((borrower) => (
                <TableRow key={borrower.id}>
                  <TableCell>{borrower.name}</TableCell>
                  <TableCell>{borrower.amount}</TableCell>
                  <TableCell>{borrower.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LendingDashboardPage;
