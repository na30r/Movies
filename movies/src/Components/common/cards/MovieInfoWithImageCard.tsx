import { Card, Row } from "antd";
import React from "react";
import { BACK_PATH } from "../../../utils/constants";
import { MovieDetail } from "../../../Models/MovieDetail";
import { Movie } from "../../../Models/Movie";
import useGenre from "../../../Hooks/useGenre";
interface MovieInfoCardProps {
  Movie: Movie | undefined;
}
export default function MovieInfoWithImageCard({ Movie }: MovieInfoCardProps) {
  const { data } = useGenre();
  return (
    <Card
      bordered={false}
      className="card-project"
      cover={
        <div
          className="image-container "
          style={{
            backgroundImage: "url(https://placehold.co/1066x600?text=loading...)",
            minHeight: 220,
            borderRadius: 10,
          }}>
          <img className="image-content" alt="example" src={BACK_PATH + Movie?.backdrop_path} />
        </div>
      }>
      <h2> {Movie?.title}</h2>
      <div className="card-tag ">
        Genres :
        {Movie?.genre_ids.map((gid: number) => (
          <span> {data?.genres.find((a) => a.id == gid)?.name} </span>
        ))}
      </div>
      <div className="card-tag">overview : {Movie?.overview}</div>
      <div className="card-tag">language: {Movie?.original_language} </div>
      <div className="card-tag">vote_average: {Movie?.vote_average} </div>
      <div className="card-tag">{Movie?.vote_count} Vote</div>

      <Row gutter={[6, 0]} className="card-footer"></Row>
    </Card>
  );
}
