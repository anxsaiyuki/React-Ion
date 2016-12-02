import React from 'react';
import ReactDOM from 'react-dom';
import { signup, login, getUserInfo, authenticate } from '../lib/api-methods';
import { createCookie } from '../lib/helpers';
import '../scss/HomePage.scss';
import '../scss/index.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeForm: false,
      loggedIn: false,
      canLoad: false,
      signupError: false,
      loginError: false,
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.signupHandler = this.signupHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  componentWillMount() {
    authenticate().then((status) => {
      if (status.data) {
        this.setState({
          loggedIn: true
        });
      }
      this.setState({ canLoad: true });
    });
  }

  toggleForm() {
    this.setState({ activeForm: !this.state.activeForm });
  }

  signupHandler(e) {
    e.preventDefault();
    const form = document.getElementById('login-form');
    const username = form.elements[0].value;
    const password = form.elements[1].value;
    signup(username, password)
      .then((user) => {
        if (user.data) {
          createCookie('access_token', user.data.token, 7200);
          this.setState({
            loggedIn: true,
            canLoad: true,
          });
          this.toggleForm();
        } else {
          this.setState({ signupError: true });
          setTimeout(() => this.setState({ signupError: false }), 5000);
        }
      });
  }

  loginHandler(e) {
    e.preventDefault();
    const form = document.getElementById('login-form');
    const username = form.elements[0].value;
    const password = form.elements[1].value;
    login(username, password)
      .then((user) => {
        if (user.data) {
          createCookie('access_token', user.data.token, 7200);
          this.setState({
            loggedIn: true,
            canLoad: true,
          });
          this.toggleForm();
        } else {
          this.setState({ loginError: true });
          setTimeout(() => this.setState({ loginError: false }), 5000);
        }
      });
  }

  logoutHandler() {
    this.setState({
      loggedIn: false,
      canLoad: true,
    });

    // need to destroy cookie.
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }

  render() {
    return (
      <div className="home-page">
        <div className="top-bar">
          {
            this.state.loggedIn &&
            <a
              className="link-icon"
              href="/dashboard"
            >
              <i
                className="fa fa-folder-o"
                aria-hidden="true"
              />
            </a>
          }
          <a
            className="link-icon"
            href="/editor"
          >
            <i
              className="fa fa-sliders"
              aria-hidden="true"
            />
          </a>
          <a
            className="link-icon"
            href="/"
          >
            <i
              className="fa fa-home"
              aria-hidden="true"
            />
          </a>
          {
            this.state.loggedIn &&
            <button
              className="login-signup"
              onClick={this.logoutHandler}
            > {this.state.canLoad ? 'LOGOUT' : ''}
            </button>
          }
          {
            !this.state.loggedIn &&
            <button
              className="login-signup"
              onClick={this.toggleForm}
            > {this.state.canLoad ? 'LOGIN | SIGNUP' : ''}
            </button>
          }
        </div>
        <div className="banner">
          <div>
            <span> REACT-ION </span>
          </div>
        </div>
        <div
          className={this.state.activeForm
            ? 'form-visible'
            : 'form-hidden'
          }
        >
          <div className="login-signup-form">
            <div
              className={this.state.loginError || this.state.signupError
                ? 'error-box' : 'error-box-hidden'
              }
            >
              {this.state.loginError ? 'Incorrect username or password' : null}
              {this.state.signupError ? 'Username is taken' : null}
            </div>
            <form id="login-form">
              <input
                type="text"
                placeholder="username"
              />
              <input
                type="password"
                placeholder="password"
              />
              <button type="submit" className="submit-login" onClick={this.loginHandler}>
                LOGIN
              </button>
              <button type="submit" className="submit-signup" onClick={this.signupHandler}>
                SIGNUP & LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('App'));
