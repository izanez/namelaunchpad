const roots = [
  "Nova",
  "Viper",
  "Pulse",
  "Strike",
  "Kaoro",
  "Rider",
  "Echo",
  "Drift",
  "Aero",
  "Rush",
  "Frost",
  "Shadow",
  "Neon",
  "Cipher",
  "Glitch",
  "Luna",
  "Raze",
  "Clutch",
  "Rogue",
  "Flux",
];

const suffixes = [
  "Core",
  "Sync",
  "Wolf",
  "Vex",
  "Blade",
  "Shift",
  "Grid",
  "Storm",
  "Ghost",
  "Lock",
  "Byte",
  "Prime",
  "Spark",
  "Trace",
  "Zone",
];

function dayIndex(date: Date) {
  return Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86400000);
}

export function getDailyTopNames(date = new Date()) {
  const index = dayIndex(date);
  const names: string[] = [];

  for (let i = 0; i < 25; i += 1) {
    const left = roots[(index + i * 3) % roots.length];
    const right = suffixes[(index + i * 5) % suffixes.length];
    names.push(`${left}${right}`);
  }

  return {
    dateLabel: date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    slugDate: date.toISOString().slice(0, 10),
    names,
  };
}
