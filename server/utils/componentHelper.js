const filePath = require('./filePaths');

const BLOCK_COMPONENT = 'Block';


module.exports.getComponent = (tree) => {
  const type = tree.componentType;
  let componentPath = '';

  switch(type) {
    case BLOCK_COMPONENT:
      componentPath = filePath.BLOCK_TEMPLATE_PATH;
      break;
    default:
      break;
  }

  return componentPath;
};
