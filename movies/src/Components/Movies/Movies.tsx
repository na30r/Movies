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
  Spin,
  Image,
  Skeleton,
  Space,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DotChartOutlined,
  EditOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  LikeOutlined,
  PlusCircleFilled,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { IMAGE_PATH } from "../../utils/constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGenre from "../../Hooks/useGenre";
import form from "antd/es/form";
import placeholder440x660 from "../../assets/images/440660.jpg";
import useCompany from "../../Hooks/useCompany";
import { Company } from "../../Models/Company";
import { MovieParams, sortBy } from "../../Models/MovieParams";
import usePersonSearch from "../../Hooks/usePersonSearch";
import { Person } from "../../Models/Person";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovieFavorite,
  addWatchLater,
  removeMovieFavorite,
  removeWatchLater,
} from "../../redux/Profile";
import { selectIsAuthenticated } from "../../redux/auth";
import { heart, outlineHeart, plus, yellowPlus } from "../../assets/svg-files";

export default function Movies() {
  const dispatch = useDispatch();
  const [pageParam, setpageParam] = useState(1);
  const isAuthenticated = useSelector(selectIsAuthenticated);
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

  const userMoviesSelector = useSelector((a: any) => a.Profile);
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
  const handleClicked = (action: any) => {
    isAuthenticated ? dispatch(action) : navigate("/signin/");
  };
  return (
    <>
      <Spin spinning={isLoading} size="large">
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
                    key={a.id}
                    style={{ width: 300 }}
                    cover={
                      <div className="nplaceholder imgplaceholder">
                        <Image
                          alt="example"
                          src={IMAGE_PATH + a.poster_path}
                          onClick={() => navigate(`/movies/detail/${a.id}`)}
                        />
                      </div>
                    }
                    actions={[
                      userMoviesSelector.favorite.some(
                        (fav: any) => fav.id == a.id
                      ) ? (
                        <HeartFilled
                          color="red"
                          type="link"
                          onClick={() => handleClicked(removeMovieFavorite(a))}
                        />
                      ) : (
                        <HeartOutlined
                          type="link"
                          onClick={() => handleClicked(addMovieFavorite(a))}
                        />
                      ),
                      userMoviesSelector.watchLater.some(
                        (fav: any) => fav.id == a.id
                      ) ? (
                        <PlusOutlined
                          color="yellow"
                          type="link"
                          onClick={() => handleClicked(removeWatchLater(a))}
                        />
                      ) : (
                        <PlusOutlined
                          type="link"
                          onClick={() => handleClicked(addWatchLater(a))}
                        />
                      ),
                    ]}
                  >
                    <Link to={`/movies/detail/${a.id}`}>
                      <Meta
                        title={a.title}
                        description={
                          a.overview.length < 100
                            ? a.overview
                            : a.overview.slice(0, 150) + "..."
                        }
                      />{" "}
                    </Link>
                  </Card>
                </Col>
              );
            });
          })}
          <Button
            onClick={() => {
              //  setpageParam(pageParam + 1);
              fetchNextPage();
            }}
          >
            More
          </Button>
        </Row>
      </Spin>
    </>
  );
}
