import React from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';


const DEVICE_WIDTH = Dimensions.get('window').width;
const CARD_GUTTER_VERTICAL = 16;
const CARD_GUTTER_HORIZONTAL = 8;
const CARD_WIDTH = DEVICE_WIDTH - 32;
const SCROLL_INTERVAL = CARD_WIDTH + CARD_GUTTER_HORIZONTAL;

export default class Post extends React.Component {
    
    scrollValue = new Animated.Value(0)
    onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: this.scrollValue } } }],
        { useNativeDriver: true }
    )

    elevate = () => {
        return {
            zIndex: this.scrollValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 2],
                extrapolate: 'clamp'
            })
        };
    }

    fadeIn = () => {
        const FULL_OPACITY = 1;

        return {
            opacity: this.scrollValue.interpolate({
                inputRange: [
                    0,
                    SCROLL_INTERVAL,
                ],
                outputRange: [0, FULL_OPACITY],
                extrapolate: 'clamp'
            })
        };
    }

    verticallyAlignComment = () => {
        const ACTIVE_POSITION = -this.props.index * (this.props.height + CARD_GUTTER_VERTICAL)

        return {
            transform: [{
                translateY: this.scrollValue.interpolate({
                    inputRange: [
                        0,
                        SCROLL_INTERVAL,
                    ],
                    outputRange: [0, ACTIVE_POSITION],
                    extrapolate: 'clamp'
                }),
            }],
        };
    }

    render() {
        return (
            <Animated.View style={[styles.container, {height: this.props.height}, this.elevate()]}>

                {/* This is our overlay component that fades in to cover up the other inactive posts */}
                <Animated.View style={[styles.overlay, this.fadeIn()]} pointerEvents="none" />

                <Animated.ScrollView
                  horizontal
                  style={styles.scrollContainer}
                  contentContainerStyle={styles.contentContainer}
                  showsHorizontalScrollIndicator={false}
                  snapToInterval={SCROLL_INTERVAL}
                  decelerationRate="fast"
                  scrollEventThrottle={1}
                  onScroll={this.onScroll}>

                    {/* This is our main title card */}
                    <View style={styles.card}>
                        <Image
                          style={styles.image}
                          width={CARD_WIDTH}
                          height={this.props.height-52}
                          source={{uri: 'https://picsum.photos/'+ CARD_WIDTH*2 +'/'+ this.props.height*1.5 +'/?gravity=center&image='+ Math.round(Math.random()*999)}}
                        />
                        <Text style={styles.text}>{this.props.title}</Text>
                    </View>

                    {/* And this is our one and only comment */}
                    <Animated.View style={[styles.card, this.verticallyAlignComment()]}>
                        <Text style={styles.text}>{this.props.comment}</Text>
                    </Animated.View>

                </Animated.ScrollView>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: CARD_GUTTER_VERTICAL/2,
    },

    scrollContainer: {
        overflow: 'visible'
    },

    contentContainer: {
        paddingHorizontal: 12,
    },

    overlay: {
        opacity: 0,
        backgroundColor: '#fff',
        position: 'absolute',
        width: DEVICE_WIDTH,
        height: 99999,
        top: -99999/2,
        left: 0,
    },

    card: {
        marginHorizontal: CARD_GUTTER_HORIZONTAL/2,
        borderRadius: 16,
        width: CARD_WIDTH,
        backgroundColor: '#eee',
        overflow: 'hidden'
    },

    image: {
        resizeMode: 'cover',
        backgroundColor: '#ddd'
    },

    text: {
        marginVertical: 12,
        marginHorizontal: 16,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600'
    }
});
