import { h, Component } from 'preact';
import fetch from 'unfetch';
import Instantly from 'instantly';
import chunk from 'lodash.chunk';
import style from './style';

import { Container, Form, Grid, Icon, Image } from 'semantic-ui-react';

import Notifications from '../../components/notifications';

export default class Home extends Component {
    state = {
        files: [],
        notifications: [],
        images: [],
        uploading: false,
    };

    // All fetching logic should be moved to redux
    componentDidMount() {
        this.listenSSE();

        this.getImages();
    }

    listenSSE() {
        const es = new Instantly('https://api-dot-guetzli-179112.appspot.com/notification');

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

    getImages = async () => {
        const res = await fetch('https://api-dot-guetzli-179112.appspot.com/images/list');

        const images = await res.json();

        this.setState({
            images
        });
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

            await fetch('https://api-dot-guetzli-179112.appspot.com/images/upload', {
                method: 'POST',
                body: data
            });

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
            uploading,
            images
        } = this.state;

        const chunks = chunk(images, 9);

        return (
            <Grid divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <h1><Icon name="cloud upload" /> Upload images</h1>

                        <Form onSubmit={this.onSubmit}>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    onChange={this.onImageChange}
                                    icon="cloud upload"
                                    type="file"
                                    placeholder="Upload..."
                                    multiple
                                />
                            </Form.Group>

                             <Form.Group>
                                <Form.Button
                                    loading={uploading}
                                    size="small"
                                >
                                    Submit
                                </Form.Button>
                            </Form.Group>
                        </Form>
                    </Grid.Column>

                    <Grid.Column>
                        <Notifications notifications={notifications} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={1}>
                    <Grid.Column>
                        <h2><Icon name="image" /> Compressed images</h2>
                    </Grid.Column>
                </Grid.Row>

                {chunks.map(chunk => (
                    <Grid.Row columns={9}>
                        {chunk.map(({ mediaLink }) => (
                            <Grid.Column>
                                <Image src={mediaLink} href={mediaLink} shape="rounded" size="small" />
                            </Grid.Column>
                        ))}
                    </Grid.Row>
                ))}
            </Grid>
        );
    }
}
