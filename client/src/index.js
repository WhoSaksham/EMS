import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css';
import './style/Global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root'))
  .render(<App />);
