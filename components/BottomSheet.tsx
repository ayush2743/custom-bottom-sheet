import {
  useCallback,
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import {
  Dimensions,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const ANIMATION_DURATION = 300;
const TIMING_CONFIG = {
  duration: ANIMATION_DURATION,
  easing: Easing.out(Easing.cubic),
};

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};

type BottomSheetProps = {
  snapPoint?: number; // 0–1
  children: ReactNode;
};

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ snapPoint = 0.3, children }, ref) => {
    const { height: windowHeight } = useWindowDimensions();
    const sheetHeight = SCREEN_HEIGHT * snapPoint;

    const [visible, setVisible] = useState(false);

    const translateY = useSharedValue(sheetHeight);
    const keyboardOffset = useSharedValue(0);
    const backdropOpacity = useSharedValue(0);


    useEffect(() => {
      const showEvent =
        Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
      const hideEvent =
        Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

      const showSub = Keyboard.addListener(showEvent, (e) => {
        const kbHeight = e.endCoordinates.height;

        if (Platform.OS === 'android') {
          const windowShrunk = windowHeight < SCREEN_HEIGHT - 50;
          // 50px threshold prevents tiny diff issues

          if (windowShrunk) {
            // System already handled it — do NOTHING
            keyboardOffset.value = withTiming(0, TIMING_CONFIG);
          } else {
            // System did not resize — apply manual offset
            keyboardOffset.value = withTiming(-kbHeight, TIMING_CONFIG);
          }
        } else {
          // iOS always overlays
          keyboardOffset.value = withTiming(-kbHeight, TIMING_CONFIG);
        }
      });

      const hideSub = Keyboard.addListener(hideEvent, () => {
        keyboardOffset.value = withTiming(0, TIMING_CONFIG);
      });

      return () => {
        showSub.remove();
        hideSub.remove();
      };
    }, [windowHeight]);

    const open = useCallback(() => {
      setVisible(true);
      requestAnimationFrame(() => {
        translateY.value = withTiming(0, TIMING_CONFIG);
        backdropOpacity.value = withTiming(1, TIMING_CONFIG);
      });
    }, []);

    const close = useCallback(() => {
      Keyboard.dismiss();
      keyboardOffset.value = withTiming(0, TIMING_CONFIG);
      translateY.value = withTiming(sheetHeight, TIMING_CONFIG);
      backdropOpacity.value = withTiming(0, TIMING_CONFIG);

      setTimeout(() => {
        setVisible(false);
      }, ANIMATION_DURATION);
    }, [sheetHeight]);

    useImperativeHandle(ref, () => ({ open, close }), [open, close]);

    const panGesture = Gesture.Pan()
      .runOnJS(true)
      .onUpdate((e) => {
        if (e.translationY > 0) {
          translateY.value = e.translationY;
        }
      })
      .onEnd((e) => {
        if (e.translationY > sheetHeight * 0.4) {
          close();
        } else {
          translateY.value = withTiming(0, TIMING_CONFIG);
        }
      });

    const sheetStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateY: translateY.value + keyboardOffset.value,
        },
      ],
    }));

    const backdropStyle = useAnimatedStyle(() => ({
      opacity: backdropOpacity.value,
    }));

    if (!visible) return null;

    return (
      <>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={close}
          />
        </Animated.View>

        <Animated.View
          style={[styles.sheet, { height: sheetHeight }, sheetStyle]}
        >
          <GestureDetector gesture={panGesture}>
            <View style={styles.handleHitArea}>
              <View style={styles.handle} />
            </View>
          </GestureDetector>

          {children}


        </Animated.View>
      </>
    );
  }
);

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  handleHitArea: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 3,
    backgroundColor: '#ccc',
  },
});

export default BottomSheet;