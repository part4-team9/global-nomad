'use client';

import 'react-quill/dist/quill.snow.css';
import 'styles/react-quill.css';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function TextEditor() {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [[{ header: [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike']],
      },
    }),
    [],
  );

  return <ReactQuill theme="snow" modules={modules} placeholder="설명" />;
}

export default TextEditor;
