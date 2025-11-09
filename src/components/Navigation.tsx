import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Who We Serve", href: "#clients" },
    { label: "Knowledge", href: "#knowledge" },
    { label: "Careers", href: "#careers" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary-foreground transform rotate-45"></div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg text-foreground">PREFERRED</span>
              <span className="font-bold text-lg text-foreground">SQUARE</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button variant="default" className="bg-accent hover:bg-accent/90">
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-secondary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button variant="default" className="bg-accent hover:bg-accent/90 w-full">
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
