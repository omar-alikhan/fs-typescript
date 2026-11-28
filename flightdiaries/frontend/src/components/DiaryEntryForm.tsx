import { useState, type SyntheticEvent } from "react";
import {
  Visibility,
  Weather,
  type NewDiaryEntry,
  isVisibility,
  isWeather,
} from "../types";

interface DiaryEntryFormProps {
  onSubmit: (entry: NewDiaryEntry) => void;
}

const DiaryEntryForm = ({ onSubmit }: DiaryEntryFormProps) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState<string>("");

  const addDiaryEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({ date, visibility, weather, comment });
    setDate("");
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment("");
  };
  return (
    <>
      <h2>Add new diary entry</h2>
      <form onSubmit={addDiaryEntry}>
        <div>
          <label>
            date:
            <input
              type="date"
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </label>
        </div>
        <div>
          <div style={{ display: "inline-block" }}>visibility&nbsp;</div>
          {Object.values(Visibility).map(option => (
            <label key={option}>
              {option}
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={() => {
                  if (isVisibility(option)) setVisibility(option);
                }}
                required
              />
            </label>
          ))}
        </div>
        <div>
          <div style={{ display: "inline-block" }}>weather&nbsp;</div>
          {Object.values(Weather).map(option => (
            <label key={option}>
              {option}
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={() => {
                  if (isWeather(option)) setWeather(option);
                }}
                required
              />
            </label>
          ))}
        </div>
        <div>
          <label>
            comment
            <input
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default DiaryEntryForm;
