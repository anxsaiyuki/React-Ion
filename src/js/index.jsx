import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { randomColor, mapComponents, getValue } from '../lib/helpers';
import { updateProps, addChild } from '../actions/routes';

class Index extends Component {
  componentDidMount() {
    this.resetSliders();
  }

  resetSliders() {
    const context = this;
    setTimeout(() => {
      context.height.value = getValue('height', context.props.selected, context.props.routes);
      context.flex.value = getValue('flex', context.props.selected, context.props.routes);
    }, 0);
  }

  render() {
    const { updateProps, routes, selected, addChild, nextId } = this.props;
    this.resetSliders();
    return (
      <div style={{ height: '100vh' }}>
        <div style={{ marginBottom: '20px', marginTop: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            Height
            <input
              type="range"
              min={0}
              max={100}
              step={10}
              ref={i => this.height = i}
              onChange={() => updateProps('height', this.height.value, selected)}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            Flex
            <input
              type="range"
              min={0}
              max={10}
              ref={i => this.flex = i}
              onChange={() => updateProps('flex', this.flex.value, selected)}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={() => {
                addChild('BLOCK', { color: randomColor(), flex: 1, height: 20 }, selected, nextId);
                // setTimeout(()=>setNextId(), 100);
              }}
            > ADD BLOCK
            </button>
          </div>
          <br />
        </div>
        {mapComponents(routes, selected)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    routes: state.routes,
    nextId: state.nextId,
    selected: state.selected,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateProps, addChild, getValue }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
