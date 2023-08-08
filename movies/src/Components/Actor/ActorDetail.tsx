import { Row, Col, Card, Button, Avatar, Radio } from "antd";

import { Link, useParams } from "react-router-dom";
import { BACK_PATH } from "../../utils/constants";
import usePersonSearch from "../../Hooks/usePersonSearch";

function ActorDetail() {
  const { personName } = useParams();
  const { data: personSearchData, isLoading: personSearchIsLoading } =
    usePersonSearch(personName);
  var person = personSearchData?.results[0];
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

  if (personSearchIsLoading) {
    return <>isloading</>;
  }
  return (
    <>
      <div
        className="profile-nav-bg"
        style={{
          // backgroundImage: "url(" + BACK_PATH + data?.backdrop_path + ")",
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
                      src={BACK_PATH + person?.profile_path}
                    />
                  </Col>
                  <Col lg={12}>
                    <div className="avatar-info">
                      <h4 className="font-semibold m-0">
                        {person?.original_name}
                        <br></br>
                        original name : {person?.name}
                      </h4>
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
            <p className="text-dark"> {person?.name}. </p>
            <p className="text-dark">Gender: {person?.gender}</p>
            <p className="text-dark">
              known for : {person?.known_for_department}.
            </p>
            <p className="text-dark">Popularity : {person?.popularity}.</p>
            <hr className="my-25" />
          </Card>
        </Col>
      </Row>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">{person?.name} Movies</h6>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {person?.known_for.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              {" "}
              <Link to={`/movies/detail/${p.id}`}>
                <h2> {p.title ?? p.original_name}</h2>
                <Card
                  bordered={false}
                  className="card-project"
                  cover={
                    <img alt="example" src={BACK_PATH + p.backdrop_path} />
                  }
                >
                  <div className="card-tag">
                    {" "}
                    Genres :{" "}
                    {p.genre_ids.map((gid) => (
                      <span> {gid.toString() + " "} </span>
                    ))}
                  </div>
                  <div className="card-tag">overview : {p.overview}</div>
                  <div className="card-tag">
                    language: {p.original_language}{" "}
                  </div>
                  <div className="card-tag">
                    vote_average: {p.vote_average}{" "}
                  </div>
                  <div className="card-tag">{p.vote_count} Vote</div>

                  <Row gutter={[6, 0]} className="card-footer"></Row>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}

export default ActorDetail;
