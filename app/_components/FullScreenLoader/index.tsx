import { Spinner } from '@/components/ui/Spinner';

interface FullScreenLoaderProps {
  isVisible: boolean;
}

function FullScreenLoader({ isVisible }: FullScreenLoaderProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Spinner />
    </div>
  );
}

export default FullScreenLoader;
