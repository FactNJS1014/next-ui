"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiMenu, mdiClose } from "@mdi/js";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/service", label: "Services" },
  { href: "/test", label: "Test" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="header-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="logo">L</div>
            <span className="text-xl font-bold text-foreground">Logo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${
                    isActive ? "menu-active" : "mennu-default"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-1 bottom-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <Icon path={mdiClose} size={1} className="cursor-pointer" />
            ) : (
              <Icon path={mdiMenu} size={1} className="cursor-pointer" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden inset-shadow-2xs">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      isActive
                        ? "text-black bg-primary-300"
                        : "text-muted-foreground hover:text-black hover:bg-primary-50"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
