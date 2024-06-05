import MainLayout from "@/app/layouts/MainLayout";
import '../../assets/sass/pages-common-styles.scss';

export default function TestPage() {
    return (
        <>
            <MainLayout>
            <div className='page'>
                <div className="content">
                    <h1>Je suis TestPage avec Header</h1>
                    {/* <Hero /> */}
                </div>
            </div>
            </MainLayout>
        </>
    )
}