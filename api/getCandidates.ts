import { AxiosResponse } from "axios";
import api from "@/services/api";

export const candidates = (): Promise<AxiosResponse> => {
  return api.get("/candidate");
};
