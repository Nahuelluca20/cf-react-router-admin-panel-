import { Home, LineChart, Menu, Package, Package2, Users } from "lucide-react";
import { Button } from "../ui/button";

import { SheetTrigger, SheetContent, Sheet } from "../ui/sheet";
import { Link, useLocation } from "react-router";
import clsx from "clsx";
import { firstLetterUpperCase } from "utils/strings-utils";

export default function MobileMenu() {
  const routesLinks = [
    {
      route: "home",
      icon: <Home className="h-4 w-4" />,
    },
    {
      route: "products",
      icon: <Package className="h-4 w-4" />,
    },
    {
      route: "customers",
      icon: <Users className="h-4 w-4" />,
    },
    {
      route: "inventory",
      icon: <LineChart className="h-4 w-4" />,
    },
  ];

  const location = useLocation();

  const isRouteActive = (route: string) => {
    return location.pathname.includes(route);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Admin Panel</span>
          </Link>
          {routesLinks.map((route) => (
            <Link
              to={route.route}
              className={clsx(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                { "bg-muted text-foreground": isRouteActive(route.route) }
              )}
            >
              {route.icon}
              {firstLetterUpperCase(route.route)}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
