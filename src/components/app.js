import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';

@connect(state => ({
    data: state.data
}))
export default class App extends Component {
    /** Gets fired when the route changes.
     *  @param {Object} event       "change" event from [preact-router](http://git.io/preact-router)
     *  @param {string} event.url   The newly routed URL
     */
    handleRoute = e => {
        this.currentUrl = e.url;
    };

    render() {
        const { data } = this.props;

        return (
            <div id="app">
                <Header title={data.title} />
                <Router onChange={this.handleRoute}>
                    <Home path="/" {...data} />
                </Router>
            </div>
        );
    }
}
