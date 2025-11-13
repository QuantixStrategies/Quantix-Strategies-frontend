import quantixLogo from "@/assets/quantix-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <img src={quantixLogo} alt="Quantix Strategies" className="h-10 mb-4 brightness-0 invert" />
            <p className="text-sm text-primary-foreground/80">
              Strategic management consulting powered by data-driven insights
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#clients" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Who We Serve
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-sm text-primary-foreground/80">Business Strategy</li>
              <li className="text-sm text-primary-foreground/80">Transaction Advisory</li>
              <li className="text-sm text-primary-foreground/80">Portfolio Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-primary-foreground/80">info@quantixstrategies.com</li>
              <li className="text-sm text-primary-foreground/80">+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-sm text-primary-foreground/60 text-center">
            © {new Date().getFullYear()} Quantix Strategies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
