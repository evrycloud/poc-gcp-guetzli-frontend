import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { Container, Menu } from 'semantic-ui-react'

import style from './style';

export default class Header extends Component {
    render() {
        return (
            <header class={style.header}>
                <Menu fixed='top' defaultActiveIndex={1} inverted>
                    <Container>
                        <Menu.Item as='a' header>
                            Guetzli
                        </Menu.Item>
                        <Menu.Item as='a' active>Home</Menu.Item>
                    </Container>
                </Menu>
            </header>
        );
    }
}
