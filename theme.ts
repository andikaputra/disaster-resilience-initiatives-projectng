import { createTheme, MantineColorsTuple } from '@mantine/core';

const base: MantineColorsTuple = [
  '#ecf0ff', // 1
  '#d6ddfb', // 2
  '#acb8ef', // 3
  '#7f90e5', // 4
  '#596edb', // 5
  '#2E4AD4', // 6
  '#334ed5', // 7
  '#2540bd', // 8
  '#1d38aa', // 9
  '#103097', // 10
  '#051047', // 11
];

export const theme = createTheme({
  colors: {
    base
  }
});
