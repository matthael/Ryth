import SongBar from "./SongBar";

const RelatedSongs = ({
  songData,
  songid,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistId,
}) => {
  const songApiData = songData?.resources?.["shazam-songs"]?.[songid];

  return (
    <div className="flex flex-col ">
      <h1 className="font-bold text-3xl text-white"> Músicas relacionadas</h1>
      <div className="mt-6 w-full flex flex-col">
        {songApiData.relationships?.["related-tracks"]?.data.map((track, i) => (
          <SongBar
            key={`${songApiData.id}-${artistId}`}
            track={track}
            i={i}
            songData={songData}
            songid={songid}
            artistId={artistId}
            activeSong={activeSong}
            isPlaying={isPlaying}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
