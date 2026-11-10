import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { benefits, images } from '../data/content.js';
import '../styles/about.css';

export default function About({ onBook }) {
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <div className="about__content" data-reveal>
          <span className="eyebrow">چرا فیت‌پاوند</span>
          <h2 className="section-title">
            بیشتر از
            <br />
            <em>یک باشگاه</em>
          </h2>

          <p className="about__text">
            ما تیمی از مربیان، متخصصان تغذیه و کارشناسان سلامت هستیم که به نتیجهٔ
            پایدار باور داریم. نه سالن شلوغ، نه حدس و گمان — فقط یک استودیوی
            خصوصی، یک برنامهٔ مکتوب و آدم‌هایی که نام تو را می‌شناسند.
          </p>

          <ul className="about__list">
            {benefits.map((benefit) => (
              <li key={benefit}>
                <span className="about__check">
                  <Check size={13} strokeWidth={3} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className={`about__story ${storyOpen ? 'is-open' : ''}`}>
            <p>
              فیت‌پاوند در سال ۲۰۱۹ با یک مربی، یک ورزشکار و یک باور ساده شروع شد:
              بیشتر آدم‌ها به انگیزهٔ بیشتر نیاز ندارند، به برنامهٔ بهتر نیاز دارند.
              امروز تیم دوازده‌نفرهٔ ما از مربیان، فیزیوتراپیست‌ها و متخصصان تغذیه
              در یک استودیوی خصوصی در ریور ولی کار می‌کند و هر ورزشکار همان چیزی را
              می‌گیرد که از روز اول می‌گرفتیم — برنامه‌ای که برای او نوشته شده، هر
              ماه بازبینی می‌شود و مربی‌ای که پیام‌هایش را پاسخ می‌دهد.
            </p>
            <p>
              استودیو را عمداً آرام نگه می‌داریم و تعداد نفرات هر ساعت را محدود
              می‌کنیم تا هیچ‌وقت پشت دستگاه منتظر نمانی و هرگز حس نکنی یک شماره‌ای.
            </p>
          </div>

          <div className="about__actions">
            <button
              className="btn btn--ghost"
              type="button"
              onClick={() => setStoryOpen((value) => !value)}
              aria-expanded={storyOpen}
            >
              {storyOpen ? 'بستن داستان ما' : 'داستان ما'}
              <ArrowLeft
                size={15}
                strokeWidth={2}
                style={{ transform: storyOpen ? 'rotate(90deg)' : 'none' }}
              />
            </button>
            <button className="link-arrow" type="button" onClick={() => onBook()}>
              آشنایی با مربیان
              <ArrowLeft size={15} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="about__visual" data-reveal>
          <div className="about__frame" aria-hidden="true" />
          <div className="about__image">
            <img
              src={images.studio}
              alt={images.studioAlt}
              loading="lazy"
            />
            <span className="about__image-veil" />
          </div>

          <div className="about__badge">
            <span className="about__badge-value">۱:۱</span>
            <span className="about__badge-label">
              مربی به ورزشکار
              <br />
              در هر جلسه
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
