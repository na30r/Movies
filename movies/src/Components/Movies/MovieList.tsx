import React, { useState } from "react";
import useMovie from "../../Hooks/useMovie";
import { Avatar, Button, Card, Col, Row } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { IMAGE_PATH, MOVIE_LIST_URL } from "../../utils/constraints";

export default function MovieList(props: number) {
  const [val, setval] = useState(props);
  var { data } = useMovie(val);
  return (
    <>
      <Button
        onClick={() => {
          setval(18);
          console.log(val);
        }}
      />
      {console.log(data)}
      <Row gutter={16}>
        {data?.map((a: any) => {
          console.log(a);
          return (
            <Col span={6} style={{ padding: 10 }}>
              <Card
                key={a.id}
                style={{ width: 300 }}
                cover={<img alt="example" src={IMAGE_PATH + a.poster_path} />}
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                  }
                  title={a.title}
                  description={a.overview}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
