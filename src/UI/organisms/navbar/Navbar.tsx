import Link from 'next/link';
import styles from './navbar.module.scss';
import Image from 'next/image';

interface NavbarProps {
    children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Link className={styles.link} href={'#'}>
                <Image src='/assets/svg/TurnoGo_Logo.svg' width={115} height={65} alt='Logo TurnoGo' />
            </Link>
            <nav className={styles.navContainer}>
                {children}
            </nav>
        </div>
    );
};

export default Navbar;
