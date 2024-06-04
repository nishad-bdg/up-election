import { AxiosResponse } from "axios";
import api from "@/services/api";

export const voteCounter = (): Promise<AxiosResponse> => {
  return api.get("/vote-counter");
};
