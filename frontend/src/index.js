import React from 'react';
import ReactDOM from 'react-dom';
import EntryRouter from './components/routers/EntryRouter';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <EntryRouter />,
    document.getElementById('root')
);

registerServiceWorker();
