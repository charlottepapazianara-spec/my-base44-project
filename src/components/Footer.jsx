import { ArrowLeft, ArrowUp, Clock, Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo.jsx';
import { contact, footerColumns } from '../data/content.js';
import '../styles/footer.css';

const faYear = (year) => String(year).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

export default function Footer({ onBook }) {
  const year = faYear(new Date().getFullYear());

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#home" aria-label="خانهٔ فیت‌پاوند">
              <Logo />
            </a>
            <p>
              استودیوی خصوصی تمرین شخصی در سنگاپور. مربیگری، تغذیه، فیزیوتراپی و
              پایش زیر یک سقف — هر بار برای یک نفر.
            </p>
            <button className="btn btn--sm footer__cta" type="button" onClick={() => onBook()}>
              رزرو مشاورهٔ رایگان
              <ArrowLeft size={14} strokeWidth={2} />
            </button>
          </div>

          {footerColumns.map((column) => (
            <nav className="footer__col" key={column.title} aria-label={column.title}>
              <h3 className="footer__title">{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer__col footer__contact">
            <h3 className="footer__title">در تماس باش</h3>
            <ul>
              <li>
                <a href={contact.phoneHref}>
                  <Phone size={14} strokeWidth={1.7} />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>
                  <Mail size={14} strokeWidth={1.7} />
                  {contact.email}
                </a>
              </li>
              <li>
                <span className="footer__static">
                  <MapPin size={14} strokeWidth={1.7} />
                  {contact.address}
                  <br />
                  {contact.addressExtra}
                </span>
              </li>
              <li>
                <span className="footer__static">
                  <Clock size={14} strokeWidth={1.7} />
                  {contact.hours}
                  <br />
                  {contact.hoursExtra}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} فیت‌پاوند. همهٔ حقوق محفوظ است.</span>
          <span className="footer__built">ساخته‌شده برای آدم‌های قوی‌تر · سنگاپور</span>
          <a className="footer__top" href="#home">
            بازگشت به بالا
            <ArrowUp size={14} strokeWidth={2} />
          </a>
        </div>
      </div>
    </footer>
  );
}
