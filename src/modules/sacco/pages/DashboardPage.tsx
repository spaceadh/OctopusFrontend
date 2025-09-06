import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "January", members: 50 },
  { month: "February", members: 60 },
  { month: "March", members: 75 },
  { month: "April", members: 90 },
  { month: "May", members: 110 },
  { month: "June", members: 130 },
];

const loans = [
  { id: "1", member: "John Doe", amount: "$5,000", status: "Approved" },
  { id: "2", member: "Jane Smith", amount: "$10,000", status: "Pending" },
  { id: "3", member: "Peter Jones", amount: "$2,500", status: "Approved" },
  { id: "4", member: "Mary Williams", amount: "$7,000", status: "Rejected" },
  { id: "5", member: "David Brown", amount: "$15,000", status: "Pending" },
];

export const SaccoDashboardPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Sacco Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Members Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="members" stroke="#8884d8" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Loans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>{loan.member}</TableCell>
                  <TableCell>{loan.amount}</TableCell>
                  <TableCell>{loan.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SaccoDashboardPage;
