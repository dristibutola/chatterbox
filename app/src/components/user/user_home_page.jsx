import React from 'react';
import NavBar from '../nav-bar/nav_bar.jsx';
import FriendsList from '../friends/friends_list.jsx';
import currentUserStore from '../../stores/current_user_store.js';

class UserHomePage extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.navigateToSearchResultsPage = this.navigateToSearchResultsPage.bind(this);
    this.__ensureLoggedIn = this.__ensureLoggedIn.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount () {
    this.__ensureLoggedIn();
  }

  componentDidMount () {
    currentUserStore.addChangeListener(this.__ensureLoggedIn);
  }

  componentWillUnmount () {
    currentUserStore.removeChangeListener(this.__ensureLoggedIn);
  }

  navigateToSearchResultsPage (username) {
    this.context.router.push({
      pathname: '/users/search',
      query: { username: username }
    });
  }

  __ensureLoggedIn () {
    if (!currentUserStore.isLoggedIn()) {
      this.context.router.push('/');
    }
  }

  render () {
    return (
        <div className="user-home-page">
          <NavBar successfulUserSearch={ this.navigateToSearchResultsPage }/>
          <FriendsList />
        </div>
     );
  }
}

export default UserHomePage;
