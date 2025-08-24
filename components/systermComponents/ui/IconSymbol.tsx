// Fallback for using MaterialIcons on Android and web.

import Ionicons from '@expo/vector-icons/Ionicons';
import { SymbolView, SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { Platform, OpaqueColorValue, type StyleProp, type TextStyle, ViewStyle } from 'react-native';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];


const MAPPING = {
  'house': 'home-outline',
  'magnifyingglass': 'search',
  'heart': 'heart-outline',
  'cart': 'cart-outline',
  'person': 'person-outline',
  '': 'chervon-forward',
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
type IconName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: IconName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {

  if (Platform.OS === 'ios') {
    return (
      <SymbolView
        // Bắt buộc phải ép kiểu vì 'IconName' không phải là SF Symbols đầy đủ
        name={name as SymbolViewProps['name']}
        weight={weight}
        tintColor={color}
        style={[
          {
            width: size,
            height: size,
          },
          style,
        ]}
      />
    );
  }

  return <Ionicons color={color} size={size} name={MAPPING[name] as IoniconsName} style={style as any} />;
}
