import React from "react";
import { Logo, Poster, backdrop } from "../../../Models/Backdrop";
import { Card, Row } from "antd";
import { BACK_PATH } from "../../../utils/constants";

interface ImageCardProps {
  Image: backdrop | Poster | Logo;
  MinHeight?: number;
}

export default function ImageCard({ Image, MinHeight = 220 }: ImageCardProps) {
  return (
    <Card
      bordered={false}
      className="card-project"
      cover={
        <div
          className="image-container "
          style={{
            backgroundImage: "url(https://placehold.co/1066x600?text=loading...)",
            minHeight: MinHeight,
            borderRadius: 10,
          }}>
          <img className="image-content" alt="example" src={BACK_PATH + Image.file_path} />
        </div>
      }>
      <div className="card-tag">{Image.vote_count} Vote</div>
      <Row gutter={[6, 0]} className="card-footer"></Row>
    </Card>
  );
}
