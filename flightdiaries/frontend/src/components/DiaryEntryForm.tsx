import { useState, type SyntheticEvent } from "react";

interface DiaryEntryFormProps {
  onSubmit: (
    date: string,
    visibility: string,
    weather: string,
    comment: string,
  ) => void;
}

const DiaryEntryForm = ({ onSubmit }: DiaryEntryFormProps) => {
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const addDiaryEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit(date, visibility, weather, comment);
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };
  return (
    <>
      <h2>Add new diary entry</h2>
      <form onSubmit={addDiaryEntry}>
        <div>
          <label>
            date
            <input
              type="text"
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            visibility
            <input
              type="text"
              value={visibility}
              onChange={({ target }) => setVisibility(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            weather
            <input
              type="text"
              value={weather}
              onChange={({ target }) => setWeather(target.value)}
            />
          </label>
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
