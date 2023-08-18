import { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Spin,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { BACK_PATH, IMAGE_PATH } from "../../utils/constants";
import useMovieDetail from "../../Hooks/useMovieDetail";
import useCredits from "../../Hooks/useCredits";
import useMovieImages from "../../Hooks/useMovieImages";
import {
  pencil,
  heart,
  outlineHeart,
  plus,
  yellowPlus,
} from "../../assets/svg-files";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovieFavorite,
  addWatchLater,
  removeMovieFavorite,
  removeWatchLater,
} from "../../redux/Profile";
function Detail() {
  const { movieId } = useParams();
  //console.log(movieId);
  const { data, isLoading } = useMovieDetail(Number(movieId));
  const { data: creditsData, isLoading: creditsIsLoading } = useCredits(
    Number(movieId)
  );
  const { data: movieImagesData, isLoading: movieImagesIsLoading } =
    useMovieImages(Number(movieId));

  const dispatch = useDispatch();
  const userMoviesSelector = useSelector((a: any) => a.Profile);
  return (
    <Spin
      spinning={isLoading || creditsIsLoading || movieImagesIsLoading}
      size="large"
    >
      <div
        className="profile-nav-bg"
        style={{
          backgroundImage: "url(" + BACK_PATH + data?.backdrop_path + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 500,
        }}
      ></div>
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Row>
                  <Col lg={12}>
                    <Avatar
                      size={90}
                      shape="square"
                      src={BACK_PATH + data?.poster_path}
                    />
                  </Col>
                  <Col lg={12}>
                    <div className="avatar-info">
                      <h4 className="font-semibold m-0">{data?.title}</h4>{" "}
                      <p>{data?.tagline}</p>
                      {userMoviesSelector.favorite.some(
                        (a: any) => a.id == data?.id
                      ) ? (
                        <Button
                          type="link"
                          onClick={() => dispatch(removeMovieFavorite(data))}
                        >
                          {heart()}
                        </Button>
                      ) : (
                        <Button
                          type="link"
                          onClick={() => dispatch(addMovieFavorite(data))}
                        >
                          {outlineHeart()}
                        </Button>
                      )}
                      {userMoviesSelector.watchLater.some(
                        (a: any) => a.id == data?.id
                      ) ? (
                        <Button
                          type="link"
                          onClick={() => dispatch(removeWatchLater(data))}
                        >
                          {yellowPlus()}
                        </Button>
                      ) : (
                        <Button
                          type="link"
                          onClick={() => dispatch(addWatchLater(data))}
                        >
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
              }}
            >
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">OVERVIEW</Radio.Button>
                <Radio.Button value="b">TEAMS</Radio.Button>
                <Radio.Button value="c">PROJECTS</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link">{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark"> {data?.overview}. </p>
            <hr className="my-25" />
            <Descriptions title="Oliver Liam">
              <Descriptions.Item label="homepage" span={3}>
                {data?.homepage}
              </Descriptions.Item>
              <Descriptions.Item label="Original language" span={3}>
                {data?.original_language}
              </Descriptions.Item>
              <Descriptions.Item label="Popularity" span={3}>
                {data?.popularity}
              </Descriptions.Item>
              <Descriptions.Item label="Release date" span={3}>
                {data?.release_date}
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-5 px-5">
                  {<TwitterOutlined />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Cast</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={creditsData?.cast}
              split={false}
              className="conversations-list"
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Link type="link" to={`/movies/actor/detail/${item.title}`}>
                      {" view"}
                    </Link>,
                    //  <Button ></Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="square" size={48} src={item.avatar} />
                    }
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Crew</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={creditsData?.crew}
              split={false}
              className="conversations-list"
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Link type="link" to={`/movies/actor/detail/${item.title}`}>
                      {" view"}
                    </Link>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="square" size={48} src={item.avatar} />
                    }
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">{data?.title} backdrops</h6>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {movieImagesData?.backdrops.slice(0, 12).map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={
                  <div
                    className="image-container "
                    style={{
                      backgroundImage:
                        "url(https://placehold.co/1066x600?text=loading...)",
                      // maxHeight: 180,
                      minHeight: 220,
                      borderRadius: 10,
                    }}
                  >
                    <img
                      className="image-content"
                      alt="example"
                      src={BACK_PATH + p.file_path}
                    />
                  </div>
                }
              >
                <div className="card-tag">{p.vote_count} Vote</div>
                <Row gutter={[6, 0]} className="card-footer"></Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">{data?.title} Posters</h6>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {movieImagesData?.posters.slice(0, 8).map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={
                  <div
                    className="image-container "
                    style={{
                      backgroundImage:
                        "url(https://placehold.co/1066x600?text=loading...)",
                      // maxHeight: 180,
                      minHeight: 220,
                      borderRadius: 10,
                    }}
                  >
                    <img
                      className="image-content"
                      alt="example"
                      src={BACK_PATH + p.file_path}
                    />
                  </div>
                }
              >
                <div className="card-tag">{p.vote_count} Vote</div>
                {/* <h5>{p.title}</h5>
                <p>{p.disciption}</p> */}
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    {/* <Button
                    // type="button"
                    ></Button> */}
                  </Col>
                  {/* <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col> */}
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </Spin>
  );
}

export default Detail;
