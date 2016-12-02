import React, { PropTypes } from 'react';

const AddCarousel = ({
  selected,
  nextId,
  addChild,
  toggleCarouselModal,
}) => {
  const callback = (value) => {
    addChild(
      'Carousel',
      { content: value,
        height: [50, '%'],
        width: [20, '%'],
        settings: {
          slideInterval: 2000,
          startIndex: 0,
          infinite: true,
          showBullets: true,
          showFullscreenButton: true,
          showPlayButton: true,
          showIndex: true,
          autoPlay: true,
          slideOnThumbnailHover: false,
          disableArrowKeys: false,
          showThumbnails: true,
          disableThumbnailScroll: true,
        },
      },
      `Carousel${nextId}`,
      selected,
      nextId,
    );
  };

  return (
    <div className="add-text">
      <button
        onClick={() => toggleCarouselModal(
          'Add Main Picture URL',
          'Add an image description',
          'carousel',
          callback,
        )}
      > <i className="fa fa-circle-thin" aria-hidden="true" /> CAROUSEL
      </button>
    </div>
  );
};

AddCarousel.propTypes = {
  selected: PropTypes.number.isRequired,
  nextId: PropTypes.number.isRequired,
  addChild: PropTypes.func.isRequired,
  toggleCarouselModal: PropTypes.func.isRequired,
};

export default AddCarousel;
