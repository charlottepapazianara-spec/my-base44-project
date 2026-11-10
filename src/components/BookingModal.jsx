import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { contact, goals } from '../data/content.js';
import '../styles/booking.css';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  goal: goals[0],
  date: '',
  notes: '',
};

export default function BookingModal({ open, program, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const timerRef = useRef(null);

  const created = useMemo(() => form, [form]);
  const source = program ? `علاقه‌مند به: ${program}` : 'مشاورهٔ رایگان';

  useEffect(() => {
    if (!open) return undefined;

    setStatus('idle');
    setError('');
    setForm((current) => ({
      ...current,
      goal:
        program && goals.includes(program)
          ? program
          : program
          ? goals[0]
          : current.goal,
    }));

    document.body.classList.add('is-locked');
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 120);

    const onKey = (event) => {
      if (event.key === 'Escape') onClose();

      if (event.key === 'Tab' && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusable = Array.from(nodes).filter(
          (node) => !node.hasAttribute('disabled') && node.offsetParent !== null
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('is-locked');
    };
  }, [open, program, onClose]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  if (!open) return null;

  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('نام، ایمیل و شماره تماست را وارد کن تا بتوانیم با تو در تماس باشیم.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      setError('این ایمیل کامل به نظر نمی‌رسد — لطفاً بررسی‌اش کن.');
      return;
    }
    setError('');
    setStatus('sending');
    timerRef.current = window.setTimeout(() => setStatus('sent'), 750);
  };

  const close = () => {
    onClose();
    window.setTimeout(() => {
      setForm(emptyForm);
      setStatus('idle');
    }, 250);
  };

  return (
    <div
      className="booking"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className="booking__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        ref={dialogRef}
      >
        <button className="booking__close" type="button" onClick={close} aria-label="بستن">
          <X size={18} strokeWidth={1.8} />
        </button>

        {status === 'sent' ? (
          <div className="booking__success">
            <span className="booking__success-icon">
              <Check size={26} strokeWidth={2.4} />
            </span>
            <span className="eyebrow eyebrow--center">درخواست ثبت شد</span>
            <h2 className="booking__title" id="booking-title">
              ممنون، {created.name.trim().split(' ')[0] || 'دوست عزیز'}.
            </h2>
            <p className="booking__intro">
              یک مربی ظرف یک روز کاری مشاورهٔ رایگانت را در{' '}
              <strong>{created.email}</strong> تأیید می‌کند. اهدافت را با خودت بیاور؛
              برنامه با ما.
            </p>
            <ul className="booking__summary">
              <li>
                <span>علاقه</span>
                <strong>{program || created.goal}</strong>
              </li>
              <li>
                <span>تاریخ ترجیحی</span>
                <strong>{created.date || 'انعطاف‌پذیر'}</strong>
              </li>
              <li>
                <span>استودیو</span>
                <strong>{contact.address}</strong>
              </li>
            </ul>
            <button className="btn btn--block" type="button" onClick={close}>
              بازگشت به سایت
              <ArrowLeft size={16} strokeWidth={2} />
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">{source}</span>
            <h2 className="booking__title" id="booking-title">
              مشاورهٔ رایگانت را رزرو کن
            </h2>
            <p className="booking__intro">
              ۴۵ دقیقه، بدون تعهد. بگو همین حالا کجایی و چه چیزی را می‌خواهی تغییر
              دهی.
            </p>

            {program && (
              <span className="booking__chip">
                <Check size={13} strokeWidth={2.6} />
                {program}
              </span>
            )}

            <form className="booking__form" onSubmit={submit} noValidate>
              <div className="field">
                <label htmlFor="booking-name">نام و نام خانوادگی</label>
                <input
                  id="booking-name"
                  ref={firstFieldRef}
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="آرش رضایی"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="booking__row">
                <div className="field">
                  <label htmlFor="booking-email">ایمیل</label>
                  <input
                    id="booking-email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@email.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="booking-phone">شماره تماس</label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="+65 9123 4567"
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className="booking__row">
                <div className="field">
                  <label htmlFor="booking-goal">هدف اصلی</label>
                  <select id="booking-goal" value={form.goal} onChange={update('goal')}>
                    {goals.map((goal) => (
                      <option key={goal} value={goal}>
                        {goal}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="booking-date">تاریخ ترجیحی</label>
                  <input
                    id="booking-date"
                    type="date"
                    value={form.date}
                    onChange={update('date')}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="booking-notes">چیزی هست که باید بدانیم؟</label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  value={form.notes}
                  onChange={update('notes')}
                  placeholder="آسیب‌ها، برنامهٔ زمانی، سابقهٔ تمرین…"
                />
              </div>

              {error && (
                <p className="booking__error" role="alert">
                  {error}
                </p>
              )}

              <button
                className="btn btn--block"
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'در حال ارسال…' : 'درخواست مشاوره'}
                {status !== 'sending' && <ArrowLeft size={16} strokeWidth={2} />}
              </button>

              <p className="booking__note">
                پرداختی لازم نیست. اطلاعاتت را با کسی به اشتراک نمی‌گذاریم.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
