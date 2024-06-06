import { Release } from "@/types/releaseTypes";
import { useGlobalDataStore } from "@/stores";
import { useState } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import DBCardButton from "./DBCardButton";

interface CopyToClipboardButtonProps {
    release: Release;
}

export default function CopyToClipboardButton ({ release }: CopyToClipboardButtonProps) {

    // get the frontend address and form the landing-page link
    const {frontendAddress} = useGlobalDataStore();
    const landingPageLink: string = `${frontendAddress}/${release.slug}`;

    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <CopyToClipboard text={landingPageLink} onCopy={handleCopy}>
            {copied ? 
                (
                    <DBCardButton name="Copied in clipboard" icon="el:ok-sign"/>
                )
            :
                (
                    <DBCardButton name="Copy album link" icon="mingcute:link-fill"/>
                )
            }
        </CopyToClipboard>
    )
}