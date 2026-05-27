import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import quantixLogo from "@/assets/quantix-logo.png";
import quantixLogo2x from "@/assets/quantix-logo@2x.png";

type NavItem =
  | { label: string; to: string; kind: "route" }
  | { label: string; to: string; hash: string; kind: "hash" }
  | { label: string; href: string; kind: "anchor" };

const navItems: NavItem[] = [
  { label: "About Us", to: "/about", kind: "route" },
  { label: "Services", to: "/", hash: "#services", kind: "hash" },
  { label: "Assessment", to: "/assessment", kind: "route" },
  { label: "Knowledge", to: "/knowledge", kind: "route" },
  { label: "Careers", href: "#careers", kind: "anchor" },
];

function NavLink({
  item,
  className,
  onNavigate,
}: {
  item: NavItem;
  className: string;
  onNavigate?: () => void;
}) {
  if (item.kind === "route") {
    return (
      <Link to={item.to} className={className} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }
  if (item.kind === "hash") {
    return (
      <Link
        to={{ pathname: item.to, hash: item.hash }}
        className={className}
        onClick={onNavigate}
      >
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className} onClick={onNavigate}>
      {item.label}
    </a>
  );
}

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass =
    "text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 ease-out";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-[rgba(56,111,164,0.3)]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/"
            className="flex shrink-0 items-center transition-opacity hover:opacity-90"
            aria-label="Quantix Strategies home"
          >
            <img
              src={quantixLogo}
              srcSet={`${quantixLogo} 1x, ${quantixLogo2x} 2x`}
              width={272}
              height={105}
              alt="Quantix Strategies"
              decoding="async"
              className="h-10 w-[104px] object-contain object-left sm:h-11 sm:w-[114px] lg:h-12 lg:w-[124px]"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink key={item.label} item={item} className={linkClass} />
            ))}
            <Button
              variant="default"
              size="lg"
              className="bg-[var(--color-accent-blue)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent-rose)] transition-all duration-200 ease-out"
            >
              Contact Us
            </Button>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6 text-muted-foreground" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  className={`${linkClass} py-2`}
                  onNavigate={() => setMobileMenuOpen(false)}
                />
              ))}
              <Button
                variant="default"
                size="lg"
                className="w-full bg-[var(--color-accent-blue)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent-rose)] transition-all duration-200 ease-out"
              >
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
