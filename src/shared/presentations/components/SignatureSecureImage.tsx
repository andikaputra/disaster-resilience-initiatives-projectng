import { useState } from 'react';
import { OnLoadingComplete, PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { getCookie } from 'cookies-next/client';
import { Box, Loader } from '@mantine/core';

type SecureImageProps = Omit<
  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  'height' | 'width' | 'loading' | 'ref' | 'alt' | 'src' | 'srcSet'
> & {
  src: string;
  alt: string;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  fill?: boolean | undefined;
  loader?: undefined;
  quality?: number | `${number}` | undefined;
  priority?: boolean | undefined;
  loading?: 'eager' | 'lazy' | undefined;
  placeholder?: PlaceholderValue | undefined;
  blurDataURL?: string | undefined;
  unoptimized?: boolean | undefined;
  overrideSrc?: string | undefined;
  onLoadingComplete?: OnLoadingComplete | undefined;
  layout?: string | undefined;
  objectFit?: string | undefined;
  objectPosition?: string | undefined;
  lazyBoundary?: string | undefined;
  lazyRoot?: string | undefined;
} & React.RefAttributes<HTMLImageElement | null>;

export default function SignatureSecureImage(props: SecureImageProps) {
  const cookie = getCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string);
  const imageSrcWithToken = `${props.src}&token=${cookie}`;
  return (
    <Image
      {...props}
      alt={`signature-secure-image${props.alt ? `-${props.alt}` : ''}`}
      src={imageSrcWithToken}
      style={{
        ...props.style,
      }}
    />
  );
}
