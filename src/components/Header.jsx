import { useEffect, useState } from 'react';
import { ArrowLeft, Menu, Phone, X } from 'lucide-react';
import Logo from './Logo.jsx';
import { contact, navLinks } from '../data/content.js';
import '../styles/logo.css';
import '../styles/header.css';

export default function Header({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((link) => link.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    return () => document.body.classList.remove('is-locked');
  }, [open]);

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (event, href) => {
    event.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', href);
    setActive(href);
  };

  const book = () => {
    setOpen(false);
    onBook();
  };

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header__bar container">
        <a className="header__brand" href="#home" onClick={(e) => go(e, '#home')} aria-label="خانهٔ فیت‌پاوند">
          <Logo />
        </a>

        <nav className="header__nav" aria-label="ناوبری اصلی">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`header__link ${active === link.href ? 'is-active' : ''}`}
              onClick={(e) => go(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={contact.phoneHref}>
            <Phone size={15} strokeWidth={1.7} />
            {contact.phone}
          </a>
          <button className="btn btn--sm header__cta" onClick={book} type="button">
            رزرو جلسه
            <ArrowLeft size={15} strokeWidth={2} />
          </button>
          <button
            className="header__toggle"
            type="button"
            aria-label={open ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className="drawer" hidden={!open}>
        <nav className="drawer__nav" aria-label="منوی موبایل">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="drawer__link"
              style={{ transitionDelay: `${i * 40}ms` }}
              onClick={(e) => go(e, link.href)}
            >
              <span className="drawer__index">۰{i + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="drawer__footer">
          <button className="btn btn--block" type="button" onClick={book}>
            رزرو مشاورهٔ رایگان
            <ArrowLeft size={16} strokeWidth={2} />
          </button>
          <a className="drawer__phone" href={contact.phoneHref}>
            <Phone size={15} /> {contact.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
