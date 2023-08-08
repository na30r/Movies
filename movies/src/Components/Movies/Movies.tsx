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
import { MovieParams, sortBy } from "../../Models/MovieParams";
import usePersonSearch from "../../Hooks/usePersonSearch";
import { Person } from "../../Models/Person";

export default function Movies() {
  const [pageParam, setpageParam] = useState(1);

  const { categoryId } = useParams();
  useEffect(() => {
    setselectedGenres([Number(categoryId)]);
  }, [categoryId]);

  const { data: genreList } = useGenre();
  const [selectedGenres, setselectedGenres] = useState<number[]>([
    Number(categoryId),
  ]);

  const [selectedCompany, setselectedCompany] = useState<string>();
  const [companySearchSelect, setcompanySearchSelect] = useState<string>();
  const { data: companyList, isLoading: companyListisLoading } =
    useCompany(companySearchSelect);

  const [selectedYear, setselectedYear] = useState<number>();

  const [selectedKeyword, setselectedKeyword] = useState<string>();

  const [sortBy, setsortBy] = useState();

  const [selectedPerson, setselectedPerson] = useState<string>();
  const [personSearchSelect, setpersonSearchSelect] = useState<string>();
  const { data: personSearchList, isLoading: personSearchIsLoading } =
    usePersonSearch(personSearchSelect ?? " ");

  const options: SelectProps["options"] = genreList?.genres.map((a) => {
    return { value: a.id, label: a.name };
  });

  const years = Array.from(
    { length: 2031 - 1990 },
    (_, index) => 1990 + index
  ).reverse();

  var { data, error, isLoading, fetchNextPage } = useMovie({
    with_genres: selectedGenres.join(","),
    primary_release_year: selectedYear,
    with_keywords: selectedKeyword,
    with_companies: selectedCompany,
    sort_by: sortBy,
    with_crew: selectedPerson,
  });

  const navigate = useNavigate();

  const sortByOptions: { label: string; value: sortBy }[] = [
    { label: "popularity", value: "popularity.desc" },
    { label: "revenue desc", value: "revenue.desc" },
    { label: "revenue asc", value: "revenue.asc" },
    { label: "release date desc", value: "primary_release_date.desc" },
    { label: "release date asc", value: "primary_release_date.asc" },
    { label: "vote count desc", value: "vote_count.desc" },
    { label: "vote average desc", value: "vote_average.desc" },
    { label: "vote average asc", value: "vote_average.asc" },
  ];

  return (
    <>
      {console.log(data)}
      <div style={{ margin: "30px auto" }}>
        <Form>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item label="Genres">
                <Select
                  mode="multiple"
                  value={selectedGenres}
                  onChange={(e) => setselectedGenres(e)}
                  options={options}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Actor">
                <Select
                  showSearch
                  placeholder="Select an Actor"
                  showArrow={false}
                  filterOption={false}
                  onChange={(e) => setselectedPerson(e)}
                  onSearch={(e) => {
                    e.length > 2 && setpersonSearchSelect(e);
                  }}
                  style={{ width: "100%" }}
                  loading={personSearchIsLoading}
                >
                  {personSearchList?.results.map((p: Person) => (
                    <Select.Option key={p.id} value={p.id}>
                      <img
                        src={`${IMAGE_PATH}${p.profile_path}`}
                        alt={p.name}
                        style={{ width: 16, marginRight: 8 }}
                      />
                      {p.name} / <small>{p.known_for_department} </small>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="companies">
                <Select
                  showSearch
                  placeholder="Select an option"
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onChange={(e) => setselectedCompany(e)}
                  onSearch={(e) => e.length > 2 && setcompanySearchSelect(e)}
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
                  style={{ width: "100%" }}
                  onChange={(e) => setsortBy(e)}
                >
                  {sortByOptions.map((a) => (
                    <Select.Option key={a.value} value={a.value}>
                      {a.label}
                    </Select.Option>
                  ))}
                </Select>
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

      <Row gutter={16}>
        {data?.pages?.map((page) => {
          return page.results.map((a) => {
            return (
              <Col
                key={a.id}
                lg={8}
                xl={6}
                sm={12}
                xs={24}
                style={{ padding: 10 }}
              >
                <Card
                  onClick={() => navigate(`/movies/detail/${a.id}`)}
                  key={a.id}
                  style={{ width: 300 }}
                  cover={<img alt="example" src={IMAGE_PATH + a.poster_path} />}
                >
                  <Meta
                    title={a.title}
                    description={
                      a.overview.length < 100
                        ? a.overview
                        : a.overview.slice(0, 150) + "..."
                    }
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
