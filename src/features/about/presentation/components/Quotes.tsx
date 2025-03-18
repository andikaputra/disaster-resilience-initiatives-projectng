import {
  Box,
  Container,
  Grid,
  GridCol,
  Overlay,
  Space,
  Text,
  Title,
  useMantineTheme,
  useMatches,
} from '@mantine/core';

const quotes: QuoteProps[] = [
  {
    title: 'Tangguh',
    description:
      'Tangguh berarti ketahanan secara fisik, mental, dan emosional. Mampu pula dalam mengatasi dampak psikologis seperti trauma, stres namun bersemangat untuk bangkit pascabencana.',
  },
  {
    title: 'Cerdas',
    description:
      'Cerdas berpengetahuan tentang risiko dan tanda-tanda bencana serta langkah-langkah yang harus diambil untuk melindungi diri. Warga yang cerdas mengambil keputusan bijak dan rasional saat menghadapi situasi darurat.',
  },
  {
    title: 'Tanggap',
    description:
      'Tanggap berarti mampu merespons dengan cepat dan tepat ketika tanda-tanda bencana muncul. Sikap cepat tanggap dapat mengurangi risiko cedera dan korban jiwa, serta membantu orang lain yang mungkin membutuhkan pertolongan dalam situasi kritis.',
  },
];

type QuoteProps = {
  title?: string;
  description?: string;
};
const Quote: React.FC<QuoteProps | undefined> = (props) => {
  const theme = useMantineTheme();
  const mathcesQuoteMinHeight = useMatches({
    base: undefined,
    md: 230,
  });
  const mathcesQuoteLineClamp = useMatches({
    base: 6,
    md: 6,
  });
  return (
    <Box
      style={{
        position: 'relative',
        minHeight: mathcesQuoteMinHeight,
        maxHeight: mathcesQuoteMinHeight,
      }}
      p={theme.spacing.md}
    >
      <Overlay opacity={0.5} color="#fff" radius="md" />
      <Title order={2} style={{ color: 'white' }}>
        {props?.title ?? 'Awareness'}
      </Title>
      <Space h={theme.spacing.sm} />
      <Text lineClamp={mathcesQuoteLineClamp}>{props?.description ?? '...'}</Text>
    </Box>
  );
};

export default function Quotes() {
  const theme = useMantineTheme();
  return (
    <>
      <Container size="xl">
        <Space h={theme.spacing.xl} />
        <Space h={theme.spacing.xl} />
        <Title order={3} style={{ color: 'white', textAlign: 'center' }}>
          Tangguh Cerdas Tanggap Bencana
        </Title>
        <Space h={theme.spacing.xl} />
        <Space h={theme.spacing.xl} />
        <Box mx={theme.spacing.md}>
          <Grid>
            {quotes.map((quote, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 4 }}>
                <Quote {...quote} />
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
