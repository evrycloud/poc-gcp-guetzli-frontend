import { Provider } from 'preact-redux';
import { h, render } from 'preact';
import { createStore } from 'redux';

import './style';
import App from './components/app';
import summary, { fetchSummary } from './redux/summary';

const store = createStore(summary);

const { dispatch } = store;

// Move this logic else where
fetchSummary(dispatch)

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);


