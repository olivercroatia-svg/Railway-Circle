import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/use-scroll-animation';
import styles from './About.module.css';

const ABOUT_HERO_IMAGE = '/assets/about-hero-port.png';
const DIRECTOR_IMAGE = '/assets/Melita_Rozman_Dacar.jpg';

const VALUES = ['reliability', '360', 'sustainability', 'digital'];

const VALUE_ICONS = {
  reliability: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  '360': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
    </svg>
  ),
  sustainability: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22c0-8 6-14 14-14s-6 14-14 14z"/><path d="M22 2c0 8-6 14-14 14"/>
    </svg>
  ),
  digital: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
};

const GROUP_COMPANIES = [
  { name: 'Kombinovani prevoz', country: 'Srbija', flag: '🇷🇸' },
  { name: 'Kombinirani prijevoz', country: 'Hrvatska', flag: '🇭🇷', url: 'https://kprijevoz.com' },
  { name: 'BLUE Railway', country: 'Hrvatska', flag: '🇭🇷', url: 'https://www.bluerailway.com' },
  { name: 'BLUE Intelligence', country: 'Hrvatska', flag: '🇭🇷', url: 'https://www.blueintelligence.hr' },
];

export default function About() {
  const { t } = useTranslation();
  const storyRef = useScrollAnimation();
  const valuesRef = useScrollAnimation();
  const groupRef = useScrollAnimation();
  const directorRef = useScrollAnimation();

  return (
    <main>

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="grid-bg" />
        <div
          className={styles.heroBgImage}
          style={{ backgroundImage: `url(${ABOUT_HERO_IMAGE})` }}
        />
        <div className={styles.heroBgOverlay} />
        <div className="container" style={{position:'relative', zIndex:1}}>
          <span className="section-badge light">{t('about.hero_badge')}</span>
          <h1 className={styles.heroTitle}>{t('about.hero_title')}</h1>
          <p className={styles.heroSubtitle}>{t('about.hero_subtitle')}</p>
        </div>
      </section>

      {/* STORY */}
      <section className={styles.story}>
        <div className="container">
          <div className={`${styles.storyGrid} fade-up`} ref={storyRef}>
            <div className={styles.storyLeft}>
              <span className="section-badge">{t('about.story_title')}</span>
              <h2 className={styles.sectionTitle}>{t('about.story_title')}</h2>
              <p className={styles.storyText}>{t('about.story_p1')}</p>
              <p className={styles.storyText}>{t('about.story_p2')}</p>
            </div>
            <div className={styles.storyRight}>
              <div className={styles.storyCard}>
                <div className={styles.storyCardNum}>850.000+</div>
                <div className={styles.storyCardLabel}>tona tereta godišnje</div>
              </div>
              <div className={styles.storyCard}>
                <div className={styles.storyCardNum}>15+</div>
                <div className={styles.storyCardLabel}>zemalja u mreži</div>
              </div>
              <div className={styles.storyCard} style={{gridColumn:'1/-1'}}>
                <div className={styles.storyCardNum}>24/7</div>
                <div className={styles.storyCardLabel}>dostupnost tima</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className={styles.values}>
        <div className="container">
          <div className={`fade-up`} ref={valuesRef}>
            <div className={styles.valuesSectionHeader}>
              <span className="section-badge">{t('about.values_title')}</span>
              <h2 className={styles.sectionTitle}>{t('about.values_title')}</h2>
            </div>
            <div className={styles.valuesGrid}>
              {VALUES.map((key, i) => (
                <div key={key} className={`${styles.valueCard} fade-up delay-${i + 1}`}>
                  <div className={styles.valueIcon}>{VALUE_ICONS[key]}</div>
                  <h3 className={styles.valueTitle}>{t(`about.value_${key}`)}</h3>
                  <p className={styles.valueDesc}>{t(`about.value_${key}_desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GROUP */}
      <section className={styles.group}>
        <div className="container">
          <div className={`fade-up`} ref={groupRef}>
            <span className="section-badge">{t('about.group_title')}</span>
            <h2 className={styles.sectionTitle}>{t('about.group_title')}</h2>
            <p className={styles.groupDesc}>{t('about.group_desc')}</p>
            <div className={styles.groupGrid}>
              {GROUP_COMPANIES.map(c => (
                c.url ? (
                  <a 
                    key={c.name} 
                    href={c.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.groupCard}
                  >
                    <span className={styles.groupFlag}>{c.flag}</span>
                    <h3 className={styles.groupName}>{c.name}</h3>
                    <span className={styles.groupCountry}>{c.country}</span>
                  </a>
                ) : (
                  <div key={c.name} className={styles.groupCard}>
                    <span className={styles.groupFlag}>{c.flag}</span>
                    <h3 className={styles.groupName}>{c.name}</h3>
                    <span className={styles.groupCountry}>{c.country}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DIRECTOR */}
      <section className={styles.director}>
        <div className="container">
          <div className={`${styles.directorCard} fade-up`} ref={directorRef}>
            <div className={styles.directorImageWrap}>
              <img src={DIRECTOR_IMAGE} alt={t('about.director_name')} className={styles.directorImage} />
            </div>
            <div className={styles.directorContent}>
              <span className="section-badge">{t('about.director_title')}</span>
              <h2 className={styles.directorName}>{t('about.director_name')}</h2>
              <p className={styles.directorDesc}>{t('about.director_desc')}</p>
              <div className={styles.directorMeta}>
                <span>Railway Circle d.o.o.</span>
                <span>Zagreb, Hrvatska</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
