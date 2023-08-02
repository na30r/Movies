import React, { useState } from "react";
import useMovie from "../../Hooks/useMovie";
import { Avatar, Button, Card, Col, Row } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { IMAGE_PATH, MOVIE_LIST_URL } from "../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { themoviedbApi } from "../../utils/request";

export default function Movies() {
  const { categoryId } = useParams();
  console.log(categoryId);
  var { data } = useMovie(Number(categoryId));
  const navigate = useNavigate();

  return (
    <>
      <Button
        onClick={() => {
          console.log(categoryId);
        }}
      />
      <Row gutter={16}>
        {data?.map((a: any) => {
          console.log(a);
          return (
            <Col key={a.id} lg={8} xl={6} sm={12} style={{ padding: 10 }}>
              <Card
                key={a.id}
                style={{ width: 300 }}
                cover={<img alt="example" src={IMAGE_PATH + a.poster_path} />}
                actions={[
                  <SettingOutlined
                    onClick={() => navigate(`/movies/detail/${a.id}`)}
                    key="setting"
                  />,
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
