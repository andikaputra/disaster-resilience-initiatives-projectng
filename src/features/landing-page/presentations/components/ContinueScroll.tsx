import { ArrowDownCircle } from 'react-feather';
import { Box, Container, Flex, Grid, Space, Text, Title, useMantineTheme } from '@mantine/core';
import { useLandingPageContext } from '../contexts';

export default function ContinueScroll() {
  const { simulationPlacesRef } = useLandingPageContext();
  return (
    <Container ref={simulationPlacesRef}>
      <Grid justify="center" align="center">
        <Grid.Col span={12}>
          <Flex justify={'center'}>
            <Box>
              <ArrowDownCircle />
            </Box>
          </Flex>
        </Grid.Col>
        <Grid.Col span={12}>
          <Title style={{ textAlign: 'center' }} mx={20} order={3}>
            Pilih Wilayah Anda untuk Mendapatkan Pengalaman Simulasi
          </Title>
          <Space h={40} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
