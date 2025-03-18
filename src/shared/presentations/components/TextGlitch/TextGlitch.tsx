import { MantineStyleProp, Text } from '@mantine/core';
import styles from './TextGlitch.module.css';

type TextGlitchProps = {
  children?: React.ReactNode | string;
  style?: MantineStyleProp;
};
export default function TextGlitch({ children, style }: TextGlitchProps) {
  return (
    <Text style={{ fontSize: 20, fontWeight: 'bold', ...style }} className={styles.glitch}>
      {children ?? 'Terjadi gangguan'}
    </Text>
  );
}
