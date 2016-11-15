import React from 'react';
import { randomColor, getValue } from '../lib/helpers';
import '../scss/editorControls.scss';

export default class EditorControls extends React.Component {
  componentDidMount() {
    this.resetSliders();
  }

  resetSliders() {
    const context = this;
    const height = getValue('height', context.props.selected, context.props.routes);
    const width = getValue('width', context.props.selected, context.props.routes);
    const flex = getValue('flex', context.props.selected, context.props.routes);

    if (height && width && flex) {
      setTimeout(() => {
        context.height.value = height[0];
        context.width.value = width ? width[0] : 0;
        context.flex.value = flex;
      });
    }
  }

  render() {
    const {
      updateProps,
      selected,
      addChild,
      removeChild,
      nextId,
      controlsShowing,
    } = this.props;

    this.resetSliders();

    return (
      <div
        className={controlsShowing
          ? 'controls-wrapper'
          : 'hidden'
        }
      >
        <div>
          <button
            onClick={() => {
              addChild('Block', {
                backgroundColor: 'rgba(255,255,255,.1)',
                flex: 1,
                height: [20, selected === 0 ? 'px' : '%'],
                width: [20, '%'],
                flexDirection: 'row' },
                selected,
                nextId,
              );
            }}
          > <i className="fa fa-plus" aria-hidden="true"></i> BLOCK
          </button>
          <button
            onClick={() => {
              removeChild(selected);
            }}
          > <i className="fa fa-minus" aria-hidden="true"></i> BLOCK
          </button>
        </div>
        <div>
          HEIGHT
          <input
            type="range"
            min={0}
            max={selected === 0 ? 10000 : 100}
            step={selected === 0 ? 100 : 10}
            ref={i => this.height = i}
            onChange={() => {
              updateProps(
                'height',
                [this.height.value, selected === 0 ? 'px' : '%'],
                selected,
              );
            }}
          />
        </div>
        <div
          className={selected === 0
            ? 'hidden'
            : null
          }
        > WIDTH
          <input
            type="range"
            min={0}
            max={100}
            step={10}
            ref={i => this.width = i}
            onChange={() => updateProps(
              'width',
              [this.width.value, '%'],
              selected,
            )}
          />
        </div>
        <div
          className={selected === 0
            ? 'hidden'
            : null
          }
        > FLEX
          <input
            type="range"
            min={0}
            max={10}
            ref={i => this.flex = i}
            onChange={() => updateProps(
              'flex', this.flex.value, selected,
            )}
          />
        </div>
        <div>
          <button
            onClick={() => updateProps(
              'flexDirection',
              'row',
              selected,
            )}
          > ROW
          </button>
          <button
            onClick={() => updateProps(
              'flexDirection',
              'column',
              selected,
            )}
          > COLUMN
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Text Here"
            ref={i => this.text = i}
          />
          <button
            onClick={() => addChild(
              'Text',
              { content: this.text.value },
              selected,
              nextId,
            )}
          > <i className="fa fa-plus" aria-hidden="true"></i> TEXT
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Background Image"
            ref={i => this.backgroundImage = i}
          />
          <button
            onClick={() => updateProps(
              'backgroundImage',
              this.backgroundImage.value,
              selected,
            )}
          > <i className="fa fa-plus" aria-hidden="true"></i> URL
          </button>
        </div>
      </div>
    );
  }
}
