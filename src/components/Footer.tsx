import quantixLogo from "@/assets/quantix-logo.png";
import quantixLogo2x from "@/assets/quantix-logo@2x.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card text-muted-foreground py-12 border-t border-[rgba(56,111,164,0.3)]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="mb-4 inline-flex transition-opacity hover:opacity-90">
              <img
                src={quantixLogo}
                srcSet={`${quantixLogo} 1x, ${quantixLogo2x} 2x`}
                width={272}
                height={105}
                alt="Quantix Strategies"
                decoding="async"
                className="h-12 w-[124px] object-contain object-left sm:h-[52px] sm:w-[135px]"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Offshore consulting for family offices and institutional investors worldwide
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 ease-out"
                >
                  About Us
                </a>
              </li>
              <li>
                <Link
                  to={{ pathname: "/", hash: "#services" }}
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 ease-out"
                >
                  Services
                </Link>
              </li>
              <li>
                <a
                  href="/assessment"
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 ease-out"
                >
                  Assessment
                </a>
              </li>
              <li>
                <a
                  href="/knowledge"
                  className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 ease-out"
                >
                  Knowledge
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Business Strategy</li>
              <li className="text-sm text-muted-foreground">Transaction Advisory</li>
              <li className="text-sm text-muted-foreground">Portfolio Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">info@quantixstrategies.com</li>
              <li className="text-sm text-muted-foreground">Confidential inquiries welcome</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(56,111,164,0.3)] pt-8">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Quantix Strategies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
