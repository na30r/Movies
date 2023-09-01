import MovieDetailHeader from "@/Components/common/MovieDetailHeader";
import CastListCard from "@/Components/common/cards/CastListCard";
import ImageCard from "@/Components/common/cards/ImageCard";
import MovieInfoCard from "@/Components/common/cards/MovieInfoCard";
import useCredits from "@/Hooks/useCredits";
import useMovieDetail from "@/Hooks/useMovieDetail";
import useMovieImages from "@/Hooks/useMovieImages";
import { Spin, Row, Col, Card } from "antd";
import { useRouter } from "next/router";
import React from "react";

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: moviedata, isLoading } = useMovieDetail(Number(id));
  const { data: creditsData, isLoading: creditsIsLoading } = useCredits(Number(id));
  const { data: movieImagesData, isLoading: movieImagesIsLoading } = useMovieImages(Number(id));

  return (
    <Spin spinning={isLoading || creditsIsLoading || movieImagesIsLoading} size="large">
      <MovieDetailHeader MovieDetail={moviedata} />
      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24">
          <MovieInfoCard movie={moviedata} />
        </Col>
        <Col span={24} md={8} className="mb-24">
          <CastListCard data={creditsData?.cast} title={"Cast"} />
        </Col>
        <Col span={24} md={8} className="mb-24">
          <CastListCard data={creditsData?.crew} title={"Crew"} />
        </Col>
      </Row>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">{moviedata?.title} Backdrops</h6>
          </>
        }>
        <Row gutter={[24, 24]}>
          {movieImagesData?.backdrops.slice(0, 12).map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <ImageCard Image={p} />
            </Col>
          ))}
        </Row>
      </Card>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">{moviedata?.title} Posters</h6>
          </>
        }>
        <Row gutter={[24, 24]}>
          {movieImagesData?.posters.slice(0, 8).map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <ImageCard Image={p} />
            </Col>
          ))}
        </Row>
      </Card>
    </Spin>
  );
}
