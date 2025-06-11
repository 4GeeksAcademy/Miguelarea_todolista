import React from 'react'
import ReactDOM from 'react-dom/client'

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"
import { Import } from 'lucide-react';

// index.css'


// components

import ListaDeTareas from './components/ListaDeTareas';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ListaDeTareas/>
  </React.StrictMode>,
)
