import { useEffect, useState } from "react";
import diaryService from "./services/diaries";
import { type DiaryEntry } from "./types";
import Diary from "./components/Diary";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const diaryEntries = await diaryService.getAll();
      setDiaryEntries(diaryEntries);
    };
    void fetchDiaryEntries();
  }, []);

  return (
    <>
      <Diary entries={diaryEntries} />
    </>
  );
}

export default App;
