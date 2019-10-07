import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';
import App from './components/App/js/App';
import configureStore from './store/configureStore';

const store=configureStore(),
    jsx=(
        <Provider store={store}>
            <App />
        </Provider>
    );

ReactDOM.render(jsx, document.getElementById('root'));
