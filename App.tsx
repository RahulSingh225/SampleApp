// @ts-nocheck

import React, { useRef, useState } from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import LuckyWheel, { LuckyWheelHandle } from 'react-native-lucky-wheel';

import Button from './Button';
import SplashEffect from './Splash';
import RewardBox from './RewardBox';

const App = () => {
  const wheelRef = useRef<LuckyWheelHandle>(null);
  const [dotColor,setDotColor] = useState('red')
  const [winnerIndex, setWinnerIndex] = useState<number | undefined>(undefined);
  const [isImageMode, setIsImageMode] = useState(false);
  const [isEndlessSpinningOn, setIsEndlessSpinningOn] = useState(true);
  const [isSpinning,setIsSpinning]=useState(false)

  let data = {
    rewardImage: {
      width: 100,
      height: 100,
      resourceLocation: require("./assets/ic_rewards_gift.png"),
    },
    rewardResultText: {
      color: "black",
      fontSize: 16,
      textContent: 'You have Won',
      fontWeight: "700",
    },
    text1: {
      color: "black",
      fontSize: 16,
      textContent: 70,
      fontWeight: "700",
    },
    text2: {
      color: "black",
      fontSize: 16,
      textContent: "POINTS",
      fontWeight: "700",
    },
    text3: {
      color: "#9c9c9c",
      fontSize: 12,
      textContent: "",
      fontWeight: "700",
    },
    button: {
      buttonColor: "#F0C300",
      buttonTextColor: "black",
      buttonText: "",
      buttonAction: null,
      fontWeight: "400",
    },
    textInput: false,
    scratchable: true,
    isVisible: true,
    onClose: () =>
      console.log('close')
  };
  return(
    <RewardBox scratchCardProps={data} visible={true} onClose={()=>console.log('false')} scratchable={true}/>
  )
  
  return (
    <SafeAreaView style={styles.container}>
      
      <SplashEffect spinning={isSpinning}/>
      <LuckyWheel
        ref={wheelRef}
        slices={
          isImageMode
            ? require('./data/slices-for-image.json')
            : require('./data/slices-for-svg.json')
        }
        onSpinningStart={() => {
          console.log('onSpinningStart');
        }}
        onSpinningEnd={(_winner) => {
          setIsSpinning(false)
          console.log(_winner)
          console.log('onSpinningEnd');
        }}
        innerRadius={1}
        outerRadius={13}
        size={300}
        source={isImageMode ? require('./assets/wheel.png') : null}
        enableGesture
        minimumSpinVelocity={0.6} // 0.0 - 1.0
        winnerIndex={winnerIndex}
        waitWinner={isEndlessSpinningOn}
        dotColor={dotColor}
        
      />
      <View style={styles.buttons}>
        <Button
          onPress={() => {
            setIsImageMode(!isImageMode);
          }}
          title={isImageMode ? 'Switch SVG Mode' : 'Switch Image Mode'}
        />
        <Button
          onPress={() => {
            wheelRef?.current?.start();
            setIsSpinning(true)
            
          }}
          title="Start"
        />
        <Button
          onPress={() => {
            wheelRef?.current?.stop();
            setIsSpinning(false)
          }}
          title="Stop"
        />
        <Button
          onPress={() => {
            wheelRef?.current?.reset();
          }}
          title="Reset"
        />
        <Button
          onPress={() => {
            if (winnerIndex) {
              setWinnerIndex(undefined);
            } else {
              setWinnerIndex(1);
            }
          }}
          title={winnerIndex ? 'Remove Winner' : 'Set Winner 1'}
        />
        <Button
          onPress={() => {
            setIsEndlessSpinningOn(!isEndlessSpinningOn);
          }}
          title={
            isEndlessSpinningOn
              ? 'Deactive Endless Spinning'
              : 'Active Endless Spinning'
          }
          style={{ backgroundColor: isEndlessSpinningOn ? 'red' : 'green' }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default App;
