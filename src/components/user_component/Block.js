import React from 'react';

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
  padding,
  aUrl,
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
    padding: padding || '20px',
    margin: margin || '0px',
    overflow: 'hidden',
    flexWrap: 'wrap',
    cursor: 'pointer',
    boxSizing: 'border-box',
    boxShadow: selected === id ? 'inset 0 0 0 2px #93FE3F' : 'inset 0 0 0 2px coral',
  };

  if (aUrl) {
    return (
      <a
        style={boxStyle}
        href={aUrl}
        onClick={e => setSelected(e, id)}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      style={boxStyle}
      onClick={e => setSelected(e, id)}
    >
      {children}
    </div>
  );
};

export default Block;
