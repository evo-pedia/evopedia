// react-player
import ReactPlayer from 'react-player/lazy';

// prop-types
import PropTypes from 'prop-types';

export default function Video({ url }) {
  return <ReactPlayer url={url} width="100%" />;
}

Video.propTypes = {
  url: PropTypes.string.isRequired,
};
