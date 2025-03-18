import { Box, Container, Space, Title, useMantineTheme } from '@mantine/core';

export default function PublicationInNumbers() {
  const theme = useMantineTheme();
  return (
    <>
      <Container fluid size={'xl'} m={0} p={0}>
        <Space h={theme.spacing.xl} />
        <Space h={theme.spacing.xl} />
        <Title order={3} style={{ color: 'white', textAlign: 'center' }}>
          Publikasi in Numbers
        </Title>
        <Space h={theme.spacing.xl} />
        <Space h={theme.spacing.xl} />
      </Container>
    </>
  );
}
