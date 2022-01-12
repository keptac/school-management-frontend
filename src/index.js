import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import * as serviceWorker from './serviceWorker';
import App from './App';

const options = {
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
};

ReactDOM.render((
  <HashRouter>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </HashRouter>

// <BrowserRouter>
//   <App />
// </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
