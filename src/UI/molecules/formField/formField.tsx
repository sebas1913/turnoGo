"use client";

import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";
import { Input } from "@/UI/atoms/input/Input";
import Label from "@/UI/atoms/label/Label";
import styles from './formField.module.scss';

interface IPropsFormField<T extends FieldValues> {
    label: string;
    type: string;
    name: Path<T>;
    control: Control<T>;
    error?: FieldError;
    id?: string;
    placeholder?: string;
    min?: string;
    max?: string;
}

export const FormField = <T extends FieldValues>({
    label,
    type,
    name,
    control,
    error,
    id,
    placeholder,
    min,
    max,
}: IPropsFormField<T>) => {
    return (
        <div className={styles.containerField}>
            <Label className={styles.label} htmlFor={id || label.toLowerCase()}>{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        <Input
                            {...field}
                            value={field.value ?? ''}
                            error={error?.message}
                            id={id || label.toLowerCase()}
                            type={type}
                            placeholder={placeholder || `Ingresa tu ${label.toLowerCase()}`}
                            min={min}
                            max={max}
                        />
                    </>
                )}
            />
            {error && <p className={styles.errorMessage}>{error.message}</p>}
        </div>
    );
};
