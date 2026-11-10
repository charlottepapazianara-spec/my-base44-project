import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonials } from '../data/content.js';
import '../styles/testimonials.css';

const getPerView = (width) => {
  if (width <= 640) return 1;
  if (width <= 1024) return 2;
  return 3;
};

export default function Testimonials() {
  const trackRef = useRef(null);
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onResize = () => setPerView(getPerView(window.innerWidth));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - perView);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    const step = card ? card.getBoundingClientRect().width + gap : 0;
    // RTL: a positive translate reveals the next card, which sits to the left.
    setOffset(index * step);
  }, [index, perView]);

  const goTo = (next) => setIndex(Math.min(Math.max(next, 0), maxIndex));

  const atStart = index <= 0;
  const atEnd = index >= maxIndex;
  const dots = maxIndex + 1;

  return (
    <section className="section stories" id="stories">
      <div className="container">
        <div className="stories__head" data-reveal>
          <div className="section-head">
            <span className="eyebrow">داستان موفقیت</span>
            <h2 className="section-title">
              آدم‌های واقعی. <em>نتیجه‌های واقعی.</em>
            </h2>
          </div>

          <div className="stories__nav">
            <button
              type="button"
              className="stories__arrow"
              onClick={() => goTo(index - 1)}
              disabled={atStart}
              aria-label="داستان قبلی"
            >
              <ChevronRight size={20} strokeWidth={1.7} />
            </button>
            <button
              type="button"
              className="stories__arrow"
              onClick={() => goTo(index + 1)}
              disabled={atEnd}
              aria-label="داستان بعدی"
            >
              <ChevronLeft size={20} strokeWidth={1.7} />
            </button>
          </div>
        </div>

        <div className="stories__viewport">
          <div
            className="stories__track"
            ref={trackRef}
            style={{
              '--per-view': perView,
              transform: `translateX(${offset}px)`,
            }}
            role="region"
            aria-label="داستان‌های موفقیت مشتریان"
          >
            {testimonials.map((item) => (
              <figure className="story" key={item.name}>
                <span className="story__quote-mark" aria-hidden="true">
                  <Quote size={30} strokeWidth={1.3} />
                </span>

                <div className="story__stars" aria-label="امتیاز ۵ از ۵">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} strokeWidth={0} fill="currentColor" />
                  ))}
                </div>

                <blockquote>{item.quote}</blockquote>

                <figcaption className="story__person">
                  <img src={item.image} alt={`پرترهٔ ${item.name}`} loading="lazy" />
                  <div className="story__identity">
                    <span className="story__name">{item.name}</span>
                    <span className="story__role">{item.role}</span>
                  </div>
                  <span className="story__result">{item.result}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="stories__dots" role="tablist" aria-label="صفحه‌های داستان">
          {Array.from({ length: dots }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`رفتن به داستان ${i + 1}`}
              className={`stories__dot ${i === index ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
