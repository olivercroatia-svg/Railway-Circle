# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Railway Circle Website** — Višejezična marketinška web stranica za logističku tvrtku Railway Circle d.o.o. (Zagreb). Prikazuje usluge, informacije o tvrtki i omogućuje kontakt putem forme.

## Tech Stack

| Alat | Verzija | Svrha |
|------|---------|-------|
| React | 19.x | UI framework |
| Vite | 8.x | Build tool & dev server |
| react-router-dom | 7.x | Client-side routing (SPA) |
| i18next | 25.x | i18n core |
| react-i18next | 15.x | React hooks za i18n |
| i18next-http-backend | 3.x | Lazy-load JSON prijevoda |
| i18next-browser-languagedetector | 8.x | Auto-detekcija jezika |
| @emailjs/browser | 4.x | Slanje emaila bez backenda |
| vite-plugin-svgr | 4.x | Import SVG kao React komponent |

**Stilizacija**: CSS Modules + globalni dizajn tokeni u `src/index.css`
**Fontovi**: Playfair Display (naslovi) + DM Sans (tijelo) via Google Fonts
**Deployment**: Vercel (automatski, prati `main` branch) + cPanel (ručni upload `dist/`)

## Jezici

Stranica podržava 11 jezika. Prijevodi su u `public/locales/{lang}/common.json` (lazy-load, nisu u JS bundleu).

| Kod | Jezik | Status |
|-----|-------|--------|
| hr  | Hrvatski | ✅ Pravi prijevod |
| sl  | Slovenščina | ✅ Pravi prijevod |
| sr  | Srpski | ⚠️ Placeholder (EN kopija) |
| de  | Deutsch | ⚠️ Placeholder (EN kopija) |
| en  | English | ✅ Pravi prijevod |
| it  | Italiano | ⚠️ Placeholder (EN kopija) |
| hu  | Magyar | ⚠️ Placeholder (EN kopija) |
| sk  | Slovenčina | ⚠️ Placeholder (EN kopija) |
| cs  | Čeština | ⚠️ Placeholder (EN kopija) |
| pl  | Polski | ⚠️ Placeholder (EN kopija) |
| ro  | Română | ⚠️ Placeholder (EN kopija) |

## Commands

```bash
npm run dev        # Lokalni dev server → http://localhost:5173
npm run build      # Produkcijski build → dist/
npm run preview    # Preview dist/ lokalno
npm run lint       # ESLint provjera
```

**Deploy na cPanel**: `npm run build` → ručno prenijeti sadržaj `dist/` na server.
**Deploy na Vercel**: automatski pri pushu na `main` branch.

## Architecture

### Routing (App.jsx)
```
/           → Home
/about      → About
/services   → Services
/contact    → Contact
```
BrowserRouter s 4 rute. Navbar i Footer su izvan ruta (uvijek vidljivi). Suspense boundary s loading spinnerom dok se i18n inicijalizira.

### i18n tok podataka
```
i18n.js → HttpBackend → /public/locales/{lang}/common.json
         → LanguageDetector (localStorage → navigator)
         → fallbackLng: 'hr'
```
Komponente koriste `useTranslation()` hook (jedan namespace: `common`). Za array vrijednosti koristiti `returnObjects: true`.

### Kontakt forma (EmailJS)
Nema backend. Forma šalje email direktno iz browsera:
1. `emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)`
2. Varijable dolaze iz `import.meta.env.VITE_EMAILJS_*`
3. Ciljna email adresa se konfigurira unutar EmailJS dashboarda

### Scroll animacije (hooks/use-scroll-animation.js)
```js
useScrollAnimation()  // Dodaje CSS klasu 'visible' kad element uđe u viewport
useCountUp(target, duration)  // Animira broj od 0 do target (rAF + easing)
```
**VAŽNO**: Ove hookove nikad ne pozivati unutar `.map()` ili uvjetno! Uvijek izvući komponentu.

## File Structure

```
Railway Circle/
├── public/
│   ├── assets/                    # Statične slike (direkt URL pristup)
│   │   ├── hero-vectron-rc.png   # Home hero (Siemens Vectron)
│   │   ├── about-hero-port.png   # About page hero
│   │   ├── contact-hero.png      # Contact page hero
│   │   ├── vectron-rail-blue.png # Services: Rail
│   │   ├── tank-wagons.png        # Services: Dangerous goods
│   │   ├── special-cargo.png      # Services: Special cargo
│   │   ├── customs-office.png     # Services: Customs
│   │   ├── port-teaser.png        # Home about teaser
│   │   └── Melita_Rozman_Dacar.jpg # Director portrait
│   ├── locales/
│   │   └── {lang}/common.json    # i18n JSON prijevodi (11 jezika)
│   ├── icons.svg                  # SVG icons sprite (za favoritne ikone)
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── rc-logo.svg           # Logo (currentColor + --logo-hole CSS var)
│   ├── components/
│   │   ├── Navbar/               # Fiksna navigacija + hamburger mobile menu
│   │   ├── Footer/               # Navy footer s linkovima i grupacijom
│   │   └── LanguageSwitcher/     # Dropdown za 11 jezika s flag emojijima
│   ├── hooks/
│   │   └── use-scroll-animation.js  # useScrollAnimation, useCountUp
│   ├── pages/
│   │   ├── Home/                 # Hero, Stats, Services grid, About teaser, CTA
│   │   ├── About/                # Story, Values, Group companies, Director
│   │   ├── Services/             # 6 usluga u naizmjeničnim redovima
│   │   └── Contact/              # EmailJS forma + info kartice
│   ├── i18n.js                   # i18next konfiguracija
│   ├── index.css                 # Globalni stilovi + CSS tokeni (dizajn sustav)
│   └── App.jsx                   # Router + Suspense + Navbar/Footer layout
├── vite.config.js                # react() + svgr() plugins
├── .env                          # NIJE u gitu
├── .env.example                  # Template (jest u gitu)
└── package.json
```

## Design System (index.css)

### CSS Custom Properties (Varijable)
```css
--color-bg: #ffffff           /* Bijela pozadina */
--color-bg-2: #f4f7fb         /* Svjetlo plava pozadina za sekcije */
--color-navy: #1a3a5c         /* Tamno plava (navbar, footer, CTA pojasevi) */
--color-accent: #1a5fa0       /* Plava (gumbi, linkovi, akcenti) */
--color-accent-green: #0d7a45 /* Zelena (sekundarna akcija, vrijednosti) */
--color-text: #0f1f35         /* Tamni tekst */
--color-text-muted: #4a5e78   /* Mutni tekst (opisi) */
--font-display: 'Playfair Display', serif
--font-body: 'DM Sans', sans-serif
--nav-height: 72px
--transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### Globalne utility klase
| Klasa | Svrha |
|-------|-------|
| `.container` | Max-width 1200px, centered, padding 0 24px |
| `.btn-primary` | Plavi gumb s hover-lift efektom |
| `.btn-secondary` | Outline gumb (navy border) |
| `.btn-green` | Zeleni gumb |
| `.section-badge` | Mali pill badge (plavi, s pulsing točkom) |
| `.section-badge.light` | Badge varijanta za tamne pozadine |
| `.page-hero` | Bazna klasa za hero sekcije stranica |
| `.fade-up` | Scroll animacija (opacity + translateY) |
| `.fade-up.delay-{1-5}` | Kaskadni delay (0.1s do 0.5s) |

### Hero sekcija pattern
```jsx
<section className={`page-hero ${styles.hero}`}>
  <div className={styles.heroBgImage} style={{ backgroundImage: `url(${IMAGE})` }} />
  <div className={styles.heroBgOverlay} />
  <div className="container" style={{ position: 'relative', zIndex: 1 }}>
    <span className="section-badge light">{t('page.hero_badge')}</span>
    <h1 className={styles.heroTitle}>{t('page.hero_title')}</h1>
    <p className={styles.heroSubtitle}>{t('page.hero_subtitle')}</p>
  </div>
</section>
```
```css
.heroBgImage {
  position: absolute; inset: 0;
  background-size: cover; background-position: center;
  filter: brightness(0.6) saturate(0.9);
}
.heroBgOverlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(10,25,50,0.72) 30%, rgba(10,25,50,0.35) 70%);
}
.heroTitle { color: #ffffff; }
.heroSubtitle { color: rgba(255,255,255,0.75); }
```

### SVG Logo pattern (dual-theme)
```jsx
import RcLogo from '../../assets/rc-logo.svg?react';
<RcLogo className={styles.logoImg} />
```
```css
/* Navbar (bijela pozadina) */
.logoImg { color: var(--color-navy); --logo-hole: #ffffff; }
/* Footer (navy pozadina) */
.logoImg { color: #ffffff; --logo-hole: var(--color-navy); }
```
SVG koristi `fill="currentColor"` za glavne putanje i `fill="var(--logo-hole, #FDFEFD)"` za unutarnje detalje.

## Conventions

- **Imenovanje komponenti**: PascalCase (`ContactForm.jsx`, `HeroSection.jsx`)
- **Imenovanje datoteka**: kebab-case za sve osim komponenti (`use-scroll.js`, `i18n-config.js`)
- **Varijable i funkcije**: camelCase
- **Komponente**: isključivo funkcionalne (bez class komponenti)
- **Prijevodi**: ključevi u `snake_case`, svi u jednom namespaceu (`common`)
- **Env varijable**: uvijek s prefiksom `VITE_`
- **Stilovi**: CSS Modules po komponenti (`ComponentName.module.css`)
- **Slike**: statične slike u `public/assets/` (URL: `/assets/slika.png`)
- **Struktura**: feature-based — svaka stranica u vlastitom folderu

## Company Info

- **Tvrtka**: Railway Circle d.o.o.
- **Direktorica**: Melita Rozman Dacar
- **Adresa**: Bosiljevska 20, Zagreb (ured: Sveti Duh 50A)
- **Email**: info@railcircle.com (koristiti `mailto:` link, ne hardkodirati u emailjs)
- **Moto**: "Gdje kretanje postaje prednost"
- **Grupacija**: Kombinovani prevoz (SR), Kombinirani prijevoz (HR), BLUE Railway (HR), BLUE Intelligence (HR)

## Rules

- NEVER hardkodiraj email adrese u kod — jedini iznimak je `mailto:` link za prikaz
- NEVER hardkodiraj API ključeve, service ID-ove ili tokene — koristiti `VITE_` env varijable
- NEVER commitati `.env` datoteku — samo `.env.example` s praznim vrijednostima
- ALWAYS dodati novu varijablu u `.env.example` kad dodaješ novu env varijablu
- ALWAYS koristiti i18next ključeve za sve tekstove vidljive korisniku
- ALWAYS dodati prijevod za svih 11 jezika kad dodaješ novi i18n ključ
- ALWAYS koristiti `useScrollAnimation()` samo unutar komponente (nikad u `.map()` direktno)
- ALWAYS testirati build (`npm run build`) prije deployanja na cPanel
- ALWAYS staviti slike u `public/assets/` (ne u `src/assets/`) za statičan URL pristup
- NEVER koristiti `any` kao tip u TypeScript datotekama (ako se TypeScript uvede)
