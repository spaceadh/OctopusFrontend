import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const loans = [
  { id: "1", borrower: "Borrower A", amount: "$10,000", status: "Approved" },
  { id: "2", borrower: "Borrower B", amount: "$25,000", status: "Pending" },
  { id: "3", borrower: "Borrower C", amount: "$5,000", status: "Approved" },
  { id: "4", borrower: "Borrower D", amount: "$12,000", status: "Rejected" },
  { id: "5", borrower: "Borrower E", amount: "$30,000", status: "Pending" },
];

export const LoansListPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Loans</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Loan</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Loan</DialogTitle>
              <DialogDescription>
                Fill in the form below to create a new loan.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="borrower" className="text-right">
                  Borrower
                </Label>
                <Input id="borrower" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input id="amount" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Borrower</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell>{loan.borrower}</TableCell>
              <TableCell>{loan.amount}</TableCell>
              <TableCell>{loan.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="destructive" size="sm" className="ml-2">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoansListPage;
