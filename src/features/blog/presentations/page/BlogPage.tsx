import { BlogDetailEntity } from '@/src/shared/domain/entities';
import { usePageProps } from '@/src/shared/presentations/contexts';
import { BlogPaper } from '../components';

export default function LandingPage() {
  const data = usePageProps<BlogDetailEntity>();
  return (
    <>
      <BlogPaper blogEntity={data} />
    </>
  );
}
