"use client"

import { useGlobalDataStore } from '@/stores';
import './Footer.scss';

export default function Footer() {

    const {siteName, currentYear} = useGlobalDataStore();

    return (
        <footer>
            <div className="content">
                <p>©{currentYear} - {siteName}</p>
            </div>
        </footer>
    )
}