"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">AIssist</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button
            variant="ghost"
            className="hidden hover:text-primary hover:bg-transparent md:flex"
            onClick={() => scrollToSection("features")}
          >
            Features
          </Button>
          <Button
            variant="ghost"
            className="hidden hover:text-primary hover:bg-transparent md:flex"
            onClick={() => scrollToSection("pricing")}
          >
            Pricing
          </Button>
          <Button
            variant="ghost"
            className="hidden hover:text-primary hover:bg-transparent md:flex"
            onClick={() => scrollToSection("about")}
          >
            About
          </Button>
          <Button
            variant="ghost"
            className="hidden hover:text-primary hover:bg-transparent md:flex"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </Button>
          <Link
            className="hidden md:flex items-center justify-center"
            href="auth/signup"
          >
            <Button
              variant="ghost"
              className="hover:text-primary hover:bg-transparent"
            >
              Sign Up
            </Button>
          </Link>
          <Link
            className="hidden md:flex items-center justify-center"
            href="auth/login"
          >
            <Button className="hover:bg-primary/70"> Sign In</Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </nav>
      </header>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center gap-4 p-4 bg-background shadow-lg">
            <Button variant="ghost" onClick={() => scrollToSection("features")}>
              Features
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("pricing")}>
              Pricing
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("about")}>
              About
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("contact")}>
              Contact
            </Button>
            <Link
              className="flex items-center justify-center"
              href="auth/signup"
            >
              <Button
                variant="ghost"
                className="bg-secondary text-secondary-foreground"
              >
                Sign Up
              </Button>
            </Link>
            <Link
              className="flex items-center justify-center"
              href="auth/login"
            >
              <Button> Sign In</Button>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
