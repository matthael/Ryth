import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery({ songid });
  const {
    data
  } = useGetSongRelatedQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (track, i) => {
    dispatch(setActiveSong({ track, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails) return <Loader title="Procurando Música..." />;

  if (error) return <Error />;

  const lyricsData =
    songData?.resources?.["shazam-songs"]?.[songid]?.relationships?.lyrics
      ?.data;
  const lyricsId = lyricsData ? lyricsData[0]?.id : null;

  const lyricsText = songData?.resources?.lyrics?.[lyricsId]?.attributes?.text;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={""} songData={songData} songid={songid} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold"> Letra: </h2>
        <div className="mt-5">
          {songData?.resources?.lyrics?.[lyricsId]?.attributes?.text ? (
            lyricsText.map((line, i) => (
              <p className="text-gray-400 text-base my-1" key={i}>
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Desculpa, nenhuma letra encontrada
            </p>
          )}
        </div>
      </div>

      <RelatedSongs
        songData={songData}
        songid={songid}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
