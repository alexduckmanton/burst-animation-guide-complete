import React from 'react';
import {
    Dimensions,
    ScrollView,
} from 'react-native';

import Post from './Post';

const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class App extends React.Component {
    state = {
        posts: [
            {
                title: 'Peace on earth declared',
                comment: 'Piece of cake'
            },
            {
                title: 'Cats superior to dogs, find scientists',
                comment: '*Goes back to sleep* — cats everywhere'
            },
            {
                title: 'Pineapple on pizza ruled a flavour hazard',
                comment: 'But what about beetroot on burgers?'
            },
        ]
    }

    render() {
        return (
            <ScrollView contentInsetAdjustmentBehavior="scrollableAxes">
                {this.state.posts.map((post, i) => {
                    return <Post {...post} height={DEVICE_HEIGHT/3.75} index={i} key={i} />
                })}
            </ScrollView>
        );
    }
}
