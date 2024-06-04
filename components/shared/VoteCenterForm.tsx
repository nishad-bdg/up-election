"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { unions } from "@/api/getUnions";
import { Union } from "@/app/page";
import { createVoteCenter } from "@/api/createVoteCenter";

export interface CreateVoteCenter {
  name: string;
  unionId: string;
  totalVotes: number;
}

interface Props {
  loading: boolean;
  onSubmitFormData: ({ name, unionId, totalVotes }: CreateVoteCenter) => void;
}

const VoteCenterForm = ({ onSubmitFormData, loading }: Props) => {
  const [unionsData, setUnionsData] = useState<Union[]>([]);
  const [union, setUnion] = useState<string>("");
  const [centerName, setCenterName] = useState<string>("");
  const [totalVotes, setTotalVotes] = useState<number>();

  useEffect(() => {
    unions().then((un) => setUnionsData(un.data));
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (union && totalVotes) {
      onSubmitFormData({
        name: centerName,
        totalVotes: totalVotes,
        unionId: union,
      });
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <Select
        name="union"
        required
        value={union}
        onValueChange={(e: string) => setUnion(e)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Union" />
        </SelectTrigger>
        <SelectContent>
          {unionsData.map((x) => (
            <SelectItem key={x._id} value={x._id}>
              {x.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="text"
        className="my-4 w-[300px]"
        name="voteCenter"
        required
        placeholder="Center Name"
        value={centerName}
        onChange={(e) => setCenterName(e.target.value)}
      />

      <Input
        type="text"
        className="my-4 w-[300px]"
        name="totalVotes"
        required
        placeholder="Total Votes"
        value={totalVotes}
        onChange={(e) => setTotalVotes(Number(e.target.value))}
      />
      <Button type="submit" disabled={loading ? true : false}>
        {loading ? "working...." : "Submit"}
      </Button>
    </form>
  );
};

export default VoteCenterForm;
