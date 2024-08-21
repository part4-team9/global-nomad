'use client';

import 'react-quill/dist/quill.snow.css';
import 'styles/react-quill.css';

import { useMemo } from 'react';
import ReactQuill from 'react-quill';

function TextEditor() {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [[{ header: [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike']],
      },
    }),
    [],
  );

  return (
    <div>
      <ReactQuill theme="snow" modules={modules} placeholder="설명" />
    </div>
  );
}

export default TextEditor;
