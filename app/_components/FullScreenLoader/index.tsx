import ReactDOM from 'react-dom';
import { Spinner } from '@/components/ui/Spinner';

interface FullScreenLoaderProps {
  isVisible: boolean;
}

function FullScreenLoader({ isVisible }: FullScreenLoaderProps) {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <Spinner />
    </div>,
    document.body,
  );
}

export default FullScreenLoader;
