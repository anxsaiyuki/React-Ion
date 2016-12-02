import React from 'react';

const Text = ({
  content,
  id,
  setSelected,
  selected,
  color,
  fontSize,
  fontFamily,
  textAlign,
  padding,
}) => {
  const textStyle = {
    textAlign,
    fontFamily,
    fontSize,
    color,
    width: '100%',
    overflow: 'hidden',
    boxShadow: selected === id ? 'inset 0 0 0 1px #93FE3F' : 'inset 0 0 0 1px coral',
  };

  return (
    <div
      style={textStyle}
      onClick={e => setSelected(e, id)}
    >
      {content}
    </div>
  );
};

export default Text;
