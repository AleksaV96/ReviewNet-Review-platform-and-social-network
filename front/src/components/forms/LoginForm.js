//import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './Form.module.css';

function LoginForm(){
      return (
          <Card>
            <form className={classes.form}>
              <div className={classes.control}>
                <label htmlFor='username'>Username</label>
                <input type='name' required id='username' />
              </div>
              <div className={classes.control}>
                <label htmlFor='password'>Password</label>
                <input type='password' required id='password' />
              </div>
              <div className={classes.actions}>
                  <button>Login</button>
              </div>
            </form>
          </Card>
      );
}
export default LoginForm;