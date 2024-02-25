import React from "react";
import { Link, useParams } from "react-router-dom";

import PlayPause from "./PlayPause";

const SongBar = ({
  track,
  i,
  songData,
  songid,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  const artist = artistId?.artists[artistId]?.attributes;
  const songApiData = songData?.resources?.["shazam-songs"]?.[songid];

  const coverArtUrl = artistId
    ? artist?.artwork?.url.replace("{w}", "125").replace("{h}", "125")
    : songApiData?.attributes.images?.coverArt;

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
        activeSong?.title === songApiData?.attributes.title
          ? "bg-[#4c426e]"
          : "bg-transparent"
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={coverArtUrl}
          alt={songApiData?.attributes.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          {!artistId ? (
            <Link to={`/songs/${songApiData.id}`}>
              <p className="text-xl font-bold text-white">
                {songApiData?.attributes.title}
              </p>
            </Link>
          ) : (
            <p className="text-xl font-bold text-white">
              {songApiData?.attributes?.artist}
            </p>
          )}
          <p className="text-base text-gray-300 mt-1">
            {artistId
              ? songApiData?.attributes?.albumName
              : songApiData?.attributes.artist}
          </p>
        </div>
      </div>
      {!artist ? (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          track={track}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(track, i)}
        />
      ) : null}
    </div>
  );
};

export default SongBar;
