import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'react-table/react-table.css';
import 'react-tabs/style/react-tabs.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
