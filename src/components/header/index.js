import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import feather from 'feather';

import style from './style';

export default class Header extends Component {
    render() {
        return (
            <header class={style.header}>
                <h1>{feather.toSvg('home')} {this.props.title}</h1>
                <nav>
                    <Link activeClassName={style.active} href="/">Home</Link>
                </nav>
            </header>
        );
    }
}
