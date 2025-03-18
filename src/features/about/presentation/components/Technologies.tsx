import { useRouter } from 'next/router';
import { Container, Flex, Space, Title, useMantineTheme } from '@mantine/core';
import { ExistingApp } from '@/src/shared/domain/entities';
import SimulationTechnology from '@/src/shared/presentations/components/segmented/SimulationTechnology';

const simulationTechnologies: ExistingApp[] = [
  {
    display: 'VR Simulator',
    code: 'vr-simulator',
  },
  {
    display: '360 VR Tour',
    code: 'vr-360-tour',
  },
  {
    display: 'AR Wayfinder',
    code: 'ar-wayfinder',
  },
];

export default function Technologies() {
  const theme = useMantineTheme();
  const router = useRouter();
  return (
    <>
      <Container size="xl">
        <Space h={theme.spacing.xl} />
        <Space h={theme.spacing.xl} />
        <Title order={3} style={{ color: 'white', textAlign: 'center' }}>
          Maanfaatkan Teknologi Berikut ini untuk
          <br />
          Tanggap Bencana Wilayah Anda
        </Title>
        <Space h={theme.spacing.xl} />
        <Space h={theme.spacing.xl} />
        <Flex wrap="wrap" align="center" justify="space-around" gap={10}>
          {simulationTechnologies.map((item, index) => (
            <SimulationTechnology
              onClick={() => router.push('/?section=implementation')}
              key={index}
              {...item}
            />
          ))}
        </Flex>
      </Container>
    </>
  );
}
