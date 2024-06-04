import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

interface Prop {
  title: string;
  image: string;
}

const CandidateCard = ({ title, image }: Prop) => {
  return (
    <Card>
      <CardContent className="grid gap-4">
        <Image src={image} alt="Symbol" width={350} height={120} />
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
