const ejs = require('ejs');
const fs = require('fs.extra');
const path = require('path');
const helper = require('./generateHelper');

const structureSetup = (tree, user, callback) => {
  helper.webpackSetup(tree, user, () => {
    helper.serverSetup(tree, user, () => {
      if (tree.router === 1) {
        helper.routerSetup(tree, user, () => {
          callback();
        });
      } else {
        helper.htmlSetup(tree, user, () => {
          callback();
        });
      }
    });
  });
};

module.exports = (tree, cb) => {
  const user = 1;
  const componentTotal = tree.total;
  let counter = 0;

  // Paths
  const componentPath = path.join(__dirname, `../../user/${user}/src/components`);
  const mainJsPath = path.join(__dirname, `../../user/${user}/src/js`);
  const userPath = path.join(__dirname, `../../user/${user}`);
  const structurePath = path.join(__dirname, '../../server/structure');

  const generateFile = (treeData, inital) => {
    const tempTreeData = treeData;
    if (inital && tree.router === 0) {
      tempTreeData.initial = true;
    } else {
      tempTreeData.initial = false;
    }

    // tempTreeData.convertedProps = helper.addProps(tempTreeData);
    // tempTreeData.convertedCss = helper.createCss(tempTreeData);
    helper.cssSetup(helper.combineCss(tempTreeData), user, () => {
      ejs.renderFile(path.join(__dirname, '../templates/components/blockComponent.ejs'), tempTreeData, (err, html) => {
        const jsPath = inital ? mainJsPath : componentPath;

        fs.writeFile(`${jsPath}/${tempTreeData.name}.jsx`, html, (err2) => {
          if (err2) {
            console.error(err2);
          }
          counter += 1;
          if (tempTreeData.children.length !== 0) {
            tempTreeData.children.forEach((component) => {
              if (component.componentType !== 'Text') {
                generateFile(component);
              }
            });
          } else if (counter === componentTotal) {
            cb();
          }
        });
      });
    });
  };

  fs.rmrf(userPath, (err) => {
    if (err) {
      console.error(err);
    }

    fs.copyRecursive(structurePath, userPath, (err2) => {
      if (err2) {
        throw err2;
      }
      console.log("Copied 'structure' to 'user'");
      structureSetup(tree, user, () => {
        for (let i = 0; i < tree.routes.length; i += 1) {
          generateFile(tree.routes[i], true);
        }
      });
    });
  });
};
