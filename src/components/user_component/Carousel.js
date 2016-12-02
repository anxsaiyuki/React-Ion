import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import '../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss';

class Carousel extends Component {

  componentDidMount() {
    setTimeout(() => this.forceUpdate(), 50);
  }

  render() {
    const { settings, setSelected, selected, id, content } = this.props;
    const divStyles = {
      flex: this.props.flex,
      width: `${this.props.width[0]}${this.props.width[1]}`,
      height: `${this.props.height[0]}${this.props.height[1]}`,
      padding: '10px',
      flexWrap: 'wrap',
      whiteSpace: 'initial',
      boxShadow: selected === id ? 'inset 0 0 0 1px #93FE3F' : 'inset 0 0 0 1px coral',
    };

    return (
      <div style={divStyles} onClick={e => setSelected(e, id)}>
        <ImageGallery
          items={content}
          {...settings}
        />
      </div>
    );
  }
}
export default Carousel;

