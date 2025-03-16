import logo from './logo.svg';
import './App.css';
import Body from './components/Body';
import appStore from './appStore';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
        <Body/>
      </Provider>
     
    </div>
  );
}

export default App;
