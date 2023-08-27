import React from "react";
import { Person } from "../../../Models/Person";
import { Card } from "antd";

interface ActorInfoProps {
  Person: Person | undefined;
}
export default function ActorInfoCard({ Person }: ActorInfoProps) {
  return (
    <Card
      bordered={false}
      title={<h6 className="font-semibold m-0">Profile Information</h6>}
      className="header-solid h-full card-profile-information"
      // extra={<Button type="link">{pencil}</Button>}
      bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}>
      <p className="text-dark"> {Person?.name}. </p>
      <p className="text-dark">Gender: {Person?.gender}</p>
      <p className="text-dark">known for : {Person?.known_for_department}.</p>
      <p className="text-dark">Popularity : {Person?.popularity}.</p>
      <hr className="my-25" />
    </Card>
  );
}
