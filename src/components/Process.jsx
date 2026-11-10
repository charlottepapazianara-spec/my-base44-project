import { ArrowLeft } from 'lucide-react';
import { processSteps } from '../data/content.js';
import '../styles/process.css';

export default function Process({ onBook }) {
  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="section-head section-head--center" data-reveal>
          <span className="eyebrow eyebrow--center">مسیر ما</span>
          <h2 className="section-title">
            فرایند <em>سادهٔ ما</em>
          </h2>
          <p className="lede">
            چهار قدم از اولین گفت‌وگو تا قوی‌ترین نسخهٔ خودت. بیشتر ورزشکاران یک
            هفته پس از مشاوره، تمرین را شروع می‌کنند.
          </p>
        </div>

        <ol className="process__grid">
          {processSteps.map((item, index) => (
            <li
              key={item.step}
              className="process__step"
              data-reveal
              style={{ '--reveal-delay': `${index * 110}ms` }}
            >
              <div className="process__marker">
                <span className="process__number">{item.step}</span>
                {index < processSteps.length - 1 && (
                  <span className="process__arrow" aria-hidden="true">
                    <span className="process__line" />
                    <ArrowLeft size={15} strokeWidth={1.9} />
                  </span>
                )}
              </div>
              <h3 className="process__title">{item.title}</h3>
              <p className="process__text">{item.text}</p>
            </li>
          ))}
        </ol>

        <div className="process__footer" data-reveal>
          <p>
            مطمئن نیستی کدام مسیر مناسب توست؟ در مشاوره با هم تصمیم می‌گیریم — بدون
            فشار و بدون تعهد.
          </p>
          <button className="btn" type="button" onClick={() => onBook()}>
            شروع با یک مشاوره
            <ArrowLeft size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
