"use client"

import { Release } from '@/types/releaseTypes';
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Icon } from '@iconify/react';
import './VCardCoverPlayer.scss';

interface SelectedReleaseProps {
    selectedRelease: Release;
};

export default function VCardCoverPlayer({selectedRelease}: SelectedReleaseProps) {

    // note that some releases have no preview - in this case, the player is not displayed

    // state for the playing status of the audio preview
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // initialize the Audio object only on the client side
    useEffect(() => {
        if (typeof window !== "undefined") {
            audioRef.current = new Audio();
        }
    }, []);

    // an audio preview has a duration time of 30s. function to launch the preview and reset the player after 30s
    const playPreview = (previewUrl: string): void => {
        if (previewUrl && audioRef.current) {
            audioRef.current.src = previewUrl;
            audioRef.current.play();
            setIsPlaying(true);
            setTimeout(() => {
                setIsPlaying(false);
            }, 30000);
        }
    };

    // stop the preview
    const stopPreview = (): void => {
        audioRef.current?.pause();
        setIsPlaying(false);
    };

    return (
        <div className="image-container">
            <Image 
                className="img"
                src={selectedRelease.cover}
                width={500}
                height={500}
                alt={selectedRelease.title}
                priority
            />
            {selectedRelease.preview && 
                <>
                    <div className="player-icon-container">
                        {isPlaying ? 
                            (<Icon icon="zondicons:pause-outline" onClick={stopPreview} className="icon" />)
                        :
                            (<Icon icon="zondicons:play-outline" onClick={() => playPreview(selectedRelease.preview)} className="icon"/>)
                        }
                    </div>
                    <div className={` ${isPlaying ? "counter-container" : "hidden-counter-container" }`}>
                        <CountdownTimer isPlaying={isPlaying} />
                    </div>
                    <div className={` ${isPlaying ? "progress-bar" : "hidden-progress-bar" }`}></div>
                </>
            }
        </div>
    )
};

interface CountdownTimerProps {
    isPlaying: boolean;
}

function CountdownTimer ({isPlaying}: CountdownTimerProps) {

    const [count, setCount] = useState<number>(30);

    useEffect(() => {
        if (!isPlaying) {
            setCount(30);
            return
        }

        if (count <= 0) return;

        const interval: NodeJS.Timeout = setInterval(() => {
            setCount(prevCount => prevCount -1);
        }, 1000);

        return () => clearInterval(interval)
    }, [isPlaying, count]);

    const formatTime = (seconds: number) => {
        const minutes: number = Math.floor(seconds / 60);
        const formattedSeconds = seconds % 60;
        return `${minutes}:${formattedSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className='countdown-timer'>
          {formatTime(count)}
        </div>
    );
}