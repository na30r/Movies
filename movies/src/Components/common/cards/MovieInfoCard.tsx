import { TwitterOutlined, FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import { Card, Button, Descriptions } from "antd";
import { pencil } from "../../../assets/svg-files";
import { MovieDetail } from "../../../Models/MovieDetail";

interface MovieInfoCardProps {
  movie: MovieDetail | undefined;
}

export default function MovieInfoCard({ movie }: MovieInfoCardProps) {
  return (
    <Card
      bordered={false}
      title={<h6 className="font-semibold m-0">Profile Information</h6>}
      className="header-solid h-full card-profile-information"
      extra={<Button type="link">{pencil}</Button>}
      bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}>
      {/* <p className="text-dark"> {movie?.overview}. </p> */}
      <hr className="my-25" />
      <Descriptions title="Oliver Liam">
        <Descriptions.Item label="homepage" span={3}>
          {movie?.homepage}
        </Descriptions.Item>
        <Descriptions.Item label="Original language" span={3}>
          {movie?.original_language}
        </Descriptions.Item>
        <Descriptions.Item label="Popularity" span={3}>
          {movie?.popularity}
        </Descriptions.Item>
        <Descriptions.Item label="Release date" span={3}>
          {movie?.release_date}
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
  );
}
