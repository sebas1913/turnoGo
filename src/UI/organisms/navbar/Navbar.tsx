import Link from 'next/link';
import styles from './navbar.module.scss';
import Title from '@/UI/atoms/title/Title';

interface NavbarProps {
    children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Link className={styles.link} href={'#'}>
                <Title className={styles.title} level={2}>El Barbero</Title>
            </Link>
            <nav className={styles.navContainer}>
                {children}
            </nav>
        </div>
    );
};

export default Navbar;
