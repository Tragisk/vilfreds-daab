// Fælles indstillinger for Vilfreds dåbsinvitation.
// Ret tekster, billeder og valgt version her.
window.DAAB = {
  // Hvilken version gæsterne sendes til fra hovedlinket: "klassisk", "farverig" eller null (vis valg)
  valgtVersion: null,

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
  // Er src tom, vises en pladsholder.
  billeder: [
    { src: "", tekst: "1 måned" },
    { src: "", tekst: "2 måneder" },
    { src: "", tekst: "3 måneder" },
    { src: "", tekst: "4 måneder" },
    { src: "", tekst: "5 måneder" },
    { src: "", tekst: "Hvem har taget min sut?" },
    { src: "", tekst: "Mandag morgen" },
    { src: "", tekst: "Når far synger" },
    { src: "", tekst: "Helt ærligt?" },
    { src: "", tekst: "Klar til den store dag" },
  ],
};
