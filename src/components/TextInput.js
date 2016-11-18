import React from 'react';

export default class TextInput extends React.Component {
  render() {
    const { selected, nextId, addChild, toggleTextModal } = this.props;

    const callback = (context) => {
      addChild(
        'Text',
        { content: context.text.value, fontSize: 12, color: 'white' },
        selected,
        nextId,
      );
    };

    return (
      <div>
        <button
          onClick={() => toggleTextModal(
            'enter text',
            callback,
          )}
        > <i className="fa fa-plus" aria-hidden="true" /> TEXT
        </button>
      </div>
    );
  }
}