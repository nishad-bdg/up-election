import { Candidate, VoteCounter } from "@/app/page";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  votes: VoteCounter[];
  candidates: Candidate[];
}

export function VoteTable({ votes, candidates }: Props) {
  const getCandidateName = (candidateId: string) => {
    const result = candidates.find((x) => x._id === candidateId);
    return result?.name;
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Center Name</TableHead>
          <TableHead>Candidate Name</TableHead>
          <TableHead>Votes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {votes.map((vote) => (
          <TableRow key={vote._id}>
            <TableCell className="font-medium">
              {vote.voteCenter.name}
            </TableCell>
            <TableCell className="font-medium">
              {getCandidateName(vote.candidate)}
            </TableCell>
            <TableCell className="font-medium">{vote.votes}</TableCell>
            <TableCell className="font-medium">Edit</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
