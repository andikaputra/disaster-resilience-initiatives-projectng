import { ReactNode } from 'react';
import Image from 'next/image';
import ReactHtmlParser, { convertNodeToElement, processNodes } from 'react-html-parser';
import { FaLaptop, FaVrCardboard, FaWifi } from 'react-icons/fa6';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Space,
  Tabs,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';

const description =
  'Aplikasi VR Tour 360 Jalur Evakuasi Bencana merupakan alat edukasi interaktif berbasis virtual reality yang membantu masyarakat dan instansi terkait untuk lebih memahami prosedur evakuasi dalam situasi darurat, seperti gempa bumi atau tsunami. Dengan aplikasi ini, pengguna dapat mengalami secara virtual jalur evakuasi dan titik aman di area bencana tertentu, seperti wilayah pesisir atau perkotaan padat.';

const AboutTab: React.FC<AboutProps | undefined> = (props) => {
  const theme = useMantineTheme();
  return (
    <>
      <Space h={theme.spacing.xl} />
      <Box>
        <Grid>
          <Grid.Col span={{ base: 12 }}>
            <Grid>
              <Grid.Col span={{ base: 12, md: 3 }} order={{ base: 2, md: 1 }}>
                <Center
                  style={{
                    height: '100%',
                    minHeight: 400,
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor: 'black',
                  }}
                >
                  {props?.aboutTab?.video?.iframeEmbeded}
                </Center>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 9 }} order={{ base: 1, md: 2 }}>
                <Flex direction="column">
                  <Box
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 200,
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={props?.aboutTab?.copyWriting?.heroImage ?? '/images/360-vr-tour.png'}
                      fill
                      alt="vr"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'right',
                      }}
                    />
                  </Box>
                  <Space h={theme.spacing.md} />
                  <Box>
                    <Title order={4} style={{ color: 'white' }}>
                      {props?.aboutTab?.copyWriting?.title ?? 'Mengenai Aplikasi'}
                    </Title>
                    <Space h={theme.spacing.md} />
                    <Text style={{ whiteSpace: 'pre-line' }} fw={400}>
                      {props?.aboutTab?.copyWriting?.description ?? description}
                    </Text>
                  </Box>
                </Flex>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={{ base: 12 }}>
            <Space h={theme.spacing.md} />
            <Grid>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Flex direction="column" style={{ height: '100%' }}>
                  <Title order={4} style={{ color: 'white' }}>
                    Persiapan <br /> Penggunaan
                  </Title>
                  <Center flex={1} style={{ minHeight: 100 }}>
                    <Button
                      color={theme.colors.gray[6]}
                      variant="outline"
                      size="md"
                      onClick={() =>
                        window.open(`${props?.aboutTab?.video?.link ?? '/'}`, '_blank')
                      }
                      style={{ width: '100%', borderRadius: 30 }}
                    >
                      Tonton Tutorial
                    </Button>
                  </Center>
                </Flex>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 9 }}>
                <Flex gap={10} wrap="wrap">
                  {props?.aboutTab?.copyWriting?.steps ?? (
                    <>
                      <Box flex={1} style={{ minWidth: 200 }}>
                        <Flex
                          direction="column"
                          justify="start"
                          align="start"
                          style={{ height: '100%' }}
                        >
                          <Box>
                            <FaLaptop color="white" size={80} />
                            <Text fw={400}>
                              Siapkan perangkat Komputer atau Handphone dan Laptop. Disarankan jika
                              menggunakan perangkat dengan layar yang memadai
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                      <Box flex={1} style={{ minWidth: 200 }}>
                        <Flex
                          direction="column"
                          justify="start"
                          align="start"
                          style={{ height: '100%' }}
                        >
                          <Box>
                            <FaWifi color="white" size={80} />
                            <Text fw={400}>
                              Pastikan anda memiliki akses internet yang cukup untuk mendapatkan
                              pengalaman akses yang baik
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                      <Box flex={1} style={{ minWidth: 200 }}>
                        <Flex
                          direction="column"
                          justify="start"
                          align="start"
                          style={{ height: '100%' }}
                        >
                          <Box>
                            <FaVrCardboard color="white" size={80} />
                            <Text fw={400}>
                              Untuk memaksimalkan pengalaman simulasi yang lebih nyata, anda dapat
                              menggunakan VR Board sejenisnya
                            </Text>
                          </Box>
                        </Flex>
                      </Box>
                    </>
                  )}
                </Flex>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
};

const MitigationTab: React.FC<AboutProps> = ({ mitigationTab }) => (
  <>
    <Box>{ReactHtmlParser(mitigationTab?.content ?? '')}</Box>
  </>
);

type AboutProps = {
  aboutTab?: {
    video?: {
      iframeEmbeded?: ReactNode;
      link?: string;
    };
    copyWriting?: {
      heroImage?: string;
      title?: string;
      description?: string;
      steps?: ReactNode;
    };
  };
  mitigationTab?: {
    content?: string;
  };
};

export default function About(props?: AboutProps) {
  const theme = useMantineTheme();
  return (
    <Box>
      <Space h={theme.spacing.xl} />
      <Space h={theme.spacing.xl} />
      <Container size="xl">
        <Tabs defaultValue="about">
          <Tabs.List>
            <Tabs.Tab value="about" color={theme.colors.gray[6]}>
              <Title order={5}>Tentang Aplikasi</Title>
            </Tabs.Tab>
            <Tabs.Tab value="mitigation" color={theme.colors.gray[6]}>
              <Title order={5}>Informasi Mitigasi Bencana</Title>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="about">
            <AboutTab {...props} />
          </Tabs.Panel>

          <Tabs.Panel value="mitigation">
            <MitigationTab {...props} />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Box>
  );
}
