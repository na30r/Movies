import { Card, Row, Col, Avatar, Button, Radio } from "antd";
import { heart, outlineHeart, yellowPlus, plus } from "../../assets/svg-files";
import { removeMovieFavorite, addMovieFavorite, removeWatchLater, addWatchLater } from "../../redux/Profile";
import { BACK_PATH } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { MovieDetail } from "../../Models/MovieDetail";

interface MovieDetailHeaderProps {
  MovieDetail: MovieDetail | undefined;
}
export default function MovieDetailHeader({ MovieDetail }: MovieDetailHeaderProps) {
  const dispatch = useDispatch();
  const userMoviesSelector = useSelector((a: any) => a.Profile);
  return (
    <>
      <div
        className="profile-nav-bg"
        style={{
          backgroundImage: "url(" + BACK_PATH + MovieDetail?.backdrop_path + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 500,
        }}></div>
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Row>
                  <Col lg={12}>
                    <Avatar size={90} shape="square" src={BACK_PATH + MovieDetail?.poster_path} />
                  </Col>
                  <Col lg={12}>
                    <div className="avatar-info">
                      <h4 className="font-semibold m-0">{MovieDetail?.title}</h4> <p>{MovieDetail?.tagline}</p>
                      {userMoviesSelector.favorite.some((a: any) => a.id == MovieDetail?.id) ? (
                        <Button type="link" onClick={() => dispatch(removeMovieFavorite(MovieDetail))}>
                          {heart()}
                        </Button>
                      ) : (
                        <Button type="link" onClick={() => dispatch(addMovieFavorite(MovieDetail))}>
                          {outlineHeart()}
                        </Button>
                      )}
                      {userMoviesSelector.watchLater.some((a: any) => a.id == MovieDetail?.id) ? (
                        <Button type="link" onClick={() => dispatch(removeWatchLater(MovieDetail))}>
                          {yellowPlus()}
                        </Button>
                      ) : (
                        <Button type="link" onClick={() => dispatch(addWatchLater(MovieDetail))}>
                          {plus()}
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}>
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">OVERVIEW</Radio.Button>
                <Radio.Button value="b">TEAMS</Radio.Button>
                <Radio.Button value="c">PROJECTS</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        }></Card>
    </>
  );
}
