import Link from "next/link";
import { CheckCircle2, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserProfile from "@/components/user-profile/UserProfile";
import SearchForm from "@/components/nav/SearchForm";
import { primaryItems } from "@/utils";

const MobileNav = ({
  navTitle = "",
  navLink = "#",
}: {
  navTitle?: string;
  navLink?: string;
}) => {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <UserProfile />
              {primaryItems.map((item) => (
                <Link
                  href={item.href}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
                  key={item._id}
                >
                  <item.navicon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center md:justify-between w-full gap-1 md:gap-2 py-2">
          <div className="lg:flex-1">
            <Link href={navLink}>
              <p className="text-sm font-semibold text-foreground/70 w-24">
                {navTitle}
              </p>
            </Link>
          </div>
          <div className="w-full flex-1">
            <SearchForm />
          </div>
          <span className="flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            <span className="ml-2 text-2xl font-bold">AIssist</span>
          </span>
        </div>
      </header>
    </div>
  );
};

export default MobileNav;
