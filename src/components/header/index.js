import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { Home } from 'react-feather';

import style from './style';

export default class Header extends Component {
    render() {
        return (
            <header class={style.header}>
                <h1>{this.props.title}</h1>
                <nav>
                    <Link activeClassName={style.active} href="/"><Home /></Link>
                </nav>
            </header>
        );
    }
}
