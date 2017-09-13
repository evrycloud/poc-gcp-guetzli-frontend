import { h, Component } from 'preact';
import { List, Icon } from 'semantic-ui-react'
import style from './style';

export default class Notifications extends Component {
    getIcon(status) {
        if (status === 'compressing') {
            return 'time';
        } else if (status === 'failed') {
            return 'cancel';
        } else if (status === 'finished') {
            return 'check';
        }
    }

    render() {
        const {
            notifications
        } = this.props;

        return (
            <aside>
                <h1><Icon name="feed" /> Activity</h1>
                <List className={style.activityList} divided relaxed>
                    {notifications && notifications.map(({ name, status }) => (
                        <List.Item>
                            <List.Icon name={this.getIcon(status)} size="large" verticalAlign="middle" />
                            <List.Content>
                                <List.Header as="a">{name}</List.Header>
                                <List.Description as="a">Status: <strong>{status}</strong></List.Description>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </aside>
        );
    }
}
