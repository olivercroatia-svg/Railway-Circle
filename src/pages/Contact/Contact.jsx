import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/use-scroll-animation';
import styles from './Contact.module.css';

const CONTACT_HERO_IMAGE = `${import.meta.env.BASE_URL}assets/contact-hero.png`;

export default function Contact() {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const infoRef = useScrollAnimation();
  const formAnimRef = useScrollAnimation();

  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '', message: ''
  });

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Provjera varijabli (ako niste restartali server, bit će prazne)
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS varijable nedostaju! Jeste li restartali terminal s "npm run dev"?');
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );
      setStatus('success');
      setForm({ name: '', email: '', company: '', phone: '', message: '' });
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
    }
  };

  return (
    <main>
      {/* PAGE HERO */}
      <section className={`page-hero ${styles.hero}`}>
        <div
          className={styles.heroBgImage}
          style={{ backgroundImage: `url(${CONTACT_HERO_IMAGE})` }}
        />
        <div className={styles.heroBgOverlay} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-badge light">{t('contact.hero_badge')}</span>
          <h1 className={styles.heroTitle}>{t('contact.hero_title')}</h1>
          <p className={styles.heroSubtitle}>{t('contact.hero_subtitle')}</p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>

            {/* INFO */}
            <div className={`${styles.infoCol} fade-up`} ref={infoRef}>
              <h2 className={styles.infoTitle}>{t('contact.info_title')}</h2>

              <div className={styles.infoCard}>
                <div className={styles.infoIconWrap}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.infoLabel}>{t('contact.address')}</p>
                  <p className={styles.infoValue}>{t('contact.address_main')}</p>
                  <p className={styles.infoValue}>{t('contact.address_office')}</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIconWrap}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.infoLabel}>{t('contact.email_label')}</p>
                  <a href="mailto:info@railcircle.com" className={styles.infoLink}>info@railcircle.com</a>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIconWrap}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.infoLabel}>{t('contact.availability')}</p>
                  <p className={styles.infoValue}>{t('contact.availability_value')}</p>
                </div>
              </div>

              <div className={styles.mapPlaceholder}>
                <div className={styles.mapPin}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8b04b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <p>Zagreb, Hrvatska</p>
              </div>
            </div>

            {/* FORM */}
            <div className={`${styles.formCol} fade-up delay-2`} ref={formAnimRef}>
              <h2 className={styles.formTitle}>{t('contact.form_title')}</h2>

              {status === 'success' ? (
                <div className={styles.successMsg}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="23" stroke="#e8b04b" strokeWidth="1.5"/>
                    <path d="M14 24l7 7 13-14" stroke="#e8b04b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>{t('contact.success')}</p>
                </div>
              ) : (
                <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t('contact.name')} *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder="Ivan Horvat"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t('contact.email')} *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder="ivan@tvrtka.hr"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t('contact.company')}</label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Tvrtka d.o.o."
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t('contact.phone')}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="+385 1 234 5678"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t('contact.message')} *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={styles.textarea}
                      placeholder={t('contact.message_placeholder')}
                    />
                  </div>

                  {status === 'error' && (
                    <p className={styles.errorMsg}>{t('contact.error')}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`btn-primary ${styles.submitBtn}`}
                  >
                    {status === 'sending' ? t('contact.sending') : t('contact.send')}
                    {status !== 'sending' && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
