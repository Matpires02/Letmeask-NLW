import { BrowserRouter, Route, Switch } from 'react-router-dom';
// para criar as rotas é preciso do BrowserRouter e Route
//Switch: não deixa que 2 caminhos sejam satisfeitos  
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

// exact serve para o react saber que tem que ser exatamente esse caminho

export default App;
