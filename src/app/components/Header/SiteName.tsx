import { useGlobalDataStore } from "@/stores";
import Link from "next/link";
import './SiteName.scss';

export default function SiteName() {

    const {siteName} = useGlobalDataStore();

    return (
        <Link href="/">
            <h1 className="siteName">{siteName}</h1>
        </Link>
    )
};