interface FormFieldProps {
  children: React.ReactNode;
  htmlFor: string;
  label: string;
}

function FormField({ htmlFor, label, children }: FormFieldProps) {
  return (
    <div className="grid gap-3 tablet:gap-4">
      <label htmlFor={htmlFor} className="w-fit text-xl font-bold leading-[1.3] tablet:text-2xl tablet:leading-[1.1]">
        {label}
      </label>
      {children}
    </div>
  );
}

export default FormField;
