import { type DiaryEntry } from "../types";

interface DiaryProps {
  entries: DiaryEntry[];
}

const Diary = ({ entries }: DiaryProps) => {
  return (
    <>
      <h2>Diary Entries</h2>
      {entries.map(entry => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <div>visibility: {entry.visibility}</div>
          <div>weather: {entry.weather}</div>
        </div>
      ))}
    </>
  );
};

export default Diary;
