import { AxiosResponse } from "axios";
import api from "@/services/api";
import { VoteFormData } from "@/components/shared/AddVoteForm";


export const postVote = (data: VoteFormData): Promise<AxiosResponse> => {
  return api.post("/vote-counter", data);
};
