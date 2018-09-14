import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from '../src/components/App';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import registerServiceWorker from '../src/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
