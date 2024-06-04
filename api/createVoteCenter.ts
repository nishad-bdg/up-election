import { AxiosResponse } from "axios";
import api from "@/services/api";
import { CreateVoteCenter } from "@/components/shared/VoteCenterForm";

export const createVoteCenter = (data: CreateVoteCenter): Promise<AxiosResponse> => {
  return api.post("/votecenter", data);
};
