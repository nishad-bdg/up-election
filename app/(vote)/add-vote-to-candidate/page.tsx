"use client";
import { postVote } from "@/api/postVotes";
import AddVoteForm, { VoteFormData } from "@/components/shared/AddVoteForm";
import React, { useState } from "react";

const AddVoteToCandidate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = (data: VoteFormData) => {
    setLoading(true);
    postVote(data)
      .then((res) => alert('Vote added successfully'))
      .catch((error) => {
        console.error(error);
        alert('Error saving data')
      });
  };
  return (
    <div>
      <AddVoteForm onSubmit={onSubmit} loading />
    </div>
  );
};

export default AddVoteToCandidate;
