import { ArrowLeft } from 'lucide-react';
import { contact, images } from '../data/content.js';
import '../styles/cta.css';

export default function CtaBand({ onBook }) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__bg">
        <img src={images.cta} alt="" aria-hidden="true" loading="lazy" />
        <span className="cta__veil" />
      </div>

      <div className="container cta__inner">
        <div className="cta__content" data-reveal>
          <span className="eyebrow eyebrow--center">فصل بعدی تو</span>
          <h2 className="cta__title" id="cta-title">
            آماده‌ای <em>زندگیت را تغییر دهی؟</em>
          </h2>
          <p className="cta__text">
            اولین قدم را به سوی نسخهٔ قوی‌تر و سالم‌تر خودت بردار. یک مشاورهٔ رایگان
            ۴۵ دقیقه‌ای رزرو کن و با یک برنامه از آن بیرون بیا — چه با ما تمرین کنی،
            چه نه.
          </p>
          <div className="cta__actions">
            <button className="btn" type="button" onClick={() => onBook()}>
              مشاورهٔ رایگانت را رزرو کن
              <ArrowLeft size={16} strokeWidth={2.2} />
            </button>
            <a className="cta__phone" href={contact.phoneHref}>
              یا تماس با {contact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
