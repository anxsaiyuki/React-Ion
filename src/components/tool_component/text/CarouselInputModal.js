import React, { PropTypes } from 'react';
import '../../../scss/textInputModal.scss';

class CarouselInputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  addToList(description, value) {
    const list = this.state.list;
    list.push({
      original: value,
      thumbnail: value,
      description,
    });
    this.setState({ list });
  }

  removeFromList(i) {
    this.setState({
      list: this.state.list.filter((item, index) => index !== i),
    });
  }

  render() {
    const { textModal, closeTextModal } = this.props;
    const { callback, showing, action, placeholder, placeholder2 } = textModal;
    let className = 'modal-hidden';
    if (action === 'carousel') {
      className = showing ? 'modal-wrapper' : 'modal-hidden';
    }

    const listNode = this.state.list.map((list, index) => (
      <li key={index}>
        <button
          onClick={() => this.removeFromList(index)}
        > <i className="fa fa-window-close" aria-hidden="true" />
        </button>
        {list.description}
      </li>
    ));

    return (
      <div className={className}>
        <div className="modal">
          <button
            className="close-button"
            onClick={() => {
              this.url.value = '';
              this.setState({ list: [] });
              closeTextModal();
            }}
          > <i className="fa fa-window-close" aria-hidden="true" />
          </button>
          <div className="list-modal">
            <div className="list-side">
              <ul>{listNode}</ul>
            </div>
            <div className="input-side">
              <input
                placeholder={placeholder.toUpperCase()}
                type="text"
                ref={i => (this.url = i)}
              />
              <input
                placeholder={placeholder2 ? placeholder2.toUpperCase() : ''}
                type="description"
                ref={i => (this.description = i)}
              />
              <button
                className="submit-button"
                onClick={(e) => {
                  e.preventDefault();
                  this.addToList(this.description.value, this.url.value);
                  this.url.value = '';
                  this.description.value = '';
                }}
              > ADD
              </button>
              <button
                className="submit-button"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  callback(this.state.list);
                  this.setState({ list: [] });
                  closeTextModal();
                  this.url.value = '';
                }}
              > SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CarouselInputModal.propTypes = {
  textModal: PropTypes.object.isRequired,
  closeTextModal: PropTypes.func.isRequired,
};

export default CarouselInputModal;
