import logo from './logo.svg';
import './App.css';
import './index.css';
import { PostsList } from './features/posts/PostsList';
import { AddPostForm } from './features/posts/AddPostForm';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Navbar } from './Navbar';
import { EditPostForm } from './features/posts/EditPostForm';
import { Tictactoe } from './features/tictactoe/Tictactoe';
import { Chess } from './features/chess/Chess';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <>
                    <AddPostForm />
                    <PostsList />
                  </>
                )}
              />
              <Route exact path="/posts/:postId" component={SinglePostPage} />
              <Route exact path="/editPost/:postId" component={EditPostForm} />
              <Route exact path="/Tictactoe" component={Tictactoe} />
              <Route exact path="/Chess" component={Chess} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  )
}

export default App
