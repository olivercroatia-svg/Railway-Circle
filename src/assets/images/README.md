# Fotografije — Zamjena slika

Sve fotografije na stranici su Unsplash URL-ovi. Da biste zamijenili s vlastitim fotografijama:

## Lokacije u kodu

| Datoteka | Varijabla | Trenutna fotografija | Preporučena veličina |
|---|---|---|---|
| `src/pages/Home/Home.jsx` | `HERO_IMAGE` | Vlak u pokretu (Unsplash) | 1800×1200px |
| `src/pages/Home/Home.jsx` | `ABOUT_IMAGE` | Ured / tim (Unsplash) | 900×700px |
| `src/pages/About/About.jsx` | `ABOUT_HERO_IMAGE` | Željeznička pruga (Unsplash) | 1800×1200px |
| `src/pages/About/About.jsx` | `DIRECTOR_IMAGE` | Portret direktorice (Unsplash) | 400×500px |
| `src/pages/Services/Services.jsx` | `SERVICES_HERO` | Logistika (Unsplash) | 1800×1200px |
| `src/pages/Services/Services.jsx` | `service.image` (x6) | Razne usluge (Unsplash) | 800×500px |

## Kako zamijeniti

1. Stavite vlastitu fotografiju u ovaj folder (`src/assets/images/`)
2. U željenu JSX datoteku importirajte sliku:
   ```js
   import heroImg from '../../assets/images/hero.jpg';
   ```
3. Zamijenite URL string s varijablom:
   ```js
   const HERO_IMAGE = heroImg;
   ```

## Format i optimizacija

- Format: `.webp` (preporučeno) ili `.jpg`
- Kompresija: 80% kvaliteta je dovoljno
- Hero slike: minimalno 1600px širine
- Portret fotografije: 400×500px, fokus na lice
