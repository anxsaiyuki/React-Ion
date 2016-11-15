const ejs = require('ejs');
const fs = require('fs.extra');
const path = require('path');


module.exports.toSnake = (string) => {
  return string.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
};

module.exports.addProps = (tree) => {
  const convertedProps = {
    flex: tree.props.flex || 1,
    backgroundColor: tree.props.backgroundColor || 'black',
    display: tree.props.display || 'flex',
    alignItems: tree.props.alignItems || 'center',
    justifyContent: tree.props.justifyContent || 'center',
    height: `${tree.props.height}px` || '20%',
    width: `${tree.props.width}%` || '20%',
    padding: tree.props.padding || '20px',
    margin: tree.props.margin || '20px',
    position: tree.props.position || 'relative',
    flexWrap: tree.props.flexWrap || 'wrap',
    boxSizing: tree.props.boxSizing || 'border-box',
  };

  return convertedProps;
};

const createCss = (tree) => {
  const w = tree.props.width ? (tree.props.width[0] + tree.props.width[1]) : '100%';
  const h = tree.props.height ? (tree.props.height[0] + tree.props.height[1]) : '20px';

  const convertedCss = {
    flex: tree.props.flex || 1,
    'background-color': tree.props.backgroundColor || 'black',
    display: tree.props.display || 'flex',
    'align-items': tree.props.alignItems || 'center',
    'justify-content': tree.props.justifyContent || 'center',
    height: h,
    width: w,
    padding: tree.props.padding || '20px',
    margin: tree.props.margin || '20px',
    position: tree.props.position || 'relative',
    'flex-wrap': tree.props.flexWrap || 'wrap',
    'box-sizing': tree.props.boxSizing || 'border-box',
  };

  return convertedCss;
};

module.exports.createCss = createCss;

module.exports.combineCss = (tree) => {
  // let tempTree = tree;
  const cssArry = [];

  const pushToCss = (data) => {
    cssArry.push({
      name: data.name,
      componentType: data.componentType,
      convertedCss: createCss(data),
    });
  };

  pushToCss(tree);

  tree.children.forEach((child) => {
    if (child.componentType === 'Text') {
      pushToCss(child);
    }
  });

  return { cssResults: cssArry };
};

module.exports.cssSetup = (cssObj, userId, cb) => {
  const cssArry = cssObj.cssResults;
  const cssTemplatePath = path.join(__dirname, '../templates/cssTemplate.ejs');
  const cssPath = path.join(__dirname, `../../user/${userId}/src/css`);

  ejs.renderFile(cssTemplatePath, cssObj, (err, css) => {
    fs.writeFile(`${cssPath}/${cssArry[0].name}.css`, css, (err2) => {
      if (err2) {
        console.log(err2);
      }
      cb();
    });
  });
};

module.exports.webpackSetup = (tree, userId, cb) => {
  const webpackTemplatePath = path.join(__dirname, '../templates/webpackConfigTemplate.ejs');
  const webpackConfigPath = path.join(__dirname, `../../user/${userId}`);

  ejs.renderFile(webpackTemplatePath, tree, (err, html) => {
    fs.writeFile(`${webpackConfigPath}/webpack.config.js`, html, (err2) => {
      if (err2) {
        console.log(err2);
      }
      cb();
    });
  });
};

module.exports.serverSetup = (tree, userId, callback) => {
  const serverTemplatePath = path.join(__dirname, '../templates/serverTemplate.ejs');
  const serverPath = path.join(__dirname, `../../user/${userId}/server`);

  ejs.renderFile(serverTemplatePath, tree, (err, html) => {
    fs.writeFile(`${serverPath}/server.js`, html, (err2) => {
      if (err2) {
        console.log(err2);
      }
      callback();
    });
  });
};

module.exports.routerSetup = (tree, userId, callback) => {
  const routerTemplatePath = path.join(__dirname, '../templates/components/reactRouteTemplate.ejs');
  const routerAppPath = path.join(__dirname, `../../user/${userId}/src/js`);

  ejs.renderFile(routerTemplatePath, tree, (err, html) => {
    fs.writeFile(`${routerAppPath}/App.jsx`, html, (err2) => {
      if (err2) {
        console.log(err2);
      }
      callback();
    });
  });
};


module.exports.htmlSetup = (tree, userId, callback) => {
  const htmlTemplatePath = path.join(__dirname, '../templates/htmlTemplate.ejs');
  const htmlPath = path.join(__dirname, `../../user/${userId}/src`);
  const pageTemplatePath = path.join(__dirname, '../templates/pageTemplate.ejs');
  const pageJsonPath = path.join(__dirname, `../../user/${userId}`);

  const page = tree.routes;
  const pageObj = { pageData: [] };
  const pageLength = tree.routes.length;
  let counter = 0;

  const generatePageJson = (cb) => {
    page.forEach((single) => {
      pageObj.pageData.push({
        name: single.name,
        path: `./src/js/${single.name}.jsx`,
      });
    });
    ejs.renderFile(pageTemplatePath, pageObj, (err3, html) => {
      fs.writeFile(`${pageJsonPath}/page.json`, html, (err4) => {
        if (err4) {
          console.log(err3);
        }
        cb();
      });
    });
  };

  const generateHtml = (treeData) => {
    ejs.renderFile(htmlTemplatePath, treeData, (err, html) => {
      fs.writeFile(`${htmlPath}/${treeData.name}.html`, html, (err2) => {
        if (err2) {
          console.log(err2);
        }
        counter += 1;
        if (counter !== pageLength) {
          generateHtml(page[counter]);
        } else {
          callback();
        }
      });
    });
  };

  generatePageJson(() => {
    generateHtml(page[counter]);
  });
};