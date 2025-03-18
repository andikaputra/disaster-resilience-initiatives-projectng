import Image from 'next/image';
import ReactHtmlParser from 'react-html-parser';
import {
  AspectRatio,
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Space,
  Text,
  Title,
  useMantineTheme,
  useMatches,
} from '@mantine/core';
import { BlogDetailEntity } from '@/src/shared/domain/entities';
import { SignatureSecureImage } from '@/src/shared/presentations/components';

type BlogPaperProps = {
  blogEntity: BlogDetailEntity;
};

export default function BlogPaper({ blogEntity }: BlogPaperProps) {
  const theme = useMantineTheme();
  const mathesTitleAlign: 'center' | 'left' = useMatches({
    base: 'center',
    xs: 'left',
  });
  return (
    <Container pt={theme.spacing.xl} px={theme.spacing.xs}>
      <Card style={{ color: 'black', backgroundColor: 'white', overflowX: 'hidden' }}>
        <Box style={{ width: '100%' }}>
          <Flex align="stretch" justify="stretch" wrap="wrap">
            <Box flex={1} style={{ minWidth: 200, minHeight: 200 }}>
              <Box style={{ width: '100%', height: '100%', position: 'relative' }}>
                <SignatureSecureImage
                  src={blogEntity?.data?.wallpaper ?? ''}
                  alt={blogEntity?.data?.title ?? ''}
                  title={blogEntity?.data?.title}
                  style={{
                    objectFit: 'cover',
                  }}
                  fill
                />
              </Box>
            </Box>
            <Space w={theme.spacing.md} />
            <Box flex={2}>
              <Flex direction="column" style={{ height: '100%', width: '100%' }}>
                <Title style={{ textAlign: mathesTitleAlign }}>
                  {blogEntity?.data?.title ?? ''}
                </Title>
                <Text fw={100} style={{ textAlign: 'justify' }}>
                  {blogEntity?.data?.sub_title ?? ''}
                </Text>
                <Space h={theme.spacing.md} />
                <Flex flex={1} align="end">
                  {blogEntity?.data?.tag?.map((tag, index) => (
                    <Badge key={index} color={theme.colors.gray[6]} mr={theme.spacing.xs}>
                      {tag}
                    </Badge>
                  ))}
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Box>
        {ReactHtmlParser(blogEntity?.data?.content ?? '')}
      </Card>
    </Container>
  );
}
