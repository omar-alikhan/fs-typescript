import { z } from "zod";

export const Weather = {
  Sunny: "sunny",
  Rainy: "rainy",
  Cloudy: "cloudy",
  Stormy: "stormy",
  Windy: "windy",
} as const;

export type Weather = (typeof Weather)[keyof typeof Weather];

const weatherValues: string[] = Object.values(Weather);

export function isWeather(value: string): value is Weather {
  return weatherValues.includes(value);
}

export const Visibility = {
  Great: "great",
  Good: "good",
  Ok: "ok",
  Poor: "poor",
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];

const visibilityValues: string[] = Object.values(Visibility);

export function isVisibility(value: string): value is Visibility {
  return visibilityValues.includes(value);
}

export const NewEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.iso.date(),
  comment: z.string().optional(),
});

export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
