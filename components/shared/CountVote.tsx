import { Candidate, VoteCounter } from "@/app/page";
import Image from "next/image";
import React from "react";
interface Props {
  candidates: Candidate[];
  votes: VoteCounter[];
}
const CountVote = ({ candidates, votes }: Props) => {
  const calculateTotalVotes = (objects: VoteCounter[]) => {
    // Use the reduce method to accumulate the sum of votes
    return objects.reduce((total, obj) => {
      // Add the votes property of the current object to the total
      return total + (obj.votes || 0); // Default to 0 if votes is undefined or null
    }, 0); // Initial total value is 0
  };
  const grandTotal = (candidateId: string) => {
    const result = votes.filter((x) => x.candidate === candidateId);
    return calculateTotalVotes(result);
  };
  return (
    <div className="flex items-center gap-2 lg:gap-8">
      {candidates.map((x) => (
        <>
          <Image
            src={x.symbolUrl}
            alt="symbol"
            width={150}
            height={150}
            key={x._id}
          />

          <p className="text-lg lg:text-3xl">{grandTotal(x._id)}</p>
        </>
      ))}
    </div>
  );
};

export default CountVote;
