import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // COMMENT REACT.SCTRICT MODE TO AVOID CONFLICT WITH PIXI
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
