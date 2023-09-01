import React from "react";

import { Card, Row, Image } from "antd";
import { Logo, Poster, backdrop } from "@/Models/Backdrop";
import { BACK_PATH } from "@/utils/constants";

interface ImageCardProps {
  Image: backdrop | Poster | Logo;
  MinHeight?: number;
}

export default function ImageCard({ Image: img, MinHeight = 220 }: ImageCardProps) {
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
          <Image className="image-content" alt="example" src={BACK_PATH + img.file_path} />
        </div>
      }>
      <div className="card-tag">{img.vote_count} Vote</div>
      <Row gutter={[6, 0]} className="card-footer"></Row>
    </Card>
  );
}
