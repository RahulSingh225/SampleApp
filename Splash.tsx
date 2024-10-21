import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const SplashEffect = ({ spinning }: { spinning: boolean }) => {
  const splashOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (spinning) {
      // Start the animation when spinning starts
      Animated.timing(splashOpacity, {
        toValue: 1, // Fully visible
        duration: 300, // Duration of the fade-in effect
        useNativeDriver: true,
      }).start(() => {
        // Fade out after reaching full visibility
        Animated.timing(splashOpacity, {
          toValue: 0, // Fade back out to invisible
          duration: 1000, // Duration of the fade-out effect
          useNativeDriver: true,
        }).start();
      });
    }
  }, [spinning, splashOpacity]);

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject, // Fill the entire screen
        styles.splash,
        { opacity: splashOpacity }, // Bind animated opacity value
      ]}
    />
  );
};

const styles = StyleSheet.create({
  splash: {
    
    backgroundColor: 'red',
    zIndex: -1, // Ensure it's behind all other components
  },
});

export default SplashEffect;
