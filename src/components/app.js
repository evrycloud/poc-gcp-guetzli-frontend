import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Header from './header';
import Home from '../routes/home';
import Information from '../routes/information';

const App = () => (
    <BrowserRouter>
        <Container style={{ marginTop: '4em' }}>
            <Header title="Guetzli PoC" />

            <Switch>
                <Route path="/" component={Home} />
                <Route path="/information" component={Information} />
            </Switch>
        </Container>
    </BrowserRouter>
);

export default App;
