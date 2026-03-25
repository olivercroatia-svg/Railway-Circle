import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/use-scroll-animation';
import styles from './Services.module.css';

const SERVICES_HERO = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800&q=80&auto=format&fit=crop';

const SERVICES_DATA = [
  {
    key: 'rail',
    image: '/assets/vectron-rail-blue.png',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="10" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><path d="M6 17l-1 3M18 17l1 3M2 12h20"/>
      </svg>
    ),
  },
  {
    key: 'intermodal',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80&auto=format&fit=crop',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    key: 'dangerous',
    image: '/assets/tank-wagons.png',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    key: 'special',
    image: '/assets/special-cargo.png',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      </svg>
    ),
  },
  {
    key: 'customs',
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80&auto=format&fit=crop',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    key: 'tracking',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
      </svg>
    ),
  },
];

export default function Services() {
  const { t } = useTranslation();
  const ctaRef = useScrollAnimation();

  return (
    <main>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="grid-bg" />
        <div
          className={styles.heroBgImage}
          style={{ backgroundImage: `url(${SERVICES_HERO})` }}
        />
        <div className={styles.heroBgOverlay} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-badge light">{t('services.hero_badge')}</span>
          <h1 className={styles.heroTitle}>{t('services.hero_title')}</h1>
          <p className={styles.heroSubtitle}>{t('services.hero_subtitle')}</p>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className={styles.servicesList}>
        <div className="container">
          {SERVICES_DATA.map((service, i) => {
            const ref = useScrollAnimation();
            const isEven = i % 2 === 0;
            return (
              <div
                key={service.key}
                className={`${styles.serviceRow} ${isEven ? '' : styles.serviceRowReverse} fade-up`}
                ref={ref}
              >
                <div className={styles.serviceImageWrap}>
                  <img src={service.image} alt={t(`services_overview.${service.key}.title`)} />
                  <div className={styles.serviceImageOverlay} />
                </div>
                <div className={styles.serviceContent}>
                  <div className={styles.serviceIconLarge}>{service.icon}</div>
                  <h2 className={styles.serviceTitle}>{t(`services_overview.${service.key}.title`)}</h2>
                  <p className={styles.serviceDesc}>{t(`services_overview.${service.key}.desc`)}</p>
                  <ul className={styles.featureList}>
                    {t(`services_overview.${service.key}.features`, { returnObjects: true }).map(f => (
                      <li key={f} className={styles.featureItem}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7l3.5 3.5L12 3" stroke="#e8b04b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <div className={`${styles.ctaCard} fade-up`} ref={ctaRef}>
            <div className={styles.ctaGlow} />
            <h2 className={styles.ctaTitle}>{t('services.cta_title')}</h2>
            <p className={styles.ctaDesc}>{t('services.cta_desc')}</p>
            <Link to="/contact" className="btn-primary">
              {t('services.cta_button')}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
