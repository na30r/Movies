import React, { useEffect, useState } from "react";
import useMovie from "../../Hooks/useMovie";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  SelectProps,
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { IMAGE_PATH } from "../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import useGenre from "../../Hooks/useGenre";
import form from "antd/es/form";
import useCompany from "../../Hooks/useCompany";
import { Company } from "../../Models/Company";

export default function Movies() {
  const [pageParam, setpageParam] = useState(1);
  const { categoryId } = useParams();
  const { data: genreList } = useGenre();
  const [selectedCompany, setselectedCompany] = useState<string>();
  const [companySearchSelect, setcompanySearchSelect] = useState<string>();
  const { data: companyList, isLoading: companyListisLoading } =
    useCompany(companySearchSelect);
  const [selectedYear, setselectedYear] = useState<number>();
  const [selectedKeyword, setselectedKeyword] = useState<string>();
  const [companyOptions, setcompanyOptions] = useState<[]>();

  const options: SelectProps["options"] = genreList?.genres.map((a) => {
    return { value: a.id, label: a.name };
  });
  const [form] = Form.useForm();
  const [selectedGenres, setselectedGenres] = useState<any>([
    Number(categoryId),
  ]);
  const years = Array.from(
    { length: 2031 - 1990 },
    (_, index) => 1990 + index
  ).reverse();

  var { data, error, isLoading, fetchNextPage } = useMovie({
    with_genres: selectedGenres,
    primary_release_year: selectedYear,
    with_keywords: selectedKeyword,
    with_companies: selectedCompany,
  });

  const navigate = useNavigate();

  return (
    <>
      {console.log("ren")}
      <div style={{ margin: "30px auto" }}>
        <Form>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item label="Genres">
                <Select
                  mode="multiple"
                  // size={size}
                  placeholder="Please select"
                  defaultValue={selectedGenres}
                  // onChange={genreChange}
                  style={{ width: "100%" }}
                  options={options}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Genres">
                <Select
                  mode="multiple"
                  // size={size}
                  placeholder="Please select"
                  defaultValue={selectedGenres}
                  // onChange={genreChange}
                  style={{ width: "100%" }}
                  options={options}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="companies">
                {/* <Input
                  type="number"
                  onChange={(e) => setselectedCompany(e.target.value)}
                  style={{ width: "100%" }}
                /> */}
                <Select
                  // mode="multiple"
                  showSearch
                  placeholder="Select an option"
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onChange={(e) => setselectedCompany(e)}
                  onSearch={(e) => setcompanySearchSelect(e)}
                  style={{ width: "100%" }}
                  loading={companyListisLoading}
                >
                  {companyList?.results.map((company: Company) => (
                    <Select.Option key={company.id} value={company.id}>
                      <img
                        src={`${IMAGE_PATH}${company.logo_path}`}
                        alt={company.name}
                        style={{ width: 16, marginRight: 8 }}
                      />

                      {company.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item label="Sortby">
                <Select
                  defaultValue={selectedGenres}
                  style={{ width: "100%" }}
                  options={options}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Year">
                <Select
                  placeholder="Select a year"
                  style={{ width: 200 }}
                  onChange={(e) => setselectedYear(Number(e))}
                >
                  {years.map((year) => (
                    <Select.Option key={year} value={year}>
                      {year}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="keyword">
                <Input
                  onChange={(e) => setselectedKeyword(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Button
        onClick={() => {
          console.log(categoryId);
        }}
      />
      <Row gutter={16}>
        {data?.pages?.map((page: any) => {
          // console.log(a, "sad");
          return page.results.map((a: any) => {
            return (
              <Col key={a.id} lg={8} xl={6} sm={12} style={{ padding: 10 }}>
                <Card
                  key={a.id}
                  style={{ width: 300 }}
                  cover={<img alt="example" src={IMAGE_PATH + a.poster_path} />}
                  actions={[
                    <SettingOutlined
                      onClick={() => navigate(`/movies/detail/${a.id}`)}
                      key="setting"
                    />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Meta
                    avatar={
                      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                    }
                    title={a.title}
                    description={a.overview}
                  />
                </Card>
              </Col>
            );
          });
        })}
        <Button
          onClick={() => {
            // setpageParam(pageParam + 1);
            fetchNextPage();
          }}
        >
          More
        </Button>
      </Row>
    </>
  );
}
