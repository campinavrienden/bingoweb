import { useEffect, useRef } from 'react';

const WakeLockProvider = () => {
    const wakeLockRef = useRef<WakeLockSentinel | null>(null);

    const requestWakeLock = async () => {
        try {
            if ('wakeLock' in navigator) {
                wakeLockRef.current = await navigator.wakeLock.request('screen');
                console.log('Screen Wake Lock active');

                wakeLockRef.current.addEventListener('release', () => {
                    console.log('Screen Wake Lock released');
                });
            } else {
                console.warn('Wake Lock API not supported on this browser.');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(`Wake Lock error: ${err.name}, ${err.message}`);
            }
        }
    };

    useEffect(() => {
        // Request wake lock on mount
        requestWakeLock();

        // Re-request wake lock if page becomes visible again
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                requestWakeLock();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            // Release wake lock on unmount
            if (wakeLockRef.current) {
                wakeLockRef.current.release();
            }
        };
    }, []);

    return null; // this component does not render anything
};

export default WakeLockProvider;
