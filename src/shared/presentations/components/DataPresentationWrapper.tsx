import { useMemo } from 'react';
import { PiSealQuestionDuotone } from 'react-icons/pi';
import { Box, Flex, MantineTheme, Space, Text, useMantineTheme } from '@mantine/core';

type DataPresentationWrapperProps = {
  children?: React.ReactNode;
  isEmpty?: () => boolean;
  isShowPlaceHolder?: boolean;
  emptyComponent?: {
    title?: string;
    subtitle?: string;
  };
};

class DataPresentationWrapperEnum {
  constructor(private readonly props?: DataPresentationWrapperProps) {}
  LOADING = (
    <>
      <Box style={{ minWidth: '100%' }}>
        <Flex justify="center" align="center">
          <Text>Loading...</Text>
        </Flex>
      </Box>
    </>
  );

  EMPTY = (
    <>
      <Box style={{ minWidth: '100%' }}>
        <Flex justify="center" align="center" direction="column" style={{ minHeight: '50dvh' }}>
          <PiSealQuestionDuotone size={100} />
          <Space h={50} />
          <Text
            style={{
              color: 'white',
              fontSize: 20,
            }}
          >
            {this.props?.emptyComponent?.title ?? 'Tidak ada data...'}
          </Text>
          <Text
            style={{
              color: 'gray',
              fontSize: 12,
            }}
          >
            {this.props?.emptyComponent?.subtitle ?? 'Coba beberapa saat lagi...'}
          </Text>
        </Flex>
      </Box>
    </>
  );
}

export default function DataPresentationWrapper({
  children,
  isEmpty,
  isShowPlaceHolder = false,
  emptyComponent,
}: DataPresentationWrapperProps) {
  const dataPresentationWrapper = useMemo(
    () => new DataPresentationWrapperEnum({ children, isEmpty, emptyComponent }),
    []
  );
  const isContentEmpty = useMemo(() => isEmpty?.() ?? false, [isEmpty]);
  switch (isContentEmpty) {
    case false:
      return children;
    default:
      return isShowPlaceHolder ? dataPresentationWrapper.EMPTY : undefined;
  }
}
