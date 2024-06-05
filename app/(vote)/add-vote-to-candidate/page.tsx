"use client";
import { candidates } from "@/api/getCandidates";
import { postVote } from "@/api/postVotes";
import { voteCounter as fetchVotes } from "@/api/voteCounter";
import { Candidate, VoteCounter } from "@/app/page";
import AddVoteForm, { VoteFormData } from "@/components/shared/AddVoteForm";
import { VoteTable } from "@/components/shared/VoteTable";
import React, { useEffect, useState } from "react";

const AddVoteToCandidate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [countVotes, setCountVotes] = useState<VoteCounter[]>([]);
  const [candidatesData, setCandidatesData] = useState<Candidate[]>([]);

  const fetchVoteData = (): void => {
    fetchVotes().then((res) => {
      setCountVotes(res.data);
    });
  };
  const onSubmit = (data: VoteFormData) => {
    setLoading(true);
    postVote(data)
      .then((res) => {
        alert("Vote added successfully");
        fetchVoteData();
      })
      .catch((error) => {
        console.error(error);
        alert("Error saving data");
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchVoteData();
    candidates().then((res) => setCandidatesData(res.data));
  }, []);
  return (
    <div className="flex flex-col space-y-8">
      <AddVoteForm onSubmit={onSubmit} loading={loading} />
      <h1>Entries</h1>
      <VoteTable votes={countVotes} candidates={candidatesData} />
    </div>
  );
};

export default AddVoteToCandidate;
