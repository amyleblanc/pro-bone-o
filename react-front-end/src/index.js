import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Application />, document.getElementById('root'));

serviceWorker.unregister();
