import MovieCard from "@/Components/common/cards/MovieCard";
import { ActorSelect } from "@/Components/common/form/ActorSelect";
import { CompanySelect } from "@/Components/common/form/CompanySelect";
import { GenreSelect } from "@/Components/common/form/GenreSelect";
import { MovieKeywordSelect } from "@/Components/common/form/MovieKeywordSelect";
import { MovieSortbySelect } from "@/Components/common/form/MovieSortbySelect";
import { MovieYearSelect } from "@/Components/common/form/MovieYearSelect";
import DashboardLayout from "@/Components/general/DashboardLayout";
import useMovie from "@/Hooks/useMovie";
import { Spin, Form, Row, Col, Button } from "antd";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import MovieService from "@/services/MovieService";
import { MovieParams } from "@/Models/MovieParams";
import { PageResult } from "@/Models/PageResult";
import { Movie } from "@/Models/Movie";

export default function Movies({ defualtData }: { defualtData: PageResult<Movie> }) {
  const [selectedGenres, setselectedGenres] = useState<number[]>([]);
  const [selectedCompany, setselectedCompany] = useState<string>();

  const [selectedYear, setselectedYear] = useState<number>();

  const [selectedKeyword, setselectedKeyword] = useState<string>();

  const [sortBy, setsortBy] = useState();

  const [selectedPerson, setselectedPerson] = useState<string>();

  const [isSearchEnable, setisSearchEnable] = useState(false);

  var { data, error, isLoading, fetchNextPage } = useMovie(
    {
      with_genres: selectedGenres.join(","),
      primary_release_year: selectedYear,
      with_keywords: selectedKeyword,
      with_companies: selectedCompany,
      sort_by: sortBy,
      with_crew: selectedPerson,
    },
    isSearchEnable
  );
  return (
    <>
      <DashboardLayout>
        <Spin spinning={isLoading} size="large">
          <div style={{ margin: "30px auto" }}>
            <Form>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <GenreSelect
                    genreIds={selectedGenres}
                    onChange={(e: any) => {
                      setselectedGenres(e);
                      setisSearchEnable(true);
                    }}
                  />
                </Col>
                <Col span={8}>
                  <ActorSelect
                    onChange={(e: any) => {
                      setselectedPerson(e);
                      setisSearchEnable(true);
                    }}
                  />
                </Col>
                <Col span={8}>
                  <CompanySelect
                    onChange={(e: any) => {
                      setselectedCompany(e);
                      setisSearchEnable(true);
                    }}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <MovieSortbySelect
                    onChange={(e: any) => {
                      setsortBy(e);
                      setisSearchEnable(true);
                    }}
                  />
                </Col>
                <Col span={8}>
                  <MovieYearSelect
                    onChange={(e: any) => {
                      setselectedYear(e);
                      setisSearchEnable(true);
                    }}
                  />
                </Col>
                <Col span={8}>
                  <MovieKeywordSelect
                    onChange={(e: any) => {
                      setselectedKeyword(e.target.value);
                      setisSearchEnable(true);
                    }}
                  />
                </Col>
              </Row>
            </Form>
          </div>

          <Row gutter={16}>
            {!isSearchEnable ? (
              defualtData.results.map((movie: Movie) => {
                return (
                  <Col key={movie.id} lg={8} xl={6} sm={12} xs={24} style={{ padding: 10 }}>
                    <MovieCard Movie={movie} />
                  </Col>
                );
              })
            ) : (
              <>
                {" "}
                {data?.pages?.map((page: PageResult<Movie>) => {
                  return page.results.map((a: Movie) => {
                    return (
                      <>
                        <Col key={a.id} lg={8} xl={6} sm={12} xs={24} style={{ padding: 10 }}>
                          <MovieCard Movie={a} />
                        </Col>
                      </>
                    );
                  });
                })}
                <Button
                  onClick={() => {
                    fetchNextPage();
                  }}>
                  More
                </Button>
              </>
            )}
          </Row>
        </Spin>
      </DashboardLayout>
    </>
  );
}

export async function getStaticProps() {
  var movieService = new MovieService();
  var defaultParams: MovieParams = {};
  console.log("called");
  return {
    props: {
      defualtData: await movieService.getAll(defaultParams),
    },
    revalidate: 10,
  };
}
