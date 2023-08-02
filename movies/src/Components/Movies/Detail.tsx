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
  Upload,
  message,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import BgProfile from "../../assets/images/bg-profile.jpg";
import profilavatar from "../../assets/images/face-1.jpg";
import convesionImg from "../../assets/images/face-3.jpg";
import convesionImg2 from "../../assets/images/face-4.jpg";
import convesionImg3 from "../../assets/images/face-5.jpeg";
import convesionImg4 from "../../assets/images/face-6.jpeg";
import convesionImg5 from "../../assets/images/face-2.jpg";
import project1 from "../../assets/images/home-decor-1.jpeg";
import project2 from "../../assets/images/home-decor-2.jpeg";
import project3 from "../../assets/images/home-decor-3.jpeg";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { themoviedbApi } from "../../utils/request";
import { BACK_PATH, IMAGE_PATH } from "../../utils/constants";
import useMovieDetail from "../../Hooks/useMovieDetail";
import useCredits from "../../Hooks/useCredits";
import useMovieImages from "../../Hooks/useMovieImages";
import usePersonSearch from "../../Hooks/usePersonSearch";

function Detail() {
  const { movieId } = useParams();
  //console.log(movieId);
  const { data, isLoading } = useMovieDetail(Number(movieId));
  const { data: creditsData, isLoading: creditsIsLoading } = useCredits(
    Number(movieId)
  );
  const { data: movieImagesData, isLoading: movieImagesIsLoading } =
    useMovieImages(Number(movieId));

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  if (isLoading || creditsIsLoading || movieImagesIsLoading) {
    return <>isloading</>;
  }
  return (
    <>
      <div
        className="profile-nav-bg"
        style={{
          backgroundImage: "url(" + BACK_PATH + data?.backdrop_path + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 300,
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
                      src={BACK_PATH + data.poster_path}
                    />
                  </Col>
                  <Col lg={12}>
                    <div className="avatar-info">
                      <h4 className="font-semibold m-0">{data.title}</h4>
                      <p>{data.tagline}</p>
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
            <p className="text-dark"> {data.overview}. </p>
            <hr className="my-25" />
            <Descriptions title="Oliver Liam">
              <Descriptions.Item label="homepage" span={3}>
                {data.homepage}
              </Descriptions.Item>
              <Descriptions.Item label="Original language" span={3}>
                {data.original_language}
              </Descriptions.Item>
              <Descriptions.Item label="Popularity" span={3}>
                {data.popularity}
              </Descriptions.Item>
              <Descriptions.Item label="Release date" span={3}>
                {data.release_date}
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
        <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Platform Settings</h6>}
          >
            <ul className="list settings-list">
              <li>
                <h6 className="list-header text-sm text-muted">ACCOUNT</h6>
              </li>
              <li>
                <Switch defaultChecked />

                <span>Email me when someone follows me</span>
              </li>
              <li>
                <Switch />
                <span>Email me when someone answers me</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Email me when someone mentions me</span>
              </li>
              <li>
                <h6 className="list-header text-sm text-muted m-0">
                  APPLICATION
                </h6>
              </li>
              <li>
                <Switch defaultChecked />
                <span>New launches and projects</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Monthly product updates</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Subscribe to newsletter</span>
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">{data.title} backdrops</h6>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {movieImagesData?.backdrops.slice(0, 12).map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={BACK_PATH + p.file_path} />}
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
            <h6 className="font-semibold">{data.title} Posters</h6>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {movieImagesData?.posters.slice(0, 8).map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<img alt="example" src={BACK_PATH + p.file_path} />}
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
    </>
  );
}

export default Detail;
