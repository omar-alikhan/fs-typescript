import axios from "axios";

import { type DiaryEntry, type NewDiaryEntry } from "../types";

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>("/api/diaries");

  return data;
};

const create = async (entry: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>("/api/diaries", entry);

  return data;
};

export default {
  getAll,
  create,
};
