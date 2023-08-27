import React, { useEffect, useState } from "react";
import useMovie from "../../../Hooks/useMovie";
import { Button, Col, Form, Row, Spin } from "antd";
import { useParams } from "react-router-dom";

import { MovieParams, sortBy } from "../../../Models/MovieParams";
import MovieCard from "../../common/cards/MovieCard";
import { ActorSelect } from "../../common/form/ActorSelect";
import { CompanySelect } from "../../common/form/CompanySelect";
import { GenreSelect } from "../../common/form/GenreSelect";
import { MovieKeywordSelect } from "../../common/form/MovieKeywordSelect";
import { MovieSortbySelect } from "../../common/form/MovieSortbySelect";
import { MovieYearSelect } from "../../common/form/MovieYearSelect";

export default function Movies() {
  const { genreId } = useParams();
  console.log(genreId, "gID");
  const [selectedGenres, setselectedGenres] = useState<number[]>([]);
  console.log(selectedGenres, "adg");
  useEffect(() => {
    setselectedGenres([Number(genreId)]);
  }, [genreId]);

  const [selectedCompany, setselectedCompany] = useState<string>();

  const [selectedYear, setselectedYear] = useState<number>();

  const [selectedKeyword, setselectedKeyword] = useState<string>();

  const [sortBy, setsortBy] = useState<sortBy>();

  const [selectedPerson, setselectedPerson] = useState<string>();

  var { data, error, isLoading, fetchNextPage } = useMovie({
    with_genres: selectedGenres.join(","),
    primary_release_year: selectedYear,
    with_keywords: selectedKeyword,
    with_companies: selectedCompany,
    sort_by: sortBy,
    with_crew: selectedPerson,
  });

  return (
    <>
      <Spin spinning={isLoading} size="large">
        <div style={{ margin: "30px auto" }}>
          <Form>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <GenreSelect genreIds={selectedGenres} onChange={(e: any) => setselectedGenres(e)} />
              </Col>
              <Col span={8}>
                <ActorSelect onChange={(e: any) => setselectedPerson(e)} />
              </Col>
              <Col span={8}>
                <CompanySelect onChange={(e: any) => setselectedCompany(e)} />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <MovieSortbySelect onChange={(e: any) => setsortBy(e)} />
              </Col>
              <Col span={8}>
                <MovieYearSelect onChange={(e: any) => setselectedYear(Number(e))} />
              </Col>
              <Col span={8}>
                <MovieKeywordSelect onChange={(e: any) => setselectedKeyword(e.target.value)} />
              </Col>
            </Row>
          </Form>
        </div>

        <Row gutter={16}>
          {data?.pages?.map((page) => {
            return page.results.map((a) => {
              return (
                <Col key={a.id} lg={8} xl={6} sm={12} xs={24} style={{ padding: 10 }}>
                  <MovieCard Movie={a} />
                </Col>
              );
            });
          })}
          <Button
            onClick={() => {
              fetchNextPage();
            }}>
            More
          </Button>
        </Row>
      </Spin>
    </>
  );
}
