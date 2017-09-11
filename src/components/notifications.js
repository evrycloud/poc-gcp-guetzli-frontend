/*
var es = new Instantly('http://your-sse-endpoint.codes/channel');

es.on('message', function newMessage(msg) {
    console.log(msg.data);
});

es.on('eventName', function newMessage(msg) {
    console.log(msg.data);
});

es.listen();
*/

import { h, Component } from 'preact';
import feather from 'feather';
import style from './style';

export default class Notifications extends Component {
    render() {
        return (
            <aside class={style.sidebar}>
                <h1>{feather.toSvg('activity')} Progress</h1>
                <section></section>
            </aside>
        );
    }
}
