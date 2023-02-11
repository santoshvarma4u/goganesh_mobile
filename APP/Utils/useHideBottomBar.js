import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import Colors from '../Theams/Colors';

function useHideBottomBar() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: Colors.appBlackColorLight,
        },
      });
  }, [navigation]);
}

export default useHideBottomBar;
