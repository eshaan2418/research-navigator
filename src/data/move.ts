import slide01 from "@/assets/slides/page-01.jpg";
import slide02 from "@/assets/slides/page-02.jpg";
import slide03 from "@/assets/slides/page-03.jpg";
import slide04 from "@/assets/slides/page-04.jpg";
import slide05 from "@/assets/slides/page-05.jpg";
import slide06 from "@/assets/slides/page-06.jpg";
import slide07 from "@/assets/slides/page-07.jpg";
import slide08 from "@/assets/slides/page-08.jpg";
import slide09 from "@/assets/slides/page-09.jpg";
import slide10 from "@/assets/slides/page-10.jpg";
import slide11 from "@/assets/slides/page-11.jpg";
import slide12 from "@/assets/slides/page-12.jpg";
import slide13 from "@/assets/slides/page-13.jpg";
import slide14 from "@/assets/slides/page-14.jpg";
import slide15 from "@/assets/slides/page-15.jpg";
import slide16 from "@/assets/slides/page-16.jpg";
import slide17 from "@/assets/slides/page-17.jpg";
import slide18 from "@/assets/slides/page-18.jpg";

export type ThemeId = "autonomous" | "sustainable" | "analytics" | "iot" | "arvr";

export type Theme = {
  id: ThemeId;
  name: string;
  short: string;
  colorVar: string; // CSS var name
};

export const DEFAULT_THEMES: Theme[] = [
  { id: "autonomous", name: "Autonomous Mobility", short: "Autonomous", colorVar: "--theme-1" },
  { id: "sustainable", name: "Sustainable Mobility", short: "Sustainable", colorVar: "--theme-2" },
  { id: "analytics", name: "Mobility Analytics", short: "Analytics", colorVar: "--theme-3" },
  { id: "iot", name: "IoT, Shared & Connected Mobility", short: "IoT & Connected", colorVar: "--theme-4" },
  { id: "arvr", name: "AR/VR Mobility", short: "AR / VR", colorVar: "--theme-5" },
];

export const DEFAULT_TAGLINE = "MOBILITY · INNOVATION · ANALYTICS · CONNECTED · SUSTAINABLE";
export const DEFAULT_HUB = "MOVE";

export type Faculty = {
  id: string;
  first: string;
  last: string;
  title: string;
  department: string;
  email: string;
  themes: ThemeId[]; // primary, secondary
  slide?: string;
};

export const FACULTY: Faculty[] = [
  {
    id: "bisnath",
    first: "Sunil",
    last: "Bisnath",
    title: "Professor, Interim MOVE Director",
    department: "Earth & Space Science Engineering",
    email: "sbisnath@yorku.ca",
    themes: ["iot", "sustainable"],
    slide: slide01,
  },
  {
    id: "sohn",
    first: "Gunho",
    last: "Sohn",
    title: "Professor, MOVE Director",
    department: "Earth & Space Science Engineering",
    email: "gsohn@yorku.ca",
    themes: ["sustainable", "autonomous"],
    slide: slide16,
  },
  {
    id: "park",
    first: "Peter",
    last: "Park",
    title: "Professor, Associate Dean of Research",
    department: "Civil Engineering",
    email: "peter.park@lassonde.yorku.ca",
    themes: ["analytics", "sustainable"],
    slide: slide14,
  },
  {
    id: "an",
    first: "Aijun",
    last: "An",
    title: "Professor",
    department: "Electrical Engineering & Computer Science",
    email: "aan@yorku.ca",
    themes: ["iot", "analytics"],
  },
  {
    id: "armenakis",
    first: "Costas",
    last: "Armenakis",
    title: "Professor",
    department: "Earth & Space Science Engineering",
    email: "armenc@yorku.ca",
    themes: ["sustainable", "analytics"],
  },
  {
    id: "farag",
    first: "Hany",
    last: "Farag",
    title: "Professor, Director Smart Grid Lab",
    department: "Electrical Engineering & Computer Science",
    email: "hefarag@yorku.ca",
    themes: ["sustainable"],
    slide: slide05,
  },
  {
    id: "tabassum",
    first: "Hina",
    last: "Tabassum",
    title: "Professor",
    department: "Electrical Engineering & Computer Science",
    email: "hina.tabassum@lassonde.yorku.ca",
    themes: ["iot"],
    slide: slide17,
  },
  {
    id: "elder",
    first: "James",
    last: "Elder",
    title: "Professor",
    department: "Electrical Engineering & Computer Science",
    email: "jelder@yorku.ca",
    themes: ["arvr", "analytics"],
    slide: slide03,
  },
  {
    id: "shan",
    first: "Jinjun",
    last: "Shan",
    title: "Professor",
    department: "Earth & Space Science Engineering",
    email: "jjshan@yorku.ca",
    themes: ["autonomous", "sustainable"],
  },
  {
    id: "gingerich",
    first: "Kevin",
    last: "Gingerich",
    title: "Professor",
    department: "Civil Engineering",
    email: "kging@yorku.ca",
    themes: ["analytics", "sustainable"],
    slide: slide06,
  },
  {
    id: "butler",
    first: "Liam",
    last: "Butler",
    title: "Associate Professor, Director CD3 Facility",
    department: "Civil Engineering",
    email: "liam.butler@lassonde.yorku.ca",
    themes: ["sustainable", "arvr"],
    slide: slide02,
  },
  {
    id: "papagelis",
    first: "Manos",
    last: "Papagelis",
    title: "Professor",
    department: "Electrical Engineering & Computer Science",
    email: "papaggel@yorku.ca",
    themes: ["analytics", "arvr"],
    slide: slide13,
  },
  {
    id: "kyan",
    first: "Matthew",
    last: "Kyan",
    title: "Professor",
    department: "Electrical Engineering & Computer Science",
    email: "mkyan@yorku.ca",
    themes: ["arvr"],
    slide: slide10,
  },
  {
    id: "nourinejad",
    first: "Mehdi",
    last: "Nourinejad",
    title: "Professor",
    department: "Civil Engineering",
    email: "mehdi.nourinejad@lassonde.yorku.ca",
    themes: ["analytics", "sustainable"],
    slide: slide12,
  },
  {
    id: "jadidi",
    first: "Mojgan",
    last: "Jadidi",
    title: "Professor",
    department: "Civil Engineering",
    email: "mjadidi@yorku.ca",
    themes: ["analytics", "arvr"],
    slide: slide07,
  },
  {
    id: "faloutsos",
    first: "Petros",
    last: "Faloutsos",
    title: "Professor",
    department: "Electrical Engineering & Computer Science",
    email: "pfal@yorku.ca",
    themes: ["arvr"],
    slide: slide04,
  },
  {
    id: "wang",
    first: "Ping",
    last: "Wang",
    title: "Professor",
    department: "Electrical Engineering & Computer Science",
    email: "ping.wang@lassonde.yorku.ca",
    themes: ["iot"],
    slide: slide18,
  },
  {
    id: "lee",
    first: "Regina",
    last: "Lee",
    title: "Professor",
    department: "Earth & Space Science Engineering",
    email: "reginal@yorku.ca",
    themes: ["sustainable"],
  },
  {
    id: "shvartz",
    first: "Yan",
    last: "Shvartzshnaider",
    title: "Professor",
    department: "Electrical Engineering & Computer Science",
    email: "yansh@yorku.ca",
    themes: ["iot"],
    slide: slide15,
  },
  {
    id: "jiang",
    first: "Zhen Ming",
    last: "Jiang",
    title: "Associate Professor & York Research Chair",
    department: "Electrical Engineering & Computer Science",
    email: "zmjiang@yorku.ca",
    themes: ["iot"],
    slide: slide08,
  },
  {
    id: "kuang",
    first: "Emily",
    last: "Kuang",
    title: "Assistant Professor",
    department: "Electrical Engineering & Computer Science",
    email: "ekuang@yorku.ca",
    themes: ["iot"],
    slide: slide09,
  },
  {
    id: "mahajan",
    first: "Shweta",
    last: "Mahajan",
    title: "Professor",
    department: "Electrical Engineering & Computer Science",
    email: "shwemaha@yorku.ca",
    themes: ["iot"],
    slide: slide11,
  },
  {
    id: "bazzocchi",
    first: "Michael",
    last: "Bazzocchi",
    title: "Professor",
    department: "Earth & Space Science Engineering",
    email: "mbazz@yorku.ca",
    themes: ["sustainable"],
  },
];
