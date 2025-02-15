"use client";

import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";
import Label from "@/UI/atoms/label/Label";
import styles from "./select.module.scss";

interface Option {
    value: string | number;
    label: string;
}

interface IPropsSelectField<T extends FieldValues> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    options: Option[];
    error?: FieldError;
    id?: string;
}

export const SelectField = <T extends FieldValues>({
    label,
    name,
    control,
    options,
    error,
    id,
}: IPropsSelectField<T>) => {
    return (
        <div className={styles.containerField}>
            <Label className={styles.label} htmlFor={id || name}>{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <select {...field} className={`${styles.select} ${error ? styles.error : ""}`} id={id || name}>
                        <option value="">Selecciona una opción</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            />
            {error && <p className={styles.errorMessage}>{error.message}</p>}
        </div>
    );
};
