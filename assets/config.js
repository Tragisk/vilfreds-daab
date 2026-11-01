// Fælles indstillinger for Vilfreds dåbsinvitation.
// Ret tekster og billeder her.
window.DAAB = {
  siteUrl: "https://tragisk.github.io/vilfreds-daab/",

  // Supabase (offentlig anon-nøgle – må gerne ligge i koden; data er beskyttet af databasen)
  sbUrl: "https://jmkicrzqmzbetzzjoqtd.supabase.co",
  sbKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impta2ljcnpxbXpiZXR6empvcXRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1MzY1NDUsImV4cCI6MjEwODExMjU0NX0.BHSSKBFBVZ0qESq-LFkUccpCFRsbhq50DQi4bxK6jx4",

  // Dagen
  dato: "2027-01-23T11:00:00+01:00",
  slut: "2027-01-23T16:30:00+01:00",
  svarFrist: "20. december",
  oenskesky: "https://onskeskyen.dk/s/exfm9p",

  // Lyd (0 = slukket, 1 = fuld styrke)
  lydstyrke: 0.15,

  // 10 billeder. Læg filerne i mappen img/ og skriv filnavnet i src, fx "img/01.jpg".
  // Er src tom, vises en pladsholder. tekst_es er billedteksten på spansk.
  billeder: [
    { src: "", tekst: "1 måned", tekst_es: "1 mes" },
    { src: "", tekst: "2 måneder", tekst_es: "2 meses" },
    { src: "", tekst: "3 måneder", tekst_es: "3 meses" },
    { src: "", tekst: "4 måneder", tekst_es: "4 meses" },
    { src: "", tekst: "5 måneder", tekst_es: "5 meses" },
    { src: "", tekst: "Hvem har taget min sut?", tekst_es: "¿Quién se llevó mi chupón?" },
    { src: "", tekst: "Mandag morgen", tekst_es: "Lunes por la mañana" },
    { src: "", tekst: "Når far synger", tekst_es: "Cuando papá canta" },
    { src: "", tekst: "Helt ærligt?", tekst_es: "¿En serio?" },
    { src: "", tekst: "Klar til den store dag", tekst_es: "Listo para el gran día" },
  ],
};
