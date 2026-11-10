import { ArrowLeft } from 'lucide-react';
import Icon from './Icon.jsx';
import { programs } from '../data/content.js';
import '../styles/programs.css';

export default function Programs({ onBook }) {
  return (
    <section className="section programs" id="programs">
      <div className="container">
        <div className="section-head programs__head" data-reveal>
          <span className="eyebrow">برنامه‌های ما</span>
          <h2 className="section-title">
            تمرینی که <em>به هدف تو</em> می‌خورد
          </h2>
          <p className="lede">
            شش مسیر برای تمرین با ما. هر مسیر با همان مشاورهٔ رایگان و همان قول
            شروع می‌شود: برنامه‌ای برای بدن، برنامه و زندگی تو.
          </p>
        </div>

        <div className="programs__grid">
          {programs.map((program, index) => (
            <article
              className="pcard"
              key={program.id}
              data-reveal
              style={{ '--reveal-delay': `${(index % 6) * 70}ms` }}
            >
              <div className="pcard__media">
                <img src={program.image} alt={program.title} loading="lazy" />
                <span className="pcard__media-glow" />
                {program.tag && <span className="pcard__tag">{program.tag}</span>}
              </div>

              <div className="pcard__body">
                <span className="pcard__icon">
                  <Icon name={program.icon} size={18} />
                </span>
                <h3 className="pcard__title">{program.title}</h3>
                <p className="pcard__blurb">{program.blurb}</p>

                <button
                  className="pcard__cta"
                  type="button"
                  onClick={() => onBook(program.title)}
                >
                  رزرو این برنامه
                  <ArrowLeft size={14} strokeWidth={2} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
