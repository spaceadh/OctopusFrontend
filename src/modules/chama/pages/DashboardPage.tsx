import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "January", contributions: 1000 },
  { month: "February", contributions: 1200 },
  { month: "March", contributions: 1500 },
  { month: "April", contributions: 1800 },
  { month: "May", contributions: 2200 },
  { month: "June", contributions: 2500 },
];

const members = [
  { id: "1", name: "Alice", contribution: "$100" },
  { id: "2", name: "Bob", contribution: "$150" },
  { id: "3", name: "Charlie", contribution: "$120" },
  { id: "4", name: "Diana", contribution: "$200" },
  { id: "5", name: "Eve", contribution: "$180" },
];

export const ChamaDashboardPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Chama Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contributions Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="contributions" stroke="#8884d8" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Member Contributions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Contribution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.contribution}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChamaDashboardPage;
