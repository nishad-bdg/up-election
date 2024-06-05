import { Candidate, VoteCenter, VoteCounter } from "@/app/page";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

interface Props {
  candidates: Candidate[];
  voteCenters: VoteCenter[];
  voteCounter: VoteCounter[];
  unionId: string;
}

const TableData = ({
  candidates,
  voteCenters,
  voteCounter,
  unionId,
}: Props) => {
  const countVoteData = (candidateId: string, centerId: string) => {
    const result = voteCounter.find(
      (x) => x.candidate === candidateId && x.voteCenter._id === centerId
    );
    if (result) {
      return result.votes;
    }
    return 0;
  };

  const subTotal = (candidateId: string, unionId: string) => {
    const result = voteCounter.filter(
      (x) => x.candidate === candidateId && x.voteCenter.union === unionId
    );

    const total = result.reduce((total, vote) => total + vote.votes, 0);

    return total;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">কেন্দ্রের নাম</TableHead>
          {candidates.map((c) => (
            <TableHead key={c._id}>
              <Image src={c.symbolUrl} alt="symbol" width={120} height={120} />
            </TableHead>
          ))}

          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {voteCenters.map((center, index) => (
          <TableRow key={center._id}>
            <TableCell className="font-medium lg:w-[500px]">
              {center.name}
            </TableCell>

            {candidates.map((can) => (
              <TableCell key={can._id}>
                {countVoteData(can._id, center._id)}
              </TableCell>
            ))}

            <TableCell className="text-right">{center.totalVotes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>মোট</TableCell>
          {candidates.map((can, index) => (
            <TableCell key={can._id + index}>
              {subTotal(can._id, unionId)}
            </TableCell>
          ))}
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TableData;
