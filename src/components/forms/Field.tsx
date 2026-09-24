import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const control =
  "w-full rounded-2xl border-2 border-transparent bg-mint/60 px-4 py-3.5 text-base text-ink placeholder:text-ink/45 transition-colors duration-200 focus:border-brand focus:bg-paper focus:outline-none aria-[invalid=true]:border-ink aria-[invalid=true]:bg-sun/15";

type Shared = { id: string; label: string; error?: string; hint?: string; optional?: boolean; className?: string };

function Wrap({ id, label, error, hint, optional, className = "", children }: Shared & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-2 text-sm font-medium">
        <span>{label}</span>
        {optional && <span className="text-xs font-normal text-ink/75">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink/75">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium">
          <span aria-hidden="true" className="grid size-4 place-items-center rounded-full bg-ink text-[0.65rem] leading-none text-paper">
            !
          </span>
          {error}
        </p>
      )}
    </div>
  );
}

const describe = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function TextField({ id, label, error, hint, optional, className, ...rest }: Shared & Omit<InputHTMLAttributes<HTMLInputElement>, "id">) {
  return (
    <Wrap {...{ id, label, error, hint, optional, className }}>
      <input id={id} name={id} aria-invalid={!!error} aria-describedby={describe(id, error, hint)} className={control} {...rest} />
    </Wrap>
  );
}

export function TextAreaField({ id, label, error, hint, optional, className, ...rest }: Shared & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">) {
  return (
    <Wrap {...{ id, label, error, hint, optional, className }}>
      <textarea id={id} name={id} rows={5} aria-invalid={!!error} aria-describedby={describe(id, error, hint)} className={`${control} resize-y`} {...rest} />
    </Wrap>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  options,
  defaultValue = "",
  ...rest
}: Shared & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & { options: readonly string[] }) {
  return (
    <Wrap {...{ id, label, error, hint, optional, className }}>
      <select
        id={id}
        name={id}
        defaultValue={defaultValue}
        aria-invalid={!!error}
        aria-describedby={describe(id, error, hint)}
        className={`${control} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' stroke='%231F2937' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m5 8 5 5 5-5'/%3E%3C/svg%3E")] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat pr-11`}
        {...rest}
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrap>
  );
}
