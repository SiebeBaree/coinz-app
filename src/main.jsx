import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Background() {
  document.body.style.background = "#000212";
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Background />
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
