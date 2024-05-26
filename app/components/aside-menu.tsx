import { Bell, Home, LineChart, Package, Package2, Users } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { firstLetterUpperCase } from "utils/strings-utils";
import clsx from "clsx";

export default function AsideMenu() {
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
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Admin Panel</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {routesLinks.map((route) => (
              <Link
                to={route.route}
                className={clsx(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  { "bg-muted text-primary": isRouteActive(route.route) }
                )}
              >
                {route.icon}
                {firstLetterUpperCase(route.route)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
