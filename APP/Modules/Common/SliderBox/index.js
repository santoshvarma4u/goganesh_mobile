/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';

import {Indicator} from './indicator.js';
import {styles} from './style.js';

const {width} = Dimensions.get('screen');
const FGSliderBox = ({
  data = [],
  timer = 10000,
  autoPlay = true,
  showIndicator = true,
  activeIndicatorStyle = {},
  inActiveIndicatorStyle = {},
  indicatorContainerStyle = {},
  onItemChanged = itemData => {},
  localImg = false,
  onClick = (item, index: number) => {},
  preview = true,
  children,
}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageViewer, setImageViewer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slider = useRef(null);
  const timerRef = useRef(null);
  const onViewRef = React.useRef(({viewableItems}) => {
    // Use viewable items in state or as intended
    if (viewableItems.length > 0) {
      let index = viewableItems[0].index;
      onItemChanged(viewableItems[0].item);
      setSelectedIndex(index);
    }
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  useEffect(() => {
    if (autoPlay) {
      if (data.length > 0) {
        startAutoPlay(imageViewer ? true : false);
      }
    }
  }, []);

  useEffect(() => {
    if (!imageViewer) {
      if (autoPlay) {
        if (data.length > 0) {
          startAutoPlay(imageViewer ? true : false);
        }
      }
    } else {
      clearTimeout(timerRef?.current);
    }
  }, [currentIndex, imageViewer]);

  const changeSliderListIndex = () => {
    if (slider.current) {
      if (currentIndex == data.length - 1) {
        setCurrentIndex(0);
        // @ts-ignore
        slider.current.scrollToIndex({
          index: currentIndex,
          animated: true,
        });
      } else {
        setCurrentIndex(currentIndex + 1);
        // @ts-ignore
        slider.current.scrollToIndex({
          index: currentIndex,
          animated: true,
        });
      }
    }
  };

  const startAutoPlay = isViewer => {
    if (!imageViewer) {
      (viewer => {
        let viewBool = viewer;
        timerRef.current = setTimeout(() => {
          if (!viewBool) {
            changeSliderListIndex();
          }
        }, timer);
      })(isViewer);
    }
  };

  return (
    <View>
      <Animated.FlatList
        ref={slider}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        horizontal
        pagingEnabled
        snapToInterval={width}
        decelerationRate="fast"
        pinchGestureEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        initialScrollIndex={selectedIndex}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            // flatList.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
        renderItem={({item, index}) => {
          return (
            <View>
              <>
                <TouchableOpacity
                  onPress={() => {
                    if (!preview) {
                      onClick(item, index);
                    } else {
                      setSelectedIndex(index);
                      setImageViewer(!imageViewer);
                    }
                  }}>
                  <Image
                    // @ts-ignore
                    source={localImg ? item : {uri: item}}
                    style={styles.carouselImageStyle}
                  />
                </TouchableOpacity>
                {children}
              </>
            </View>
          );
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
        }}>
        {showIndicator && (
          <Indicator
            data={data}
            currentIndex={selectedIndex}
            indicatorContainerStyle={indicatorContainerStyle}
            activeIndicatorStyle={activeIndicatorStyle}
            inActiveIndicatorStyle={inActiveIndicatorStyle}
          />
        )}
      </View>
    </View>
  );
};

export default FGSliderBox;
