import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { number: "01", name: "home", href: "/" },
  { number: "02", name: "expertise", href: "/services" },
  { number: "03", name: "work", href: "/portfolio" },
  { number: "04", name: "experience", href: "/about" },
  { number: "05", name: "contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo - Monospace style with cursor */}
          <Link to="/" className="group flex items-center gap-2">
            <span className="font-mono text-sm text-primary tracking-wide">
              Gnexus
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="text-primary font-mono"
            >
              ._
            </motion.span>
          </Link>

          {/* Desktop Navigation - Numbered monospace links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "group flex items-center gap-2 font-mono text-xs tracking-wide transition-colors duration-300",
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="text-primary/50 text-[10px]">{link.number}</span>
                <span className="flex items-center gap-1">
                  <span className="text-primary/70">//</span>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="font-mono text-xs tracking-wide">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => signOut()}
                  className="font-mono text-xs tracking-wide text-muted-foreground"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth?mode=signup">
                <Button 
                  size="sm" 
                  className="group font-mono text-xs rounded-full px-5 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                >
                  <span>Start Project</span>
                  <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-8 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 font-mono text-lg transition-colors",
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="text-primary/50 text-sm">{link.number}</span>
                <span className="flex items-center gap-2">
                  <span className="text-primary/70">//</span>
                  {link.name}
                </span>
              </Link>
            ))}
            <div className="pt-6 border-t border-border/30 space-y-4">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start font-mono">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start font-mono text-muted-foreground"
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/auth?mode=signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full rounded-full bg-primary text-primary-foreground">
                    Start Project
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
