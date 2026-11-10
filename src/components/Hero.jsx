import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Icon from './Icon.jsx';
import { heroFeatures, images, stats } from '../data/content.js';
import '../styles/hero.css';

function RotatingBadge() {
  return (
    <div className="hero__badge" aria-hidden="true">
      <svg viewBox="0 0 160 160" className="hero__badge-ring">
        <defs>
          <path
            id="badge-circle"
            d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0"
          />
        </defs>
        <text className="hero__badge-text">
          <textPath href="#badge-circle" startOffset="0%">
            TAKE THE FIRST STEP TOWARDS A STRONGER YOU •
          </textPath>
        </text>
      </svg>
      <span className="hero__badge-core">
        <ArrowUpRight size={22} strokeWidth={1.6} />
      </span>
    </div>
  );
}

export default function Hero({ onBook }) {
  return (
    <section className="hero" id="home">
      <div className="hero__media">
        <img
          src={images.hero}
          alt="Coach spotting an athlete pressing a dumbbell in a dimly lit premium gym"
          fetchPriority="high"
        />
        <span className="hero__media-scrim" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="eyebrow">Singapore&rsquo;s premium personal training studio</span>

          <h1 className="hero__title">
            Build your
            <br />
            <span className="hero__title-accent">stronger</span> self
          </h1>

          <p className="hero__lede">
            Premium personal training in Singapore designed around{' '}
            <strong>you.</strong>
          </p>

          <ul className="hero__features">
            {heroFeatures.map((feature) => (
              <li key={feature.label} className="hero__feature">
                <Icon name={feature.icon} size={24} />
                <span>{feature.label}</span>
              </li>
            ))}
          </ul>

          <div className="hero__actions">
            <button className="btn" type="button" onClick={onBook}>
              Book a free consultation
              <ArrowRight size={16} strokeWidth={2.2} />
            </button>
            <a className="hero__secondary" href="#programs">
              Explore programs
              <ArrowRight size={15} strokeWidth={2} />
            </a>
          </div>
        </div>

        <RotatingBadge />
      </div>

      <div className="container hero__stats">
        <ul className="stats">
          {stats.map((stat) => (
            <li key={stat.label} className="stats__item">
              <Icon name={stat.icon} size={22} className="stats__icon" />
              <div>
                <span className="stats__value">{stat.value}</span>
                <span className="stats__label">{stat.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
