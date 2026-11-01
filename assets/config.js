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
  svarFrist: "15. december",
  oenskesky: "https://onskeskyen.dk/s/exfm9p",

  // Lyd (0 = slukket, 1 = fuld styrke)
  lydstyrke: 0.15,

  // Billederne under "Lidt om mig" i den rækkefølge, de vises. Filerne ligger i img/.
  // tekst er den danske billedtekst, tekst_es den spanske.
  billeder: [
    { src: "img/01.jpg", tekst: "Velkommen til verden", tekst_es: "Bienvenido al mundo" },
    { src: "img/02.jpg", tekst: "Mit første døgn", tekst_es: "Mis primeras 24 horas" },
    { src: "img/03.jpg", tekst: "Når jeg gør mig til", tekst_es: "Cuando me hago el lindo" },
    { src: "img/04.jpg", tekst: "Når det er hundekoldt", tekst_es: "Cuando hace un frío que pela" },
    { src: "img/05.jpg", tekst: "Når jeg hygger med mor og far", tekst_es: "Cuando mamá y papá me engríen" },
    { src: "img/06.jpg", tekst: "Når jeg får lov til at sove på far", tekst_es: "Cuando me dejan dormir sobre papá" },
    { src: "img/07.jpg", tekst: "Når jeg får lov til at sove på mor", tekst_es: "Cuando me dejan dormir sobre mamá" },
    { src: "img/08.jpg", tekst: "Når jeg gemmer mig", tekst_es: "Cuando me escondo" },
    { src: "img/09.jpg", tekst: "Mit første bad", tekst_es: "Mi primer baño" },
    { src: "img/10.jpg", tekst: "Min første tur i vikle", tekst_es: "Mi primer paseo en portabebé" },
    { src: "img/11.jpg", tekst: "Tvangsfodring hos far", tekst_es: "Cuando papá me hace comer a la fuerza" },
    { src: "img/12.jpg", tekst: "Mælkekoma hos mor", tekst_es: "En coma de leche con mamá" },
    { src: "img/13.jpg", tekst: "Når jeg bare vil have mere mælk", tekst_es: "Cuando solo quiero más leche" },
    { src: "img/14.jpg", tekst: "Når far hjælper mig med at bøvse", tekst_es: "Cuando papá me ayuda a eructar" },
    { src: "img/15.jpg", tekst: "Når mor hjælper mig med at bøvse", tekst_es: "Cuando mamá me ayuda a eructar" },
    { src: "img/16.jpg", tekst: "Når mor og far tvinger mig til fællesbillede", tekst_es: "Cuando mamá y papá me obligan a salir en la foto familiar" },
    { src: "img/17.jpg", tekst: "Mig med oldemors hjemmestrik", tekst_es: "Yo con lo que me tejió mi bisabuela" },
    { src: "img/18.jpg", tekst: "Når alt er cool", tekst_es: "Cuando todo está chévere" },
    { src: "img/19.jpg", tekst: "Med far på \"job\"", tekst_es: "Con papá en el \"trabajo\"" },
    { src: "img/20.jpg", tekst: "Min første tur på café", tekst_es: "Mi primera salida a un café" },
    { src: "img/21.jpg", tekst: "Så glad ser jeg ud når I kommer til min barnedåb", tekst_es: "Así de feliz estaré cuando vengan a mi bautizo" },
  ],
};
