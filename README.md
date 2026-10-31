# Vilfreds dåb – digital invitation

Hjemmeside med konvolut, der åbnes, billeder, program, ønskesky og tilmelding.

| Fil | Hvad |
|---|---|
| `index.html` | Selve invitationen (personligt link: `?g=…`) |
| `admin.html` | Oversigt over tilmeldinger (login: samme som Pligter) |
| `assets/style.css` | Udseende |
| `assets/config.js` | **Ret her:** billeder, dato, ønskesky, lydstyrke |
| `img/` | Læg de 10 billeder her (fx `01.jpg` … `10.jpg`) |

## Billeder
Læg filerne i `img/` og skriv stien i `billeder` i `assets/config.js`, fx `{ src: "img/01.jpg", tekst: "1 måned" }`.
Gør dem gerne max ca. 1200 px brede, så siden loader hurtigt på mobil.

## Database (Supabase-projekt `lea-iql-rapporter`)
- Tabel `daab_gaester` – kun achris@live.dk kan læse/ændre (RLS).
- `daab_hent(token)` og `daab_svar(...)` – offentlige funktioner, gæster bruger dem til at se og sende deres eget svar.
- Mail ved hvert svar sendes via Resend med nøglen `resend_api_key` i Vault (samme som Pligter).
