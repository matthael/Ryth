import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'

const PlayPause = ({ isPlaying, activeSong, track, handlePause, handlePlay }) => ( isPlaying && activeSong?.title === track.title ? (
  <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
) : (
  <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
))

export default PlayPause;
