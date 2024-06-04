import { AxiosResponse } from "axios";
import api from "@/services/api";

export const unions = (): Promise<AxiosResponse> => {
  return api.get("/candidate/unions");
};