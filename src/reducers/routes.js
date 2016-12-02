import _ from 'lodash';
import { UPDATE_TREE_INFO, UPDATE_ROUTES, UPDATE_PROPS, UPDATE_INFOS, ADD_CHILD, REMOVE_CHILD, UNDO, REDO, ADD_PAGE } from '../actions/routes';
import store from '../store/store';
import emptyCanvas from '../lib/emptyCanvas';

const routes = (routes = emptyCanvas, action) => {
  const { actionType, value, key, id, type } = action;

  const newTree = _.cloneDeep(routes);
  const currentPage = store ? store.getState().pageSelected : 0;
  let parent;

  const moveToPast = (tree, routes, actionType) => {
    if (actionType !== 'onChange') {
      tree.past.push(_.cloneDeep(routes.appPages[currentPage].present));
      if (tree.past.length >= 5) {
        tree.past.shift();
      }
    }
  };

  switch (type) {

    case UPDATE_PROPS:
      const pagePath = newTree.appPages[store.getState().pageSelected];
      if (actionType === 'onMouseUp') {
         if (_.isEqual(pagePath.past[pagePath.past.length - 1], pagePath.present)) {
           pagePath.past.pop();
         }
      } else if (actionType === 'Carousel') {
        moveToPast(pagePath, routes, actionType);
        const update = (tree) => {
          if (tree.id === id) {
           tree.props.settings[key] = value;
          } else {
            tree.children.forEach(child => update(child));
          }
        };
        update(pagePath.present);
        return newTree;
      } else {
        moveToPast(pagePath, routes, actionType);
        const update = (tree) => {
          if (tree.id === id) {
            tree.props[key] = value;
          } else {
            tree.children.forEach(child => update(child));
          }
        };
        update(pagePath.present);
      }
      
      return newTree;

    case UPDATE_INFOS:

      moveToPast(newTree.appPages[store.getState().pageSelected], routes);
      const updateInfo = (tree) => {
        if (tree.id === id) {
          tree[key] = value;
        } else {
          tree.children.forEach(child => updateInfo(child));
        }
      };
      updateInfo(newTree.appPages[store.getState().pageSelected].present);

      return newTree;

    case ADD_CHILD:
      moveToPast(newTree.appPages[store.getState().pageSelected], routes);
      (function add(tree, id) {
        if (tree.id === id) {
          tree.children.push({
            id: action.nextId,
            props: action.props,
            children: [],
            componentType: action.componentType,
            parent: tree,
            name: action.name,
          });
        } else { tree.children.forEach(child => add(child, id)); }
      }(newTree.appPages[store.getState().pageSelected].present, id));

      if (action.componentType !== 'Text') {
        newTree.totalComponents += 1;
      }
      return newTree;

    case ADD_PAGE:

      newTree.appPages.push({
        past: [],
        present: {
          id: action.nextId,
          props: {
            backgroundColor: 'rgba(255,255,255,.1)',
            flex: 1,
            height: [1080, 'px'],
            width: null,
            flexDirection: 'column',
            margin: '0px',
          },
          children: [],
          componentType: 'Block',
          parent: null,
          name: action.name,
        },
        future: [],
      });

      if (action.componentType !== 'Text') {
        newTree.totalComponents += 1;
      }

      newTree.pages.push(action.nextId);

      return newTree;

    case REMOVE_CHILD:
      moveToPast(newTree.appPages[store.getState().pageSelected], routes);
      (function search(tree) {
        if (tree.id === id) {
          parent.children = parent.children.filter(t => t.id !== id);
        } else if (tree.children.length) {
          parent = tree;
          tree.children.forEach(child => search(child));
        }
      }(newTree.appPages[store.getState().pageSelected].present));

      if (action.componentType !== 'Text') {
        newTree.totalComponents -= 1;
      }

      return newTree;

    case UNDO:
      const popped = newTree.appPages[currentPage].past.pop();
      newTree.appPages[currentPage].future.push(_.cloneDeep(newTree.appPages[currentPage].present));
      newTree.appPages[currentPage].present = _.cloneDeep(popped);
      return newTree;

    case REDO:
      newTree.appPages[currentPage].past.push(_.cloneDeep(newTree.appPages[currentPage].present));
      newTree.appPages[currentPage].present = (_.cloneDeep(newTree.appPages[currentPage].future.pop()));
      return newTree;

    case UPDATE_TREE_INFO:
      newTree[action.key] = value;

      return newTree;
    case UPDATE_ROUTES:
      return action.routes;

    default:
      return routes;
  }
};


export default routes;
