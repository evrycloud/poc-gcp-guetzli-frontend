import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { Icon } from 'semantic-ui-react'

import style from './style';

export default class Header extends Component {
    render() {
        return (
            <header class={style.header}>
                <h1>{this.props.title}</h1>
                <nav>
                    <Link activeClassName={style.active} href="/"><Icon name="home" size="large" /></Link>
                </nav>
            </header>
        );
    }
}
