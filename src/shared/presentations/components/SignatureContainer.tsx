import { Container, MantineStyleProp, useMantineTheme, useMatches } from '@mantine/core';

type SignatureContainerProps = {
  children?: React.ReactNode;
  m?: number | string;
  p?: number | string;
  style?: MantineStyleProp;
};
export default function SignatureContainer({ children, m, p, style }: SignatureContainerProps) {
  const theme = useMantineTheme();
  const defaultM = useMatches({ base: undefined, md: theme.spacing.lg });
  const defaultP = useMatches({ base: undefined, md: theme.spacing.lg });
  return (
    <Container
      component={'section'}
      fluid
      m={m ?? defaultM}
      p={p ?? defaultP}
      style={{ overflow: 'hidden', ...style }}
    >
      {children}
    </Container>
  );
}
