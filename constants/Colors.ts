/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#F5F5F5',
    background2: '#fff',
    tint: tintColorLight,
    icon: '#444',
    icon2: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#635AD9',
    placeholder: '#3f3f3f',
    recept: '#03C02D',
    billing: '#F84035',
    secondary: "#88F4FF",
  },
  dark: {
    text: '#ECEDEE',
    primary: '#635AD9',
    background: '#212226',//'#151718',
    background2: '#1F1F1F',
    tint: tintColorDark,
    icon: '#f5f5f5',
    icon2: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    placeholder: '#3f3f3f',
    recept: '#03C02D',
    billing: '#F84035',
    secondary: "#88F4FF",
  },
};
