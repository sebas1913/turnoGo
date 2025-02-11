import Link from 'next/link';
import Button from '@/UI/atoms/button/Button';
import styles from './banner.module.scss';

export default function Banner() {
    return (
        <div>
            <picture className={styles.banner}>
                <source srcSet="/assets/svg/banner-mobile.svg" media="(max-width: 768px)" />
                <img src="/assets/svg/banner.svg" width="100%" alt="Banner" />
                <div className={styles.floatButton}>
                    <Button variant="banner" title='¡Agenda tu cita aquí!'>
                        <Link className={styles.link} href={'/login'}>Reserva tu cita aquí</Link>
                    </Button>
                </div>
            </picture>
        </div>
    )
}
