import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Platform, View} from 'react-native';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Orientation from 'react-native-orientation-locker';
import {ScaledSheet} from 'react-native-size-matters';
import Video from 'react-native-video';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const FGVideoPlayer = props => {
  const {video} = props;
  const videoPlayer = useRef(null);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [isLoading, setIsLoading] = useState(true);

  const onSeek = (seek: any) => {
    videoPlayer?.current.seek(seek);
  };
  const onPaused = (newState: any) => {
    setPaused(!paused);
    setPlayerState(newState);
  };
  const onProgress = data => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };
  const onLoad = data => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  // This function is triggered when the player reaches the end of the media.
  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };
  const onSeeking = (currentVideoTime: any) => setCurrentTime(currentVideoTime);
  const onReplay = () => {
    videoPlayer?.current.seek(0);
    setCurrentTime(0);
    if (Platform.OS === 'android') {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };
  const [isFullScreen, setIsFullScreen] = useState(false);
  const goFullScreen = () => {
    if (!isFullScreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        ref={ref => (videoPlayer.current = ref)}
        source={video} // the video file
        paused={paused} // make it start
        onProgress={onProgress}
        style={
          !isFullScreen
            ? styles.backgroundVideo
            : styles.backgroundVideoFullScreens
        } // any style you want
        repeat={true} // make it a loop
        resizeMode={'cover'}
      />
      <MediaControls
        isFullScreen={isFullScreen}
        duration={duration}
        isLoading={isLoading}
        progress={currentTime}
        onFullScreen={goFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        mainColor={
          props.mainColor ? props.mainColor : 'rgba(255, 255, 255, 0.5)'
        }
        playerState={playerState}
        style={
          !isFullScreen
            ? styles.backgroundVideo
            : styles.backgroundVideoFullScreens
        }
        sliderStyle={
          isFullScreen
            ? {
                containerStyle: styles.mediaControlFull,
                thumbStyle: {},
                trackStyle: {},
              }
            : {
                containerStyle: styles.mediaControls,
                thumbStyle: {},
                trackStyle: {},
              }
        }
      />
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfdfdf',
  },
  backgroundVideo: {
    height: 250,
    width: screenWidth,
  },
  backgroundVideoFullScreens: {
    height: screenWidth,
    width: screenHeight,
  },
  mediaControls: {
    width: screenWidth - 30,
    height: '100%',
    flex: 1,
    alignSelf:
      Platform.OS === 'android'
        ? screenHeight < 800
          ? 'center'
          : 'flex-start'
        : 'center',
  },
  mediaControlFull: {
    paddingHorizontal: 16,
    width: screenHeight - 40,
    height: screenWidth,
    flex: 1,
    alignSelf:
      Platform.OS === 'android'
        ? screenHeight < 800
          ? 'center'
          : 'flex-start'
        : 'center',
  },
  backgroundVideoFullScreen: {
    height: screenWidth,
    width: screenHeight,
  },
});
export default FGVideoPlayer;
