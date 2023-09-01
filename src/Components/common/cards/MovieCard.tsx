import useNotify from "@/Hooks/useNotify";
import { Movie } from "@/Models/Movie";
import { removeMovieFavorite, addMovieFavorite, removeWatchLater, addWatchLater } from "@/redux/Profile";
import { selectIsAuthenticated } from "@/redux/auth";
import { IMAGE_PATH } from "@/utils/constants";
import { favoritedeleted, favoriteAdded, watchLaterdeleted, watchLaterAdded } from "@/utils/notifications";
import { HeartFilled, HeartOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Image } from "antd";
// import Meta from "antd/es/card/Meta";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

interface MovieProps {
  Movie: Movie;
}

export default function MovieCard({ Movie }: MovieProps) {
  const { sendNotif, contextHolder } = useNotify();
  const router = useRouter();
  const userMoviesSelector = useSelector((a: any) => a.Profile);
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const handleClicked = (action: any) => {
    isAuthenticated ? dispatch(action) : router.push("/signin/");
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
              onClick={() => router.push(`/MovieDetail/${Movie.id}`)}
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
        <Link href={`/movies/detail/${Movie.id}`}>
          {Movie.title}
          {/* <Meta
            title={Movie.title}
            description={Movie.overview.length < 100 ? Movie.overview : Movie.overview.slice(0, 150) + "..."}
          />{" "} */}
        </Link>
      </Card>
    </>
  );
}
