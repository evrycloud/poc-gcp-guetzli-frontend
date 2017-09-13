import { h, Component } from 'preact';
import fetch from 'unfetch';
import Instantly from 'instantly';
import style from './style';

import { Form, Grid } from 'semantic-ui-react';

import Notifications from '../../components/notifications';

export default class Home extends Component {
    state = {
        files: [],
        notifications: [],
        uploading: false,
    };

    componentDidMount() {
        this.listenSSE();
    }

    listenSSE() {
        const es = new Instantly('http://127.0.0.1:1337/notification');

        es.on('message', msg => {
            const { notifications } = this.state;

            const data = JSON.parse(msg.data);

            const update = [...notifications].filter(file => file.name !== data.name);

            update.push(data);

            this.setState({
                notifications: update
            });
        });

        es.listen();
    }

    onImageChange = (event) => {
        event.preventDefault();

        this.setState({ files: event.target.files });
    }

    onSubmit = async (event) => {
        const data = new FormData();

        const { files } = this.state;

        let len = files.length;

        while (len--) {
            data.append('images', files[len]);
        }

        try {
            this.setState({
                uploading: true
            });

            await fetch('http://localhost:1337/images/upload', {
                method: 'POST',
                body: data
            });

            this.clearInput();

            this.setState({
                uploading: false,
            })
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const {
            notifications,
            uploading
        } = this.state;

        return (
            <div class={style.home}>
                <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <h1>Upload images</h1>

                            <p>This service is using Google Cloud Platform.</p>

                            <p>Steps:</p>

                            <ul>
                                <li>Upload images to a bucket</li>
                                <li>PubSub event sent to worker with information about the new images</li>
                                <li>Compress them by using Guetzli</li>
                                <li>Publish an event for finished images</li>
                                <li>Move the compressed images to a new bucket</li>
                            </ul>

                            <section>
                                <Form onSubmit={this.onSubmit}>
                                    <h2>Choose a file to upload</h2>
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            onChange={this.onImageChange}
                                            icon="cloud upload"
                                            type="file"
                                            placeholder="Search..."
                                            multiple
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Button
                                            loading={uploading}
                                            size="big">Submit
                                        </Form.Button>
                                    </Form.Group>
                                </Form>
                            </section>
                        </Grid.Column>

                        <Grid.Column>
                            <Notifications notifications={notifications} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}
