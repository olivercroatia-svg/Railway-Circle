import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation, useCountUp } from '../../hooks/use-scroll-animation';
import styles from './Home.module.css';

const HERO_IMAGE = `${import.meta.env.BASE_URL}assets/hero-vectron-rc.png`;
const ABOUT_IMAGE = `${import.meta.env.BASE_URL}assets/port-teaser.png`;

const SERVICE_ICONS = {
  rail: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><path d="M6 17l-1 3M18 17l1 3M2 12h20"/></svg>,
  intermodal: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  dangerous: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  special: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  customs: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  tracking: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>,
};

const SERVICES = ['rail', 'intermodal', 'dangerous', 'special', 'customs', 'tracking'];

function StatItem({ value, suffix, label }) {
  const numRef = useCountUp(value, 2200);
  const ref = useScrollAnimation();
  return (
    <div className={`${styles.statItem} fade-up`} ref={ref}>
      <div className={styles.statValue}>
        <span ref={numRef}>0</span>
        <span className={styles.statSuffix}>{suffix}</span>
      </div>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}

// Each card is its own component so hooks are called unconditionally
function ServiceCard({ serviceKey, delay }) {
  const { t } = useTranslation();
  const ref = useScrollAnimation();
  return (
    <Link
      to="/services"
      className={`${styles.serviceCard} fade-up delay-${delay}`}
      ref={ref}
    >
      <div className={styles.serviceIcon}>{SERVICE_ICONS[serviceKey]}</div>
      <h3 className={styles.serviceTitle}>{t(`services_overview.${serviceKey}.title`)}</h3>
      <p className={styles.serviceDesc}>{t(`services_overview.${serviceKey}.desc`)}</p>
      <span className={styles.serviceArrow}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    </Link>
  );
}

function Stat247({ label }) {
  const ref = useScrollAnimation();
  return (
    <div className={`${styles.statItem} fade-up`} ref={ref}>
      <div className={styles.statValue}><span>24/7</span></div>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const heroRef = useScrollAnimation();
  const aboutRef = useScrollAnimation();
  const aboutTextRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  return (
    <main className={styles.main}>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src={HERO_IMAGE} alt="Siemens Vectron locomotive" className={styles.heroBgImg} />
          <div className={styles.heroBgOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={`fade-up ${styles.heroInner}`} ref={heroRef}>
            <span className={`section-badge ${styles.heroBadge}`}>{t('hero.badge')}</span>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleLine1}>{t('hero.title_1')}</span>
              <span className={styles.heroTitleLine2}>{t('hero.title_2')}</span>
            </h1>
            <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>
            <div className={styles.heroCtas}>
              <Link to="/contact" className="btn-primary">
                {t('hero.cta_primary')}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link to="/services" className={styles.heroSecondaryBtn}>
                {t('hero.cta_secondary')}
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>{t('hero.scroll')}</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* STATS */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            <StatItem value={850000} suffix="+" label={t('stats.tons')} />
            <StatItem value={15} suffix="+" label={t('stats.countries')} />
            <StatItem value={20} suffix="+" label={t('stats.years')} />
            <Stat247 label={t('stats.availability')} />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className={styles.services}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-badge">{t('services_overview.title')}</span>
            <h2 className={styles.sectionTitle}>{t('services_overview.title')}</h2>
            <p className={styles.sectionSubtitle}>{t('services_overview.subtitle')}</p>
          </div>
          <div className={styles.servicesGrid}>
            {SERVICES.map((key, i) => (
              <ServiceCard key={key} serviceKey={key} delay={i % 3 + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className={styles.about}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={`${styles.aboutImage} fade-up`} ref={aboutRef}>
              <img src={ABOUT_IMAGE} alt="Railway Circle team" />
              <div className={styles.aboutImageBadge}>
                <span className={styles.badgeNum}>20+</span>
                <span className={styles.badgeText}>godina iskustva</span>
              </div>
            </div>
            <div className={`${styles.aboutText} fade-up delay-2`} ref={aboutTextRef}>
              <span className="section-badge">{t('about_teaser.badge')}</span>
              <h2 className={styles.sectionTitle}>{t('about_teaser.title')}</h2>
              <p className={styles.aboutDesc}>{t('about_teaser.desc_1')}</p>
              <p className={styles.aboutDesc}>{t('about_teaser.desc_2')}</p>
              <div className={styles.aboutValues}>
                {['reliability', '360', 'sustainability'].map(v => (
                  <span key={v} className={styles.valuePill}>{t(`about.value_${v}`)}</span>
                ))}
              </div>
              <Link to="/about" className="btn-secondary" style={{marginTop:'8px'}}>
                {t('about_teaser.link')}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className={styles.ctaBand}>
        <div className="container">
          <div className={`${styles.ctaInner} fade-up`} ref={ctaRef}>
            <div className={styles.ctaText}>
              <h2 className={styles.ctaTitle}>{t('cta_section.title')}</h2>
              <p className={styles.ctaSubtitle}>{t('cta_section.subtitle')}</p>
            </div>
            <Link to="/contact" className="btn-primary">
              {t('cta_section.button')}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
