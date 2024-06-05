"use client";
import React, { FormEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Candidate, Union, VoteCenter } from "@/app/page";
import { candidates } from "@/api/getCandidates";
import { unions } from "@/api/getUnions";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export interface VoteFormData {
  candidateId: string;
  voteCenterId: string;
  votes: number;
}

interface Props {
  onSubmit: ({ candidateId, voteCenterId, votes }: VoteFormData) => void;
  loading?: boolean;
}

const AddVoteForm = ({ onSubmit, loading }: Props) => {
  const [candidate, setCandidate] = useState<string>("");
  const [union, setUnion] = useState<string>("");
  const [voteCenter, setVoteCenter] = useState<string>("");
  const [totalVotes, setTotalVotes] = useState<number>();

  const [candidatesData, setCandidatesData] = useState<Candidate[]>([]);
  const [unionsData, setUnionsData] = useState<Union[]>([]);
  const [voteCenters, setVoteCenters] = useState<VoteCenter[]>([]);

  useEffect(() => {
    candidates().then((res) => setCandidatesData(res.data));
    unions().then((uRes) => setUnionsData(uRes.data));
  }, []);

  useEffect(() => {
    const filteredData = unionsData.find((x) => x._id === union);
    if (filteredData) {
      setVoteCenters(filteredData?.voteCenters);
    }
  }, [union, unionsData]);

  async function onSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (candidate && union && voteCenter && totalVotes) {
      onSubmit({
        candidateId: candidate,
        voteCenterId: voteCenter,
        votes: totalVotes,
      });
    }
  }
  return (
    <form onSubmit={onSubmitForm}>
      <div className="flex flex-col gap-4">
        <Select
          required
          value={candidate}
          onValueChange={(e) => setCandidate(e)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a candidate" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {candidatesData.map((c) => (
                <SelectItem key={c._id} value={c._id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* union */}
        <Select required value={union} onValueChange={(e) => setUnion(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an union" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {unionsData.map((c) => (
                <SelectItem key={c._id} value={c._id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          required
          value={voteCenter}
          onValueChange={(e) => setVoteCenter(e)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select vote center" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {voteCenters.map((c) => (
                <SelectItem key={c._id} value={c._id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* Vote Centers */}
        <Input
          className="w-[180px]"
          placeholder="Total Vote"
          type="number"
          required
          value={totalVotes}
          onChange={(e) => setTotalVotes(Number(e.target.value))}
        />
      </div>
      <Button type="submit" className="mt-5" disabled={loading}>
        {loading ? "Saving data..." : "Submit"}
      </Button>
    </form>
  );
};

export default AddVoteForm;
