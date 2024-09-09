"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Menu, X, CheckCircle2, ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">AIssist</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button
            variant="ghost"
            className="hidden md:flex"
            onClick={() => scrollToSection("features")}
          >
            Features
          </Button>
          <Button
            variant="ghost"
            className="hidden md:flex"
            onClick={() => scrollToSection("pricing")}
          >
            Pricing
          </Button>
          <Button
            variant="ghost"
            className="hidden md:flex"
            onClick={() => scrollToSection("about")}
          >
            About
          </Button>
          <Button
            variant="ghost"
            className="hidden md:flex"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </Button>
          <Link
            className="hidden md:flex items-center justify-center"
            href="auth/signup"
          >
            <Button variant="ghost"> Sign Up</Button>
          </Link>
          <Link
            className="hidden md:flex items-center justify-center"
            href="auth/login"
          >
            <Button> Sign In</Button>
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Revolutionize Your Productivity with AIssist
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Experience the future of task management with our AI-powered
                  to-do app. Streamline your workflow and boost your
                  productivity to new heights.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="auth/signup">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="#">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  Intelligent task recommendations based on your habits and
                  patterns.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Smart Organization</CardTitle>
                </CardHeader>
                <CardContent>
                  Automatically categorize and prioritize your tasks for maximum
                  efficiency.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Secure Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  Robust security measures to keep your tasks and data safe.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How It Works
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 items-start">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Add Your Tasks</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Easily input your to-do items into the app.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our AI analyzes your tasks and habits.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Optimize & Execute</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive optimized task lists and boost your productivity.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              What Our Users Say
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardContent className="pt-4">
                  <p className="mb-4">
                    "AIssist has completely transformed how I manage my tasks.
                    The AI suggestions are spot-on!"
                  </p>
                  <p className="font-semibold">- Sarah K., Entrepreneur</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="mb-4">
                    "I love how the app learns my habits and helps me
                    prioritize. It's like having a personal assistant."
                  </p>
                  <p className="font-semibold">- Mike T., Project Manager</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="mb-4">
                    "The smart organization feature has saved me hours of time.
                    AIssist is a game-changer!"
                  </p>
                  <p className="font-semibold">- Emily R., Student</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Pricing Plans
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 grid-rows-[auto_1fr]">
              <Card className="grid grid-rows-subgrid row-span-2">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-rows-[auto_1fr_auto]">
                  <p className="text-4xl font-bold mb-2">$9.99/mo</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      AI-powered task suggestions
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Basic task organization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Up to 100 tasks per month
                    </li>
                  </ul>
                  <Button className="w-full mt-4">Choose Plan</Button>
                </CardContent>
              </Card>
              <Card className="grid grid-rows-subgrid row-span-2">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-rows-[auto_1fr_auto]">
                  <p className="text-4xl font-bold mb-2">$19.99/mo</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Advanced AI suggestions
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Smart task categorization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Unlimited tasks
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Priority support
                    </li>
                  </ul>
                  <Button className="w-full mt-4">Choose Plan</Button>
                </CardContent>
              </Card>
              <Card className="grid grid-rows-subgrid row-span-2">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-rows-[auto_1fr_auto]">
                  <p className="text-4xl font-bold mb-2">Custom</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      All Pro features
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Custom AI model training
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Advanced analytics
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Dedicated account manager
                    </li>
                  </ul>
                  <Button className="w-full mt-4">Contact Sales</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Boost Your Productivity?
                </h2>
                <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl">
                  Join thousands of satisfied users and experience the power of
                  AI-assisted task management.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-primary-foreground text-primary"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    className="bg-primary-foreground text-primary"
                    type="submit"
                  >
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-primary-foreground/90">
                  By signing up, you agree to our{" "}
                  <Link href="#">Terms of Service</Link> and{" "}
                  <Link href="#">Privacy Policy</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} AIssist Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
      {showScrollToTop && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
