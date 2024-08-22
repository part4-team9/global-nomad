'use client';

import 'react-quill/dist/quill.snow.css';
import 'styles/react-quill.css';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import type { Activity } from '@/_types/activities/formTypes';

import Textarea from '@/_components/Textarea';

const ReactQuill = dynamic(() => import('react-quill'), { loading: () => <Textarea size="big" placeholder="설명" />, ssr: false });

interface TextEditorProps {
  setFormData: Dispatch<SetStateAction<Activity>>;
}

function TextEditor({ setFormData }: TextEditorProps) {
  const [description, setDescription] = useState('');

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [[{ header: [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike']],
      },
    }),
    [],
  );

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      description,
    }));
  }, [description, setFormData]);

  return <ReactQuill theme="snow" onChange={setDescription} modules={modules} placeholder="설명" />;
}

export default TextEditor;
