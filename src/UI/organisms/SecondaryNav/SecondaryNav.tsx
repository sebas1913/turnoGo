"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './secondary.module.scss';

const SecondaryNav: React.FC = () => {
    const pathname = usePathname();

    return (
        <div className={styles.container}>
            <nav className={styles.navContainer}>
                <Link
                    href="/dashboard/appointments"
                    className={`${styles.link} ${pathname === '/dashboard/appointments' ? styles.active : ''}`}
                >
                    Citas programadas
                </Link>
                <Link
                    href="/dashboard/services"
                    className={`${styles.link} ${pathname === '/dashboard/services' ? styles.active : ''}`}
                >
                    Servicios
                </Link>
                <Link
                    href="/dashboard/usersList"
                    className={`${styles.link} ${pathname === '/dashboard/usersList' ? styles.active : ''}`}
                >
                    Listado usuarios
                </Link>
            </nav>
        </div>
    );
}

export default SecondaryNav;
