interface Biography {
  aliases: Array<string>;
  alignment: string;
  'alter-egos': string;
  'first-appearance': string;
  'full-name': string;
  'place-of-birth': string;
  publisher: string;
}

export interface PowerStats {
  combat: string;
  durability: string;
  intelligence: string;
  power: string;
  speed: string;
  strength: string;
}

export interface HeroAppearance {
  'eye-color': string;
  gender: string;
  'hair-color': string;
  height: Array<string>;
  race: string;
  weight: Array<string>;
}

export interface Hero {
  appearance: HeroAppearance;
  biography: Biography;
  connections: { 'group-affiliation': string; relatives: string};
  id: number;
  image: { url: string };
  name: string;
  powerstats: PowerStats;
  response: string;
  work: { base: string; occupation: string };
}

export interface HeroResponse {
  response: string;
  results: Array<Hero>;
  'results-for': string;
  error: string;
}