import { JSX } from 'react';
import styles from './table.module.scss';
import Title from '@/UI/atoms/title/Title';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    title?: string;
    headers: { label: React.ReactNode; key: string }[];
    data: { [key: string]: unknown | JSX.Element }[];
}

const Table: React.FC<TableProps> = ({ headers, title, data, ...props }) => {
    return (
        <div className={styles.container}>
            <Title className={styles.title} level={3}>{title}</Title>
            <table className={styles.table} {...props}>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, colIndex) => (
                                <td key={colIndex}>
                                    {row[header.key] as React.ReactNode}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
