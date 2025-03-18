import Image from 'next/image';
import { FaWifi } from 'react-icons/fa6';
import { SlScreenSmartphone } from 'react-icons/sl';
import { Box, Flex, Text } from '@mantine/core';
import { Simulation360Entity } from '@/src/shared/domain/entities';
import { About, ProductStoreDownload, SimpleHeader } from '@/src/shared/presentations/components';
import { usePageProps } from '@/src/shared/presentations/contexts';

export default function ArWayfinderPage() {
  const { data } = usePageProps<Simulation360Entity>();
  return (
    <>
      <SimpleHeader navigationButton={{ title: 'AR Wayfinder' }} />
      <ProductStoreDownload
        downloadBanner={{
          downloadPath: 'https://play.google.com/store/apps/details?id=com.BNPB.ARWayFinder',
          image: '/images/ar-wayfinder-store.png',
        }}
        decorationBanner={{
          image: '/images/ar-wayfinder-hero.png',
        }}
      />
      <About
        mitigationTab={{
          content: data?.disaster_mitigation_info,
        }}
        aboutTab={{
          video: {
            link: 'https://drive.google.com/file/d/1cd0D2cGvAaeyrWlSDYu_9a8O9pgiDgje/preview',
            iframeEmbeded: (
              <iframe
                title="Video Mitigasi Bencana"
                src="https://drive.google.com/file/d/1tnAUbsqaW4MGcZI-FIC_hnvm9HrvPBoc/preview"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ),
          },
          copyWriting: {
            heroImage: '/images/ar-wayfinder-about.png',
            title: 'Mengenai Aplikasi',
            description:
              'AR Wayfinder adalah aplikasi yang memanfaatkan teknologi Augmented Reality (AR) untuk membantu pengguna menemukan jalan atau lokasi tertentu. Dengan menggunakan kamera perangkat pintar, aplikasi ini akan menampilkan petunjuk arah dan informasi lokasi secara real-time, seolah-olah ditampilkan langsung di dunia nyata.\n\n- Pemetaan lingkungan: Buat peta digital dari lokasi yang akan dilayani oleh aplikasi. Peta ini akan digunakan sebagai referensi untuk menampilkan informasi lokasi secara akurat.\n- Pelacakan posisi: Gunakan sensor GPS, kompas, dan accelerometer pada perangkat untuk menentukan posisi pengguna secara real-time.\n- Penanda lokasi: Tampilkan penanda lokasi (marker) pada tampilan kamera, seperti panah penunjuk arah, jarak ke tujuan, dan nama tempat.\n- Integrasi data: Integrasikan data dari berbagai sumber, seperti database tempat, informasi lalu lintas, atau data sensor lainnya, untuk memberikan informasi yang lebih lengkap kepada pengguna.',
            steps: (
              <>
                <Box flex={1} style={{ minWidth: 200 }}>
                  <Flex direction="column" justify="start" align="start" style={{ height: '100%' }}>
                    <Box>
                      <SlScreenSmartphone color="white" size={80} />
                      <Text fw={400}>
                        Siapkan smartphone atau perangkan yang support AR Core, contoh smartphone
                        dapat dilihat di{' '}
                        <a
                          href="https://developers.google.com/ar/devices"
                          target="_blank"
                          rel="noreferrer"
                        >
                          link berikut
                        </a>
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
      />
    </>
  );
}
