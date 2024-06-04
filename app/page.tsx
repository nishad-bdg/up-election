"use client";
import { candidates } from "@/api/getCandidates";
import { unions } from "@/api/getUnions";
import { voteCounter } from "@/api/voteCounter";
import TableData from "@/components/shared/TableData";
import { useEffect, useState } from "react";

export interface Candidate {
  _id: string;
  name: string;
  symbolUrl: string;
  unions: Union[];
}

export interface VoteCenter {
  _id: string;
  name: string;
  totalVotes: number;
  union: string;
  voteCounters: [];
}

export interface VoteCounter {
  votes: number;
  candidate: string;
  voteCenter: VoteCenter;
  _id: string;
}

export interface Union {
  _id: string;
  name: string;
  candidates: string[];
  voteCenters: VoteCenter[];
  __v: number;
}

export default function Home() {
  const [candidatesData, setCandidatesData] = useState<Candidate[]>([]);
  const [unionsData, setUnionsData] = useState<Union[]>([]);

  const [countVote, setCountVote] = useState([]);

  useEffect(() => {
    candidates().then((r) => {
      setCandidatesData(r.data);
    });
    unions().then((u) => {
      setUnionsData(u.data);
    });

    voteCounter().then((v) => {
      setCountVote(v.data);
    });
  }, []);
  return (
    <main className="flex min-h-screen flex-col justify-between p-4 lg:p-24">
      <section className="flex flex-col justify-between space-y-2 gap-2">
        {unionsData.map((union, index) => (
          <>
            <h1>
              {" "}
              {index + 1}. {union.name}
            </h1>
            <TableData
              key={union._id}
              candidates={candidatesData}
              voteCenters={union.voteCenters}
              voteCounter={countVote}
              unionId={union._id}
            />
          </>
        ))}
      </section>
    </main>
  );
}
