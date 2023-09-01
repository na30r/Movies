import { Card, List, Avatar } from "antd";
import React from "react";
import { Cast } from "../../../Models/Cast";
import { Crew } from "../../../Models/Crew";
import Link from "next/link";
interface CastListCardProps {
  data: MovieInfoCardItem[] | undefined;
  title: titleName;
}
type titleName = "Cast" | "Crew";
export interface MovieInfoCardItem {
  id: string;
  title: string;
  avatar: string;
  description: string;
}
export default function CastListCard({ data, title }: CastListCardProps) {
  return (
    <Card
      bordered={false}
      title={<h6 className="font-semibold m-0">{title}</h6>}
      className="header-solid h-full"
      bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        split={false}
        className="conversations-list"
        renderItem={(item) => (
          <List.Item
            actions={[
              <Link type="link" key={2} href={`/movies/actor/detail/${item.title}`}>
                {" view"}
              </Link>,
              //  <Button ></Button>
            ]}>
            <List.Item.Meta
              avatar={<Avatar shape="square" size={48} src={item.avatar} />}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
