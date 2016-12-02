import React from 'react';
import Draggable from 'react-draggable';
import AddBlock from '../../../containers/tool_component/addremove/AddBlock';
import AddImage from '../../../containers/tool_component/addremove/AddImage';
import AddList from '../../../containers/tool_component/addremove/AddList';
import TextInput from '../../../containers/tool_component/text/TextInput';
import BackgroundImageInput from '../../../containers/tool_component/adjustor/BackgroundImageInput';
import AddLink from '../../../containers/tool_component/addremove/AddLink';
import AddDropDown from '../../../containers/tool_component/addremove/AddDropDown';
import AddRadio from '../../../containers/tool_component/addremove/AddRadio';
import AddCarousel from '../../../containers/tool_component/addremove/AddCarousel';

import '../../../scss/AddComponents.scss';


const AddComponents = ({ draggable, closeDraggableModal }) => {
  return (
    <Draggable>
      <div className={draggable.showing ? 'add-components show-draggable' : 'add-components hide-draggable'}>
        <div className="top-bar">
          <button
            onClick={() => {
              closeDraggableModal();
            }}
          >
            <i
              className="fa fa-close"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="components-list">
          <AddBlock />
          <TextInput />
          <AddImage />
          <AddList />
          <BackgroundImageInput />
          <AddLink />
          <AddDropDown />
          <AddRadio />
          <AddCarousel />
        </div>
      </div>
    </Draggable>
  );
};

export default AddComponents;
