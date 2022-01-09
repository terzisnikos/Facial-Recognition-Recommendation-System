import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import reactLogo from '../../images/react-logo.svg';

import s from './Starter.module.scss';

const Starter: FC = () => {
  return (
    <div className={s.root}>
      <div className={s.starterBlock}>
        <img src={reactLogo} alt="react"/>
        <h3 className="my-3 align-self-center">
          Welcome to your Facial Recognition Recommendation System application!
        </h3>
        <p>
          This is a react/nodejs app
          For guides and documentation please check your local README.md and <a href="https://flatlogic.com/documentation">Documentation</a>.
        </p>
        <div className={s.buttons}>
          <Link to={'/login'}>
            <Button type="submit" color="warning" className="auth-btn my-3" size="sm">Login</Button>
          </Link>
          <Link className="mr-3" to={'/register'}>
            <Button type="submit" color="warning" className="auth-btn my-3 mx-3" size="sm">Sign up</Button>
          </Link>
        </div>
        <div className={s.links}>
          <h5>More useful links</h5>
          <div>
            🌟
            <a target={"_blank"} href="https://reactjs.org/">
              {' '}
              ReactJS
            </a>
          </div>
          <div>
            ✨

            <a target={"_blank"} href="https://nodejs.org/en/">
              {' '}
              Node.js
            </a>

          </div>
          <div>
            ⭐
            <a target={"_blank"} href="https://reactstrap.github.io/">
              {' '}
              Reactstrap
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Starter;
