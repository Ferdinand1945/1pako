import React from 'react';
import './App.css';
import LoginForm from "./Form";
import {observer} from 'mobx-react';
import Submit from "./Submit";
import UserStore from "./stores/UserStorage";

class App extends React.Component {

  async componentDidMount(){
    try{
      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }

      });
      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }

    }
    catch (e) {
    UserStore.loading = false;
    UserStore.isLoggedIn = false;
    }

  }
  async doLogout(){
    try{
      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }

      });
      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = result.username;
      }

    }
    catch (e) {
      console.log(e)
    }

  }
  render() {
    if (UserStore.loading) {
      return (
          <div>is loading...</div>
      )
    } else {
      if (UserStore.isLoggedIn) {
        return (
            <div>
              <div>
                Welcome {UserStore.username}
                <Submit
                  text={'log Out'}
                  disabled={false}
                  onClick={()=> this.doLogout()}
                />
              </div>
            </div>
        )
      }
    }
    return (
        <div>

        <LoginForm/>
        </div>
    );
  }
}

export default observer(App);
