import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { Container, Menu } from 'semantic-ui-react'

import style from './style';

export default class Header extends Component {
    state = {
        activeItem: 'home'
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <header class={style.header}>
                <Menu fixed='top' defaultActiveIndex={1} inverted>
                    <Container>
                        <Menu.Item as='a' header>
                            Guetzli
                        </Menu.Item>
                        <Menu.Item
                            name="home"
                            active={activeItem === "home"}
                            onClick={this.handleItemClick}
                        >
                            <Link href="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item
                            name="information"
                            active={activeItem === "information"}
                            onClick={this.handleItemClick}
                        >
                            <Link href="/information">Information</Link>
                        </Menu.Item>
                    </Container>
                </Menu>
            </header>
        );
    }
}
