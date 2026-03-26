import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RcLogo from '../../assets/rc-logo.svg?react';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <RcLogo className={styles.logoImg} />
          </div>
          <p className={styles.tagline}>{t('footer.tagline')}</p>
          <p className={styles.tagline} style={{marginTop:'4px', fontSize:'0.78rem', opacity:0.5}}>
            Railway Circle d.o.o.
          </p>
        </div>

        <div className={styles.links}>
          <p className={styles.linksTitle}>{t('footer.links_title')}</p>
          <nav className={styles.linkList}>
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/about">{t('nav.about')}</Link>
            <Link to="/services">{t('nav.services')}</Link>
            <Link to="/contact">{t('nav.contact')}</Link>
          </nav>
        </div>

        <div className={styles.contact}>
          <p className={styles.linksTitle}>{t('footer.contact_title')}</p>
          <div className={styles.contactList}>
            <span>Bosiljevska 20, Zagreb</span>
            <span>Sveti Duh 50A, Zagreb</span>
            <a href="mailto:info@railcircle.com">info@railcircle.com</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <span>© {year} Railway Circle d.o.o. — {t('footer.rights')}</span>
          <div className={styles.group}>
            <a href="https://www.kprevoz.co.rs" target="_blank" rel="noopener noreferrer">Kombinovani prevoz</a>
            <a href="https://kprijevoz.com" target="_blank" rel="noopener noreferrer">Kombinirani prijevoz</a>
            <a href="https://www.bluerailway.com" target="_blank" rel="noopener noreferrer">BLUE Railway</a>
            <a href="https://www.blueintelligence.hr" target="_blank" rel="noopener noreferrer">BLUE Intelligence</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
