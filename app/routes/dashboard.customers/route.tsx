import { json, useLoaderData } from "react-router";
import { Customer } from "types/customers";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export const loader = async () => {
  let customers: { users: Customer[] } = await fetch(
    "https://dummyjson.com/users?select=firstName,lastName,age,email"
  ).then((res) => res.json());
  console.log(customers.users);

  return json({ customers: customers.users, total: customers.users.length });
};

export default function route() {
  let { customers, total } = useLoaderData() as {
    customers: Customer[];
    total: number;
  };
  console.log(customers);
  return (
    <>
      <title>Dashboard | Customers</title>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Customers</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Age</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer: Customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">
                  {customer.firstName}
                </TableCell>
                <TableCell>{customer.lastName}</TableCell>
                <TableCell>{customer.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">{total}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
