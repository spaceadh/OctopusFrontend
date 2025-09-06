import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const borrowers = [
  { id: "1", name: "Borrower A", email: "borrower.a@example.com", phone: "111-222-3333" },
  { id: "2", name: "Borrower B", email: "borrower.b@example.com", phone: "222-333-4444" },
  { id: "3", name: "Borrower C", email: "borrower.c@example.com", phone: "333-444-5555" },
  { id: "4", name: "Borrower D", email: "borrower.d@example.com", phone: "444-555-6666" },
  { id: "5", name: "Borrower E", email: "borrower.e@example.com", phone: "555-666-7777" },
];

export const BorrowersListPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Borrowers</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Borrower</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Borrower</DialogTitle>
              <DialogDescription>
                Fill in the form below to create a new borrower.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" className="col-span-3" />
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
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrowers.map((borrower) => (
            <TableRow key={borrower.id}>
              <TableCell>{borrower.name}</TableCell>
              <TableCell>{borrower.email}</TableCell>
              <TableCell>{borrower.phone}</TableCell>
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

export default BorrowersListPage;
