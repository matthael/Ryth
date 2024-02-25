import { Link } from "react-router-dom";
import { placeholder } from "../assets";

const DetailsHeader = ({ artistId, artistData, songData, songid }) => {
  const artist = artistData?.artists[artistId]?.attributes;
  const songApiData = songData?.resources?.["shazam-songs"]?.[songid];

  const artistIdData = songApiData?.relationships?.artists?.data;
  const adamId = artistIdData ? artistIdData[0]?.id : null;

  const coverArtUrl = artistId
    ? artist?.artwork?.url.replace("{w}", "500").replace("{h}", "500")
    : songApiData?.attributes.images?.coverArt;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img
          src={coverArtUrl || placeholder}
          alt="art"
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId
              ? artist?.name
              : songApiData?.attributes.title || "Nome da música"}
          </p>
          {!artistId && (
            <Link to={`/artists/${adamId}`}>
              <p className="text-base text-gray-400 mt-2">
                {songApiData?.attributes.artist || "Subtitulo da música"}
              </p>
            </Link>
          )}
          <p className="text-base text-gray-400 mt-2">
            {artistId
              ? artist?.genreNames[0]
              : songApiData?.attributes.genres.primary}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
