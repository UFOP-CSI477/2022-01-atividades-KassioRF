import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import AppRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUser } from './services/userAuth';

const root = ReactDOM.createRoot(  
  document.getElementById('root') as HTMLElement
);
  
root.render(
  // <React.StrictMode>
  <AppRoutes />
  // </React.StrictMode>
);

