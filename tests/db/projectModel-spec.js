/* eslint-disable no-unused-expressions */
// uses names 'gold', 'silver', 'copper';

const mocha = require('mocha');
const expect = require('chai').expect;
const Project = require('../../db/models/projectModel.js');
const User = require('../../db/models/userModel.js');

const describe = mocha.describe;
const it = mocha.it;
const before = mocha.before;
const beforeEach = mocha.beforeEach;
const after = mocha.after;

describe('Project Model', () => {
  const permissionId = 1;
  const name = 'gold';
  const projectTree = 'hahaha123';
  const newProject = { name, project_tree: projectTree };
  let userId;
  let userId2;

  const newProject3 = {};
  Object.assign(newProject3, newProject);
  newProject3.name = 'silver';
  const newProject4 = {};
  Object.assign(newProject4, newProject);
  newProject4.name = 'copper';

  const newUser = {
    username: 'neverused',
    password: 'watever',
    salt: 'notasalt',
  };
  const newUser2 = {
    username: 'alwaysused',
    password: 'watever2',
    salt: 'notasalt',
  };

  before((done) => {
    User.create(newUser, (err, { id }) => {
      if (err) { console.error(err); }
      userId = id;
      User.create(newUser2, (err2, user) => {
        if (err2) { console.error(err2); }
        userId2 = user.id;
        done();
      });
    });
  });

  beforeEach((done) => {
    Project.remove({}, (err) => {
      if (err) { console.error(err); }
      done();
    });
  });

  after((done) => {
    Project.remove({}, (err) => {
      if (err) { console.error(err); }
      User.remove({ username: 'neverused' }, (err2) => {
        if (err2) { console.error(err2); }
        User.remove({ username: 'alwaysused' }, (err3) => {
          if (err3) { console.error(err3); }
          done();
        });
      });
    });
  });

  describe('Project creation: ', () => {
    it('Does not add invalid projects to database', (done) => {
      Project.create({ userId, permissionId }, { name: '123' }, (err) => {
        expect(err).to.exist;
        done();
      });
    });

    it('Adds valid projects to database', (done) => {
      Project.create({ userId, permissionId }, newProject, (err, project) => {
        expect(err).to.not.exist;
        expect(project.name).to.equal('gold');
        done();
      });
    });
  });

  describe('Project Update: ', () => {
    it('Does not add or remove projects from database', (done) => {
      Project.create({ userId, permissionId }, newProject, (err, project) => {
        expect(err).to.not.exist;
        const newProject2 = {};
        Object.assign(newProject2, newProject);
        newProject2.project_tree = 'captainfalcon';
        newProject2.id = project.id;
        Project.update(newProject, newProject2, (err2) => {
          expect(err2).to.not.exist;
          Project.find({}, (err3, projects) => {
            expect(err3).to.not.exist;
            expect(projects.length).to.not.equal(0);
            done();
          });
        });
      });
    });

    it('Updates existing projects in database', (done) => {
      Project.create({ userId, permissionId }, newProject, (err) => {
        expect(err).to.not.exist;
        const newProject2 = {};
        Object.assign(newProject2, newProject);
        newProject2.project_tree = 'notRandom';
        Project.update(newProject, newProject2, (err2, projects) => {
          expect(err2).to.not.exist;
          expect(projects[0].project_tree).to.equal('notRandom');
          done();
        });
      });
    });
  });

  describe('Project find: ', () => {
    beforeEach((done) => {
      Project.create({ userId, permissionId }, newProject, (err) => {
        expect(err).to.not.exist;
        Project.create({ userId, permissionId }, newProject3, (err2) => {
          expect(err2).to.not.exist;
          Project.create({ userId, permissionId }, newProject4, (err3) => {
            expect(err3).to.not.exist;
            done();
          });
        });
      });
    });

    it('Gets all projects if passed empty object', (done) => {
      Project.find({}, (err4, projects) => {
        expect(err4).to.not.exist;
        expect(projects.length).to.be.above(2);
        done();
      });
    });

    it('Uses object as search query when passed object with properties', (done) => {
      Project.find({ name: 'silver' }, (err4, projects) => {
        expect(err4).to.not.exist;
        expect(projects.length).to.equal(1);
        expect(projects[0].name).to.equal('silver');
        done();
      });
    });
  });

  describe('Project remove: ', () => {
    beforeEach((done) => {
      Project.create({ userId, permissionId }, newProject, (err) => {
        expect(err).to.not.exist;
        Project.create({ userId, permissionId }, newProject3, (err2) => {
          expect(err2).to.not.exist;
          done();
        });
      });
    });

    it('Removes project based on search query when passed object with properties', (done) => {
      Project.remove({ name: 'gold' }, (err3) => {
        expect(err3).to.not.exist;
        Project.find({}, (err4, projects) => {
          expect(err4).to.not.exist;
          expect(projects.length).to.equal(1);
          expect(projects[0].name).to.equal('silver');
          done();
        });
      });
    });
  });

  describe('Getting user projects: ', () => {
    beforeEach((done) => {
      Project.create({ userId, permissionId }, newProject, (err) => {
        expect(err).to.not.exist;
        Project.create({ userId, permissionId }, newProject3, (err2) => {
          expect(err2).to.not.exist;
          Project.create({ userId: userId2, permissionId }, newProject4, (err3) => {
            expect(err3).to.not.exist;
            done();
          });
        });
      });
    });
    it('Gets all project of a user', (done) => {
      Project.findUserProjects(userId, (err4, projects) => {
        expect(err4).to.not.exist;
        expect(projects.length).to.equal(2);
        expect(projects[0].name).to.equal('gold');
        expect(projects[1].name).to.equal('silver');
        done();
      });
    });
  });
});
