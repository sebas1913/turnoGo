export default function HomeTemplate() {
    return (
        <div>
            <picture>
                <source srcSet="/assets/svg/banner-mobile.svg" media="(max-width: 768px)" />
                <img src="/assets/svg/banner.svg" width="100%" alt="Banner" />
            </picture>
        </div>
    );
}