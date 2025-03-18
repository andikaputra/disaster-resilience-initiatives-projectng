import Image from 'next/image';
import { FaVrCardboard, FaWifi } from 'react-icons/fa6';
import { SlScreenSmartphone } from 'react-icons/sl';
import { Box, Flex, Text } from '@mantine/core';
import { Simulation360Entity } from '@/src/shared/domain/entities';
import { About, ProductStoreDownload, SimpleHeader } from '@/src/shared/presentations/components';
import { usePageProps } from '@/src/shared/presentations/contexts';

export default function VrSimulatorPage() {
  const { data } = usePageProps<Simulation360Entity>();
  return (
    <>
      <SimpleHeader navigationButton={{ title: 'VR Simulator' }} />
      <ProductStoreDownload
        downloadBanner={{
          downloadPath:
            'https://drive.google.com/file/d/1b0tPwaeKMwAbobvSUCWvgottPqB0Iay2/view?usp=sharing',
          downloadLogo: (
            <Box w={100} h={50} style={{ position: 'relative' }}>
              <Image src="/images/meta.png" fill alt="meta" style={{ objectFit: 'contain' }} />
            </Box>
          ),
        }}
      />
      <About
        aboutTab={{
          video: {
            link: 'https://drive.google.com/file/d/1bPUt7y_yoiKyXeUDtrwg_pPpJvBVbXEV/preview',
            iframeEmbeded: (
              <iframe
                title="Video Mitigasi Bencana"
                src="https://drive.google.com/file/d/1p9hF0a1R_Mf8URQh4xE-YPX09iIdNNMN/preview"
                width="640"
                height="480"
                allow="autoplay"
                style={{ border: 'none' }}
                allowFullScreen
              />
            ),
          },
          copyWriting: {
            heroImage: '/images/vr-simulator-about.png',
            title: 'Mengenai Aplikasi',
            description:
              'Aplikasi Virtual Reality (VR) simulasi bencana ini dirancang khusus untuk memberikan pengalaman yang lebih realistis mengenai skenario bencana gempa bumi dan tsunami. Dengan teknologi VR, pengguna dapat merasakan simulasi seolah-olah mereka berada di tengah situasi gempa bumi dan tsunami yang nyata, mulai dari guncangan awal, dampak kerusakan, hingga evakuasi yang harus dilakukan.\n\nAplikasi VR ini bertujuan untuk meningkatkan kesadaran dan keterampilan masyarakat dalam menghadapi situasi darurat, sehingga dapat mengurangi risiko korban jiwa dan kerugian materiil.\n\nAplikasi ini menampilkan lingkungan 3D interaktif yang menggambarkan kondisi lanskap, bangunan, jalan, dan jalur evakuasi di wilayah rawan bencana. Pengguna dapat mengikuti instruksi keselamatan, mencoba menemukan jalur evakuasi yang aman, dan melihat akibat dari gempa bumi dan tsunami yang tidak dimitigasi dengan baik.\n\nAplikasi VR ini dikustomisasi sesuai dengan kondisi spesifik wilayah, yang saat ini baru tersedia di 5 kota/kabupaten, yaitu Palu, Ambon, Pesisir Selatan, Cilacap, dan Jembrana. Dengan pendekatan yang imersif ini, masyarakat dapat belajar tentang pentingnya kesiapsiagaan dan tindakan yang tepat saat menghadapi bencana gempa bumi dan tsunami.',
            steps: (
              <>
                <Box flex={1} style={{ minWidth: 200 }}>
                  <Flex direction="column" justify="start" align="start" style={{ height: '100%' }}>
                    <Box>
                      <FaVrCardboard color="white" size={80} />
                      <Text fw={400}>
                        Siapkan Meta Quest untuk menjalankan aplikasi dan dapatkan pengalaman
                        simulasi yang lebih nyata.
                      </Text>
                    </Box>
                  </Flex>
                </Box>
                <Box flex={1} style={{ minWidth: 200 }}>
                  <Flex direction="column" justify="start" align="start" style={{ height: '100%' }}>
                    <Box>
                      <FaWifi size={80} color="white" />
                      <Text fw={400}>
                        Pastikan anda memiliki akses internet yang cukup untuk mendapatkan
                        pengalaman akses yang baik
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </>
            ),
          },
        }}
        mitigationTab={{
          content: data?.disaster_mitigation_info,
        }}
      />
    </>
  );
}
