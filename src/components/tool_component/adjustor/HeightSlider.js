import _ from 'lodash';
import React, { PropTypes } from 'react';
import Slider from './Slider';

const HeightSlider = ({ updateProps, selected, info, store }) => {
  const direction = info.parent 
    ? info.parent.props.flexDirection
    : null;
  return (
    <div
      className={(direction === 'column' && info.name !== 'Carousel')
        ? 'hidden'
        : 'slider'
      }
    >
      <Slider
        min={0}
        max={_.includes(store.pages, selected) ? 10000 : 100}
        step={_.includes(store.pages, selected) ? 100 : 10}
        unit={_.includes(store.pages, selected) ? 'px' : '%'}
        propName={'height'}
        selected={selected}
        updateProps={updateProps}
        title={'HEIGHT'}
        initialValue={info.props.height[0]}
      />
    </div>
  );
};

HeightSlider.propTypes = {
  store: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  selected: PropTypes.number.isRequired,
  updateProps: PropTypes.func.isRequired,
};

export default HeightSlider;
