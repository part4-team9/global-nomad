'use client';

import 'react-quill/dist/quill.snow.css';
import 'styles/react-quill.css';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import type { Activity, ActivityEdit } from '@/_types/activities/formTypes';

import Textarea from '@/_components/Textarea';

const ReactQuill = dynamic(() => import('react-quill'), { loading: () => <Textarea size="big" placeholder="설명" />, ssr: false });

interface TextEditorProps<T> {
  setFormData: Dispatch<SetStateAction<T>>;
  value: string;
}

function TextEditor<T>({ setFormData, value }: TextEditorProps<T>) {
  const [description, setDescription] = useState(value);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [[{ header: [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike']],
      },
    }),
    [],
  );

  useEffect(() => {
    setFormData((prev: T) => ({
      ...prev,
      description,
    }));
  }, [description, setFormData]);

  return <ReactQuill theme="snow" value={description} onChange={setDescription} modules={modules} placeholder="설명" />;
}

export default TextEditor;
