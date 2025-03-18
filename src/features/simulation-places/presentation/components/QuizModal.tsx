import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle } from 'react-feather';
import { useForm } from 'react-hook-form';
import { FaCross, FaRegCopy } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { useMutation } from 'react-query';
import { z } from 'zod';
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Input,
  LoadingOverlay,
  Modal,
  NativeSelect,
  Select,
  Space,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { notifications, showNotification } from '@mantine/notifications';
import { DefaultException } from '@/src/core/exception/DefaultException';
import { SIGNATURE_CONTAINER_TYPE, signatureContainer } from '@/src/framework/container';
import { QuizEntity, SimulationPlaceDetailEntity } from '@/src/shared/domain/entities';
import { SimulationPlaceUseCase } from '@/src/shared/domain/usecase';
import { usePageProps } from '@/src/shared/presentations/contexts';
import { useSimulationPlacePageContext } from '../../domain/contexts';
import { QuizDto } from '../../domain/dto';

enum Gender {
  'Laki-Laki' = 'L',
  'Perempuan' = 'P',
}
enum Jobs {
  'Pelajar/Mahasiswa' = 'Pelajar/Mahasiswa',
  'Ibu RT' = 'Ibu RT',
  'Pekerja Lainnya' = 'Pekerja Lainnya',
}

const createUserSchema = z
  .object({
    name: z
      .string({ required_error: 'Name tidak boleh kosong' })
      .min(1, { message: 'Name tidak boleh kosong' }),
    email: z
      .string({ required_error: 'Email tidak boleh kosong' })
      .email({ message: 'Email tidak valid' })
      .min(1, { message: 'Email tidak boleh kosong' }),
    phone_no: z
      .string({ required_error: 'Nomor Telp tidak boleh kosong' })
      .min(1, { message: 'Nomor Telp tidak boleh kosong' }),
    sex_type: z.nativeEnum(Gender, {
      required_error: 'Jenis Kelamin tidak boleh kosong',
      message: 'Jenis Kelamin tidak boleh kosong',
    }),
    age: z
      .string({ required_error: 'Umur tidak boleh kosong' })
      .min(1, { message: 'Umur tidak boleh kosong' }),
    village_id: z
      .string({ required_error: 'Kelurahan tidak boleh kosong' })
      .min(1, { message: 'Kelurahan tidak boleh kosong' }),
    work: z.nativeEnum(Jobs, {
      required_error: 'Pekerjaan tidak boleh kosong',
      message: 'Pekerjaan tidak boleh kosong',
    }),
    other_work: z.string().optional(),
  })
  .refine(
    (v) => {
      if (v.work === Jobs['Pekerja Lainnya'] && !v.other_work) {
        return false;
      }
      return true;
    },
    {
      message: 'Pekerja Lainnya harus diisi',
      path: ['other_work'],
    }
  );

export default function QuizModal() {
  let redirectLinkTimeOut: NodeJS.Timeout;
  const router = useRouter();
  const quizCodeParam = useSearchParams().get('quizCode');
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    modalState: [opened, { close }],
  } = useSimulationPlacePageContext();
  const theme = useMantineTheme();
  const { data } = usePageProps<SimulationPlaceDetailEntity>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<QuizDto & { other_work: string }>({
    resolver: zodResolver(createUserSchema),
  });
  const {
    mutate,
    isLoading,
    data: mutationResult,
  } = useMutation({
    mutationKey: ['quiz', 'quiz-modal'],
    mutationFn: async (quizDto: QuizDto) => {
      const simulationPlaceUseCAse = signatureContainer.resolve<SimulationPlaceUseCase>(
        SIGNATURE_CONTAINER_TYPE.SIMULATION_PLACE_USE_CASE
      );
      const quiz = await simulationPlaceUseCAse.postQuiz(quizDto, data?.slug ?? '');
      return quiz;
    },
    onError: (error) => {
      if (error instanceof DefaultException) {
        notifications.show({
          title: 'Gagal mengirim quiz',
          color: 'red',
          message: error.message,
        });
      } else {
        notifications.show({
          title: 'Gagal mengirim quiz',
          color: 'red',
          message: 'Terjadi kesalahan saat mengirim quiz, mohon coba beberapa saat lagi',
        });
      }
    },
    onSuccess: (result) => {
      router.query.quizCode = result?.data?.quiz_code;
      router.replace(router, undefined, { shallow: true });
      notifications.show({
        title: 'Berhasil mengirim quiz',
        color: 'green',
        message: 'Quiz berhasil dikirim, selamat mengerjakan quiz !',
      });
      setIsSuccess(true);
      reset();
      close();
    },
  });
  const quizEntity: QuizEntity | undefined = useMemo(() => {
    if (quizCodeParam) {
      return {
        data: {
          quiz_code: quizCodeParam,
        },
      } as QuizEntity;
    }
    return mutationResult;
  }, [quizCodeParam, mutationResult]);
  useEffect(() => {
    if (quizCodeParam) {
      setIsSuccess(true);
    }
  }, [quizCodeParam]);
  useEffect(
    () => () => {
      redirectLinkTimeOut && clearTimeout(redirectLinkTimeOut);
    },
    []
  );
  return (
    <>
      <Modal
        opened={isSuccess}
        onClose={() => setIsSuccess(false)}
        closeOnEscape={false}
        closeOnClickOutside={false}
        withCloseButton={false}
        centered
        styles={{
          header: { backgroundColor: theme.colors.base[10] },
          body: { backgroundColor: theme.colors.base[10] },
        }}
      >
        <Flex
          style={{ width: '100%' }}
          direction="column"
          gap={10}
          justify="center"
          align="stretch"
        >
          <Flex
            align="center"
            justify="center"
            style={{ position: 'absolute', top: 5, right: 5, cursor: 'pointer' }}
            onClick={() => {
              router.replace(router.asPath.split('?')[0], undefined, { shallow: true });
              setIsSuccess(false);
            }}
          >
            <IoClose size={30} style={{ margin: 0, padding: 0 }} color={theme.colors.red[5]} />
          </Flex>
          <Space h="md" />
          <Flex justify="center">
            <CheckCircle size={40} color={theme.colors.green[7]} />
          </Flex>
          <Title style={{ textAlign: 'center' }} order={3}>
            Pendaftaran berhasil, selamat mengikuti quiz berhadiah !
          </Title>
          <Space h="md" />
          <Flex
            justify="center"
            align="center"
            p={5}
            style={{
              height: '100%',
              position: 'relative',
              borderRadius: 10,
              backgroundColor: theme.colors.base[9],
              minHeight: 50,
            }}
          >
            <Text flex={1} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25 }}>
              {quizEntity?.data?.quiz_code ?? '-'}
            </Text>
            <Box
              style={{
                right: 5,
                top: 5,
                bottom: 5,
                minWidth: 40,
                position: 'absolute',
              }}
            >
              <ActionIcon
                variant="filled"
                aria-label="Settings"
                onClick={() => {
                  navigator.clipboard.writeText(quizEntity?.data?.quiz_code ?? '-');
                  showNotification({
                    title: 'Quiz Code telah disalin',
                    message: 'Quiz Code telah disalin ke clipboard',
                    color: 'green',
                  });
                }}
                style={{ height: '100%', width: '100%', borderRadius: 7 }}
              >
                <FaRegCopy />
              </ActionIcon>
            </Box>
          </Flex>
          <Text style={{ textAlign: 'center' }}>Gunakan kode ini untuk mengikuti kuis</Text>
          <Space h="md" />
          <Button
            color={theme.colors.yellow[9]}
            onClick={() => {
              navigator.clipboard.writeText(quizEntity?.data?.quiz_code ?? '');
              window.open(data?.quiz?.quiz_link, '_blank');
              showNotification({
                title: 'Quiz Code telah disalin',
                message: 'Quiz Code telah disalin ke clipboard',
                color: 'green',
              });
            }}
          >
            IKUTI QUIZ SEKARANG
          </Button>
        </Flex>
      </Modal>
      <Modal
        opened={opened}
        closeOnEscape={!isLoading}
        closeOnClickOutside={!isLoading}
        onClose={() => {
          if (isLoading) return;
          reset();
          close();
        }}
        title="Quiz"
        centered
        color="white"
        styles={{
          header: { backgroundColor: theme.colors.base[10] },
          body: { backgroundColor: theme.colors.base[10] },
          close: {
            color: theme.colors.red[7],
          },
        }}
      >
        <LoadingOverlay
          visible={isLoading}
          color="red"
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
        <Flex style={{ width: '100%' }} direction="column" gap={10}>
          <Input.Wrapper label="Nama" style={{ width: '100%' }} error={errors.name?.message}>
            <Input
              placeholder="Nama"
              {...register('name')}
              styles={{
                input: { backgroundColor: 'white', color: 'black' },
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper
            label="No Telp."
            style={{ width: '100%' }}
            error={errors.phone_no?.message}
          >
            <Input
              placeholder="No Telp."
              {...register('phone_no')}
              type="number"
              styles={{
                input: { backgroundColor: 'white', color: 'black' },
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Email" style={{ width: '100%' }} error={errors.email?.message}>
            <Input
              placeholder="Email"
              type="email"
              {...register('email')}
              styles={{
                input: { backgroundColor: 'white', color: 'black' },
              }}
            />
          </Input.Wrapper>
          <Flex justify="center" align="center" gap={10}>
            <NativeSelect
              label="Jenis Kelamin"
              style={{ width: '100%' }}
              onChange={(event) => {
                const { value } = event.target;
                if (value === 'Laki-Laki') {
                  setValue('sex_type', Gender['Laki-Laki']);
                } else if (value === 'Perempuan') {
                  setValue('sex_type', Gender.Perempuan);
                } else {
                  setValue('sex_type', '');
                }
              }}
              error={errors.sex_type?.message}
              styles={{
                input: { backgroundColor: 'white', color: 'black' },
              }}
              data={['Pilih jenis kelamin', ...Object.keys(Gender)]}
            />
            <NativeSelect
              label="Umur"
              style={{ width: '100%' }}
              onChange={(event) => {
                const { value } = event.target;
                if (value === '') {
                  setValue('age', '');
                } else {
                  setValue('age', value);
                }
              }}
              error={errors.age?.message}
              styles={{
                input: { backgroundColor: 'white', color: 'black' },
              }}
              data={[
                { label: 'Pilih umur', value: '' },
                '6-12',
                '13-17',
                '18-22',
                '23-30',
                '31-40',
                '41-50',
                '50 ke atas',
              ]}
            />
          </Flex>
          <NativeSelect
            label="Kelurahan"
            style={{ width: '100%' }}
            onChange={(event) => {
              const { value } = event.target;
              if (value === '') {
                setValue('village_id', '');
              } else {
                const id = data?.village?.find((village) => village?.village === value)?.id;
                setValue('village_id', id ?? '');
              }
            }}
            error={errors.village_id?.message}
            styles={{
              input: { backgroundColor: 'white', color: 'black' },
            }}
            data={[
              { label: 'Pilih kelurahan', value: '' },
              ...(data?.village?.map((village) => village?.village ?? '') ?? []),
            ]}
          />
          <NativeSelect
            label="Pekerjaan"
            onChange={(event) => {
              const { value } = event.target;
              if (value === '') {
                setValue('work', '');
              } else {
                setValue('work', value ?? '');
              }
            }}
            error={errors.work?.message}
            style={{ width: '100%' }}
            styles={{
              input: { backgroundColor: 'white', color: 'black' },
            }}
            data={[{ label: 'Pilih pekerjaan', value: '' }, ...(Object.values(Jobs) ?? [])]}
          />
          <Input.Wrapper
            label="Pekerjaan Lainnya"
            style={{
              width: '100%',
              opacity: watch('work')?.includes('Pekerja Lainnya') ? 1 : 0,
              display: watch('work')?.includes('Pekerja Lainnya') ? 'block' : 'none',
              transition: 'all 0.2s ease',
              transitionBehavior: 'allow-discrete',
            }}
            error={errors.other_work?.message}
          >
            <Input
              placeholder="Pekerjaan Lainnya"
              {...register('other_work')}
              styles={{
                input: { backgroundColor: 'white', color: 'black' },
              }}
            />
          </Input.Wrapper>
          <Space h={theme.spacing.xl} />
          <Button
            color={theme.colors.yellow[9]}
            onClick={handleSubmit(({ other_work, ...quizDto }) => mutate(quizDto))}
          >
            KIRIM
          </Button>
        </Flex>
      </Modal>
    </>
  );
}
