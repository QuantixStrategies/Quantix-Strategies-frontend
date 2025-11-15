import quantixLogo from "@/assets/quantix-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <img src={quantixLogo} alt="Quantix Strategies" className="h-12 mb-4 brightness-[10] dark:brightness-0 dark:invert" />
            <p className="text-sm text-primary-foreground">
              Offshore consulting for family offices and institutional investors worldwide
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-primary-foreground hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-primary-foreground hover:text-accent transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/assessment" className="text-sm text-primary-foreground hover:text-accent transition-colors">
                  Assessment
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-sm text-primary-foreground">Business Strategy</li>
              <li className="text-sm text-primary-foreground">Transaction Advisory</li>
              <li className="text-sm text-primary-foreground">Portfolio Management</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-primary-foreground">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-primary-foreground">info@quantixstrategies.com</li>
              <li className="text-sm text-primary-foreground">Confidential inquiries welcome</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-sm text-primary-foreground text-center">
            © {new Date().getFullYear()} Quantix Strategies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
