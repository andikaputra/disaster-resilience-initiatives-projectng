import { ArrowDownCircle } from 'react-feather';
import { Box, Container, Flex, Grid, Space, Text, Title, useMantineTheme } from '@mantine/core';

export default function ContinueScroll() {
  const theme = useMantineTheme();
  return (
    <Container>
      <Space h={theme.spacing.xl} />
      <Grid justify="center" align="center">
        <Grid.Col span={12}>
          <Flex justify={'center'}>
            <Box>
              <ArrowDownCircle />
            </Box>
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
