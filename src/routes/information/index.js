import { h, Component } from 'preact';
import { Grid, Icon } from 'semantic-ui-react';

export default class Information extends Component {
    render() {
        return (
            <Grid divided='vertically'>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <h1>Information</h1>

                        <p>This service is using Google Cloud Platform.</p>

                        <p>Steps:</p>

                        <ul>
                            <li>Upload images to a bucket</li>
                            <li>PubSub event sent to worker with information about the new images</li>
                            <li>Compress the images by using Guetzli</li>
                            <li>Publish an event for finished images</li>
                            <li>Move the compressed images to a new bucket</li>
                        </ul>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
