# Vilfreds dåb – digital invitation

Hjemmeside med konvolut, der åbnes, billeder, program, ønskesky og tilmelding.

| Fil | Hvad |
|---|---|
| `index.html` | Selve invitationen (personligt link: `?g=…`) |
| `admin.html` | Oversigt over tilmeldinger (login: samme som Pligter) |
| `assets/style.css` | Grundlæggende layout og konvolut |
| `assets/theme-base.css`, `assets/theme-fugle.css` | Fugle-temaet: farver, skrifttyper og fuglefamilien |
| `assets/config.js` | **Ret her:** billeder (med spansk billedtekst i `tekst_es`), dato, ønskesky, lydstyrke |
| `assets/i18n.js` | Spansk oversættelse (Peru, "usted") – bruges for gæster med sprog = spansk |
| `img/` | Læg de 10 billeder her (fx `01.jpg` … `10.jpg`) |

## Billeder
Læg filerne i `img/` og skriv stien i `billeder` i `assets/config.js`, fx `{ src: "img/01.jpg", tekst: "1 måned" }`.
Gør dem gerne max ca. 1200 px brede, så siden loader hurtigt på mobil.

## Database (Supabase-projekt `lea-iql-rapporter`)
- Tabel `daab_gaester` – kun achris@live.dk kan læse/ændre (RLS). Kolonnen `sprog` (da/es) styrer invitationens sprog; spanske links får `&l=es`.
- `daab_hent(token)` og `daab_svar(...)` – offentlige funktioner, gæster bruger dem til at se og sende deres eget svar.
- Mail ved hvert svar sendes via Resend med nøglen `resend_api_key` i Vault (samme som Pligter).
