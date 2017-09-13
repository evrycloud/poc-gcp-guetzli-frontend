import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Header from './header';
import Home from '../routes/home';
import Information from '../routes/information';

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
            <Container style={{ marginTop: '4em' }}>
                <Header title={'Guetzli PoC'} />
                <Router onChange={this.handleRoute}>
                    <Home path="/" />
                    <Information path="/information" />
                </Router>
            </Container>
        );
    }
}
