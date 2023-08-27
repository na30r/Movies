import { Row, Col, Card, Spin } from "antd";
import { useParams } from "react-router-dom";
import useMovieDetail from "../../../Hooks/useMovieDetail";
import useCredits from "../../../Hooks/useCredits";
import useMovieImages from "../../../Hooks/useMovieImages";
import MovieInfoCard from "../../common/cards/MovieInfoCard";
import CastListCard from "../../common/cards/CastListCard";
import ImageCard from "../../common/cards/ImageCard";
import MovieDetailHeader from "../../common/MovieDetailHeader";

function Detail() {
  const { movieId } = useParams();
  const { data: moviedata, isLoading } = useMovieDetail(Number(movieId));
  const { data: creditsData, isLoading: creditsIsLoading } = useCredits(Number(movieId));
  const { data: movieImagesData, isLoading: movieImagesIsLoading } = useMovieImages(Number(movieId));

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

export default Detail;
