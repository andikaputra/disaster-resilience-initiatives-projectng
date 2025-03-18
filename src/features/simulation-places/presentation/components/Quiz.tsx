import { useMemo } from 'react';
import {
  alpha,
  Button,
  Flex,
  Grid,
  Space,
  Title,
  useMantineTheme,
  useMatches,
} from '@mantine/core';
import { SimulationPlaceDetailEntity } from '@/src/shared/domain/entities';
import SignatureContainer from '@/src/shared/presentations/components/SignatureContainer';
import { usePageProps } from '@/src/shared/presentations/contexts/AppPageHooks';
import { useSimulationPlacePageContext } from '../../domain/contexts';
import QuizModal from './QuizModal';

export default function Quiz() {
  const theme = useMantineTheme();
  const mathesTitleTextAlign: 'center' | 'left' = useMatches({ base: 'center', md: 'left' });
  const { data } = usePageProps<SimulationPlaceDetailEntity>();
  const quiz = useMemo(() => {
    if (data?.quiz?.is_active !== true) return null;
    return data?.quiz;
  }, [data]);
  const announcement = useMemo(() => {
    if (data?.announcement?.is_active !== true) return null;
    return data?.announcement;
  }, [data]);
  const {
    modalState: [, { open, close, toggle }],
  } = useSimulationPlacePageContext();

  return (
    <SignatureContainer>
      <QuizModal />
      <Space h={theme.spacing.xl} />
      <Grid justify="center" align="center">
        {quiz && (
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={3} style={{ textAlign: mathesTitleTextAlign }}>
              Ikuti Quiz Berhadiah
            </Title>
          </Grid.Col>
        )}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Flex direction="row" wrap="wrap" gap={10}>
            {quiz?.quiz_link && (
              <Button
                flex={1}
                variant="filled"
                onClick={() => open()}
                style={{
                  borderRadius: 10,
                  height: 70,
                  backgroundColor: 'rgb(255 255 255 / 10%)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                Link Quiz
              </Button>
            )}
            {announcement?.announcement_link && (
              <Button
                flex={1}
                variant="filled"
                onClick={() => window.open(announcement?.announcement_link, '_blank')}
                style={{
                  borderRadius: 10,
                  height: 70,
                  backgroundColor: alpha(theme.colors.blue[6], 0.1),
                  backdropFilter: 'blur(10px)',
                }}
              >
                Link Pengumuman
              </Button>
            )}
          </Flex>
        </Grid.Col>
      </Grid>
    </SignatureContainer>
  );
}
