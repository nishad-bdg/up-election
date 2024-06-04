"use client";
import { createVoteCenter } from "@/api/createVoteCenter";
import { unions } from "@/api/getUnions";
import { Union } from "@/app/page";
import VoteCenterForm, {
  CreateVoteCenter,
} from "@/components/shared/VoteCenterForm";
import VoteCenterTable from "@/components/shared/VoteCenterTable";
import React, { useEffect, useState } from "react";

const VoteCenter = () => {
  const [unionsData, setUnionsData] = useState<Union[]>([]);
  const fetchUnionData = () => {
    unions().then((u) => {
      setUnionsData(u.data);
    });
  };
  useEffect(() => {
    fetchUnionData();
  }, []);

  const onSubmit = (data: CreateVoteCenter) => {
    createVoteCenter(data)
      .then((res) => {
        if (res) {
          alert("Successfully created");
          fetchUnionData();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container flex flex-col gap-12">
      <VoteCenterForm onSubmitFormData={onSubmit} />
      {unionsData.map((union, index) => (
        <>
          <h1>{union.name}</h1>
          <VoteCenterTable key={union._id} voteCenters={union.voteCenters} />
        </>
      ))}
    </div>
  );
};

export default VoteCenter;
