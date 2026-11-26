import axios from "axios";

import { type DiaryEntry } from "../types";

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>("/api/diaries");

  return data;
};

const create = async (
  date: string,
  visibility: string,
  weather: string,
  comment: string,
) => {
  const { data } = await axios.post<DiaryEntry>("/api/diaries", {
    date,
    visibility,
    weather,
    comment,
  });

  return data;
};

export default {
  getAll,
  create,
};
