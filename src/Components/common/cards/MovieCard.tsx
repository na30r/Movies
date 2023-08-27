import { HeartFilled, HeartOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Image } from "antd";
import Meta from "antd/es/card/Meta";
import { Link, useNavigate } from "react-router-dom";
import { Movie } from "../../../Models/Movie";
import { IMAGE_PATH } from "../../../utils/constants";
import useNotify from "../../../Hooks/useNotify";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../../redux/auth";
import { addMovieFavorite, addWatchLater, removeMovieFavorite, removeWatchLater } from "../../../redux/Profile";
import { favoriteAdded, favoritedeleted, watchLaterAdded, watchLaterdeleted } from "../../../utils/notifications";

interface MovieProps {
  Movie: Movie;
}

export default function MovieCard({ Movie }: MovieProps) {
  const { sendNotif, contextHolder } = useNotify();
  const navigate = useNavigate();
  const userMoviesSelector = useSelector((a: any) => a.Profile);
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const handleClicked = (action: any) => {
    isAuthenticated ? dispatch(action) : navigate("/signin/");
  };

  return (
    <>
      {contextHolder}
      <Card
        key={Movie.id}
        style={{ width: 300 }}
        cover={
          <div className="nplaceholder imgplaceholder">
            <Image
              alt="example"
              src={IMAGE_PATH + Movie.poster_path}
              onClick={() => navigate(`/movies/detail/${Movie.id}`)}
            />
          </div>
        }
        actions={[
          userMoviesSelector.favorite.some((fav: any) => fav.id == Movie.id) ? (
            <HeartFilled
              color="red"
              type="link"
              onClick={() => {
                handleClicked(removeMovieFavorite(Movie));
                sendNotif(favoritedeleted(Movie.title));
              }}
            />
          ) : (
            <HeartOutlined
              type="link"
              onClick={() => {
                handleClicked(addMovieFavorite(Movie));
                sendNotif(favoriteAdded(Movie.title));
              }}
            />
          ),
          userMoviesSelector.watchLater.some((fav: any) => fav.id == Movie.id) ? (
            <PlusOutlined
              color="yellow"
              type="link"
              onClick={() => {
                handleClicked(removeWatchLater(Movie));
                sendNotif(watchLaterdeleted(Movie.title));
              }}
            />
          ) : (
            <PlusOutlined
              type="link"
              onClick={() => {
                handleClicked(addWatchLater(Movie));
                sendNotif(watchLaterAdded(Movie.title));
              }}
            />
          ),
        ]}>
        <Link to={`/movies/detail/${Movie.id}`}>
          <Meta
            title={Movie.title}
            description={Movie.overview.length < 100 ? Movie.overview : Movie.overview.slice(0, 150) + "..."}
          />{" "}
        </Link>
      </Card>
    </>
  );
}
