/**
 * MobileMenu React Component (Island)
 * Full-screen mobile menu with animated open/close and services submenu
 * Uses Motion (Framer Motion) for animations
 */
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface ServiceItem {
  key: string;
  href: string;
  label: string;
}

interface NavItem {
  key: string;
  href: string;
  label: string;
  hasSubmenu?: boolean;
  submenuItems?: ServiceItem[];
}

interface MobileMenuProps {
  locale: 'de' | 'en';
  navItems: NavItem[];
  translations: {
    openMenu: string;
    closeMenu: string;
    mainNavigation: string;
    servicesSubmenu: string;
    requestQuote: string;
    language: string;
  };
  currentPath: string;
  languages: Array<{ code: string; label: string; href: string }>;
  ctaHref: string;
}

export default function MobileMenu({
  locale,
  navItems,
  translations,
  currentPath,
  languages,
  ctaHref,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  const toggleSubmenu = (key: string) => {
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return currentPath === href || currentPath === `/${locale}` || currentPath === `/${locale}/`;
    }
    return currentPath.startsWith(href);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white lg:hidden"
        aria-label={isOpen ? translations.closeMenu : translations.openMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-react"
      >
        <motion.svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </motion.svg>
      </button>

      {/* Menu Portal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Drawer */}
            <motion.nav
              ref={menuRef}
              id="mobile-menu-react"
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-xl dark:bg-slate-950 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              aria-label={translations.mainNavigation}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
                <span className="text-lg font-semibold text-slate-900 dark:text-white">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  aria-label={translations.closeMenu}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.hasSubmenu && item.submenuItems ? (
                        <>
                          <button
                            type="button"
                            onClick={() => toggleSubmenu(item.key)}
                            className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                              isActive(item.href)
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                            }`}
                            aria-expanded={openSubmenu === item.key}
                            aria-controls={`submenu-${item.key}`}
                          >
                            <span>{item.label}</span>
                            <motion.svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              animate={{ rotate: openSubmenu === item.key ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </motion.svg>
                          </button>

                          <AnimatePresence>
                            {openSubmenu === item.key && (
                              <motion.ul
                                id={`submenu-${item.key}`}
                                className="mt-2 space-y-1 pl-4"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                role="menu"
                                aria-label={translations.servicesSubmenu}
                              >
                                {item.submenuItems.map((subItem) => (
                                  <li key={subItem.key} role="none">
                                    <a
                                      href={subItem.href}
                                      className={`block rounded-lg px-4 py-2.5 text-sm transition-colors ${
                                        currentPath === subItem.href
                                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                                      }`}
                                      role="menuitem"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {subItem.label}
                                    </a>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <a
                          href={item.href}
                          className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                            isActive(item.href)
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                          }`}
                          aria-current={isActive(item.href) ? 'page' : undefined}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-200 p-4 dark:border-slate-800">
                {/* Language Switcher */}
                <nav
                  className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-slate-100 p-1 dark:bg-slate-800"
                  aria-label={translations.language}
                >
                  {languages.map((lang) => (
                    <a
                      key={lang.code}
                      href={lang.href}
                      hrefLang={lang.code}
                      lang={lang.code}
                      className={`flex-1 rounded-md px-4 py-2 text-center text-sm font-medium transition-all duration-200 ${
                        lang.code === locale
                          ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                          : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                      aria-current={lang.code === locale ? 'page' : undefined}
                      onClick={() => setIsOpen(false)}
                    >
                      {lang.label}
                    </a>
                  ))}
                </nav>

                {/* CTA Button */}
                <a
                  href={ctaHref}
                  className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800"
                  onClick={() => setIsOpen(false)}
                >
                  {translations.requestQuote}
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
