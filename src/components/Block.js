import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSelected } from '../actions/selected';

const Block = ({
  backgroundColor,
  height,
  width,
  id,
  setSelected,
  selected,
  flex,
  flexDirection,
  children,
  backgroundImage,
  margin,
}) => {
  const boxStyle = {
    flex,
    flexDirection,
    backgroundColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : null,
    backgroundSize: 'cover',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: height ? height[0] + height[1] : null,
    width: width ? width[0] + width[1] : null,
    maxHeight: '100%',
    maxWidth: '100%',
    padding: '20px',
    margin,
    flexWrap: 'wrap',
    cursor: 'pointer',
    boxSizing: 'border-box',
    borderRadius: 2,
    boxShadow: selected === id ? 'inset 0 0 0 2px #93FE3F' : 'inset 0 0 0 2px coral',
  };

  return (
    <div
      style={boxStyle}
      onClick={e => setSelected(e, id)}
    >
      {children}
    </div>
  );
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSelected }, dispatch);
}

export default connect(null, mapDispatchToProps)(Block);
