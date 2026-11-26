import { useEffect, useState } from "react";
import diaryService from "./services/diaries";
import { type DiaryEntry } from "./types";
import Diary from "./components/Diary";
import DiaryEntryForm from "./components/DiaryEntryForm";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  const handleNewDiaryEntry = async (
    date: string,
    visibility: string,
    weather: string,
    comment: string,
  ) => {
    const newEntry = await diaryService.create(
      date,
      visibility,
      weather,
      comment,
    );

    setDiaryEntries(entries => [...entries, newEntry]);
  };

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const diaryEntries = await diaryService.getAll();
      setDiaryEntries(diaryEntries);
    };
    void fetchDiaryEntries();
  }, []);

  return (
    <>
      <DiaryEntryForm onSubmit={handleNewDiaryEntry} />
      <Diary entries={diaryEntries} />
    </>
  );
}

export default App;
