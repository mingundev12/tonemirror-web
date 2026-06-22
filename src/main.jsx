import ReactDOM from 'react-dom/client';
import './index.css';
import 'flag-icons/css/flag-icons.min.css';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);