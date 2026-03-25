# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Railway Circle Website** — Višejezična marketinška web stranica za logističku tvrtku Railway Circle d.o.o. (Zagreb). Prikazuje usluge, informacije o tvrtki i omogućuje kontakt putem forme.

## Tech Stack

- **Framework**: React (Vite)
- **i18n**: i18next + react-i18next
- **Stilizacija**: CSS Modules
- **Kontakt forma**: EmailJS (bez backenda)
- **Deployment**: Vercel (primarni) + cPanel (ručni upload statičnih datoteka)
- **Build output**: `dist/` (statične datoteke)

## Jezici

Stranica podržava 11 jezika. Svaki jezik ima vlastitu mapu u `src/locales/`:

| Kod | Jezik     |
|-----|-----------|
| hr  | Hrvatski  |
| sl  | Slovenski |
| sr  | Srpski    |
| de  | Njemački  |
| en  | Engleski  |
| it  | Talijanski|
| hu  | Mađarski  |
| sk  | Slovački  |
| cs  | Češki     |
| pl  | Poljski   |
| ro  | Rumunjski |

## Commands

```bash
npm run dev        # Lokalni dev server (http://localhost:5173)
npm run build      # Produkcijski build → dist/
npm run preview    # Preview dist/ lokalno prije deploya
npm run lint       # ESLint provjera
```

**Deploy na cPanel**: nakon `npm run build` ručno prenijeti sadržaj `dist/` na server.
**Deploy na Vercel**: automatski pri pushu na `main` branch (Vercel prati repozitorij).

## Architecture

### i18n tok podataka
`i18n.js` inicijalizira i18next s `react-i18next` pluginom. JSON datoteke prijevoda nalaze se u `public/locales/{lang}/{namespace}.json` i učitavaju se lazy (HTTP fetch) — ne bundleaju se u JS. Jezik se detektira iz browsera (`i18next-browser-languagedetector`) i sprema u `localStorage`. Komponente koriste `useTranslation(namespace)` hook.

### Kontakt forma (EmailJS)
Nema backend — forma šalje email direktno iz browsera putem EmailJS SDK-a. Service ID, Template ID i Public Key dolaze iz env varijabli (`VITE_EMAILJS_*`). Ciljna email adresa konfigurira se unutar EmailJS dashboarda, ne u kodu.

## Conventions

- **Imenovanje komponenti**: PascalCase (npr. `ContactForm.jsx`, `HeroSection.jsx`)
- **Imenovanje datoteka**: kebab-case za sve osim komponenti (npr. `use-scroll.js`, `i18n-config.js`)
- **Varijable i funkcije**: camelCase
- **Komponente**: isključivo funkcionalne (bez class komponenti)
- **Prijevodi**: ključevi u snake_case, organizirani po namespace-ovima (npr. `common`, `nav`, `services`, `contact`)
- **Env varijable**: uvijek s prefiksom `VITE_` (npr. `VITE_EMAILJS_SERVICE_ID`)
- **Stilovi**: CSS Modules po komponenti (`ComponentName.module.css`)
- **Struktura**: feature-based — svaka stranica/sekcija u vlastitom folderu

## File Structure

```
├── public/
│   └── locales/          # i18next JSON prijevodi (alternativno src/locales/)
├── src/
│   ├── components/       # Dijeljene komponente (Navbar, Footer, LanguageSwitcher...)
│   ├── pages/            # Stranice (Home, About, Services, Contact)
│   ├── locales/          # i18n JSON datoteke po jeziku
│   │   ├── hr/
│   │   ├── en/
│   │   └── ...
│   ├── hooks/            # Custom React hookovi
│   ├── utils/            # Pomoćne funkcije
│   ├── assets/           # Slike, fontovi, ikone
│   ├── i18n.js           # i18next konfiguracija
│   └── App.jsx
├── .env                  # Lokalne env varijable (nije u gitu)
├── .env.example          # Predložak env varijabli (u gitu)
├── .gitignore
├── vite.config.js
└── package.json
```

## Company Info

- **Tvrtka**: Railway Circle d.o.o.
- **Direktorica**: Melita Rozman Dacar
- **Adresa**: Bosiljevska 20, Zagreb (ured: Sveti Duh 50A)
- **Email**: info@railcircle.com
- **Moto**: "Gdje kretanje postaje prednost"
- **Grupacija**: Kombinovani prevoz (SR), Kombinirani prijevoz (HR), BLUE Railway (HR), BLUE Intelligence (HR)

## Rules

- NEVER hardkodiraj email adrese u kod — uvijek koristiti env varijable
- NEVER hardkodiraj API ključeve, service ID-ove ili tokene — koristiti `VITE_` env varijable
- NEVER commitati `.env` datoteku — samo `.env.example` s praznim vrijednostima
- ALWAYS dodati novu varijablu u `.env.example` kad dodaješ novu env varijablu
- ALWAYS koristiti i18next ključeve za sve tekstove vidljive korisniku — bez hardkodiranih stringova u JSX-u
- ALWAYS dodati prijevod za svih 11 jezika kad dodaješ novi i18n ključ
- NEVER koristiti `any` kao tip u TypeScript datotekama (ako se TypeScript uvede)
- ALWAYS testirati build (`npm run build`) prije deployanja na cPanel
