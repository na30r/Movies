import { Row, Col, Card, Button, Avatar, Radio } from "antd";

import { Link, useParams } from "react-router-dom";
import { BACK_PATH } from "../../../utils/constants";
import usePersonSearch from "../../../Hooks/usePersonSearch";
import MovieInfoWithImageCard from "../../common/cards/MovieInfoWithImageCard";
import ActorInfoCard from "../../common/cards/ActorInfoCard";

function ActorDetail() {
  const { personName } = useParams();
  const { data: personSearchData, isLoading: personSearchIsLoading } = usePersonSearch(personName);
  var person = personSearchData?.results[0];

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} style={{ marginTop: 100 }}>
          <Card
            className="card-profile-head"
            bodyStyle={{ display: "none" }}
            title={
              <Row justify="space-between" align="middle" gutter={[24, 0]}>
                <Col span={24} md={12} className="col-info">
                  <Avatar.Group>
                    <Row>
                      <Col lg={12}>
                        <Avatar size={90} shape="square" src={BACK_PATH + person?.profile_path} />
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
              </Row>
            }></Card>
        </Col>
      </Row>

      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24">
          <ActorInfoCard Person={person} />
        </Col>
      </Row>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">{person?.name} Movies</h6>
          </>
        }>
        <Row gutter={[24, 24]}>
          {person?.known_for.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              {" "}
              <Link to={`/movies/detail/${p.id}`}>
                <MovieInfoWithImageCard Movie={p} />
              </Link>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}

export default ActorDetail;
