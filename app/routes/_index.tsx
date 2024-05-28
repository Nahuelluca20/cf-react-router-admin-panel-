import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export default function Index() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-[1024px] w-full mx-auto py-20">
      <title>Admin Panel RR</title>
      <h1 className="text-4xl font-bold text-center">Admin Panel Template</h1>
      <div className="w-full text-center mt-20">
        <Link to={"dashboard"} className="text-xl font-medium text-center">
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
