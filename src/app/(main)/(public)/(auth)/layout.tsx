import { ReactNode } from 'react';
import styles from './layout.module.scss';
import Navbar from '@/UI/organisms/navbar/Navbar';
import Link from 'next/link';
import Button from '@/UI/atoms/button/Button';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.layoutContainer}>
            <Navbar>
                <Link className={styles.link} href={'/login'}>
                    <Button variant='primary'>Iniciar sesión</Button>
                </Link>
                <Link className={styles.link} href={'/register'}>
                    <Button variant='secondary'>Regístrate</Button>
                </Link>
            </Navbar>
            <main className={styles.main}>{children}</main>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
