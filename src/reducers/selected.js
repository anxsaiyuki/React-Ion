import { SET_SELECTED } from '../actions/selected';
import { REMOVE_CHILD } from '../actions/routes';

const initialState = 0;

const selected = (selected = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED:
      return action.id;
    case REMOVE_CHILD:
      return 0;
    default:
      return selected;
  }
};

export default selected;
