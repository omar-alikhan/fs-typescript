import { useEffect, useState } from "react";
import diaryService from "./services/diaries";
import { type DiaryEntry, type NewDiaryEntry } from "./types";
import Diary from "./components/Diary";
import axios from "axios";
import DiaryEntryForm from "./components/DiaryEntryForm";

interface ValidationError {
  error: Array<{ message: string }>;
}

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNewDiaryEntry = async (entry: NewDiaryEntry) => {
    try {
      const newEntry = await diaryService.create(entry);
      setDiaryEntries(entries => [...entries, newEntry]);
      setErrorMessage(null);
    } catch (error: unknown) {
      if (axios.isAxiosError<ValidationError>(error)) {
        const messages = error.response?.data?.error?.map(
          issue => issue.message,
        );
        setErrorMessage(messages?.join(",") ?? error.message);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
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
      {errorMessage &&
        errorMessage
          .split(",")
          .map(error => <p style={{ color: "red" }}>{error}</p>)}
      <DiaryEntryForm onSubmit={handleNewDiaryEntry} />
      <Diary entries={diaryEntries} />
    </>
  );
}

export default App;
