import { Platform } from 'react-native';

const tintColorLight = '#E91E63';    
const tintColorDark = '#F06292';     

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#C2185B',                 
    tabIconDefault: '#C2185B',
    tabIconSelected: tintColorLight,
    primary: '#E91E63',
    primaryDark: '#C2185B',
    surface: '#FAFAFA',
    border: '#E0E0E0',
    textSecondary: '#757575',
    placeholder: '#9E9E9E',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#F06292',              
    tabIconDefault: '#F06292',
    tabIconSelected: tintColorDark,
    primary: '#F06292',
    primaryDark: '#EC407A',
    surface: '#1E1E1E',
    border: '#424242',
    textSecondary: '#B0B0B0',
    placeholder: '#616161',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});