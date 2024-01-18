import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { placeholder } from "../assets";

const SongCard = ({ track, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ track, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex 
          ${
            activeSong?.title === track.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }
          `}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            track={track}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img src={track.images?.coverart || placeholder} alt="coverart da musica" />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-bold text-lg text-white truncate">
          <Link to={`/songs/${track?.key}`}>{track.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              track.artists
                ? `/artists/${track?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {track.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
