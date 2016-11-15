import { UPDATE_PROPS, ADD_CHILD, REMOVE_CHILD } from '../actions/routes';

const initialState = [{
  id: 0,
  props: {
    backgroundColor: 'rgba(255,255,255,.1)',
    flex: 1,
    height: [1080, 'px'],
    width: null,
  },
  children: [],
  componentType: 'Block',
  name: 'Index',
}];

const routes = (routes = initialState, action) => {
  const newTree = Object.assign({}, routes);
  let parent;

  switch (action.type) {
    case UPDATE_PROPS:
      (function update(tree) {
        if (tree.id === action.id) {
          tree.props[action.key] = action.value;
        } else {
          tree.children.forEach(child => update(child));
        }
      }(newTree[0]));

      return newTree;

    case ADD_CHILD:
      (function add(tree, id) {
        if (tree.id === action.id) {
          tree.children.push({
            id: action.nextId,
            props: action.props,
            children: [],
            componentType: action.componentType,
          });
        } else { tree.children.forEach(child => add(child, id)); }
      }(newTree[0], action.id));

      return newTree;

    case REMOVE_CHILD:
      (function search(tree) {
        if (tree.id === action.id) {
          parent.children = parent.children.filter(t => t.id !== action.id)
        } else if (tree.children.length) {
          parent = tree;
          tree.children.forEach(child => search(child));
        }
      }(newTree[0]));

      return newTree;

    default:
      return routes;
  }
};

export default routes;
