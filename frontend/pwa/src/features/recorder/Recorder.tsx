import React, { useState, useRef, useEffect } from 'react';

const Recorder = () => {
    const [ recording, setRecording ] = useState(false);
    const [ chunks, setChunks ] = useState<Blob[]>([]);
    const eventsBuffer = useRef<any[]>([]);
    const mediaRecorder = useRef<MediaRecorder | null>(null);

    // 1. Hook up pointer & key events
    useEffect(() => {
        const onClick = (e: PointerEvent) => {
            eventsBuffer.current.push({
                type: 'click',
                x: e.clientX,
                y: e.clientY,
                t: Date.now()
            });
        };
        const onKey = (e: KeyboardEvent) => {
            eventsBuffer.current.push({
                type: 'key',
                key: e.key,
                t: Date.now()
            });
        };
        if (recording) {
            window.addEventListener('pointerdown', onClick);
            window.addEventListener('keydown', onKey)
        }
        return () => {
            window.removeEventListener('pointerdown', onClick);
            window.removeEventListener('keydown', onKey);
        };
    }, [recording])

    // 2. Start recording screen + microphone
    const startRecording = async () => {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true});
        const micStream = await navigator.mediaDevices.getUserMedia({ audio: true});
        const stream = new MediaStream([...screenStream.getVideoTracks(), ...micStream.getAudioTracks()]);

        const mr = new MediaRecorder( stream, { mimeType: 'video/webm; codecs=vp9, opus'});
        mr.ondataavailable = e => setChunks(prev => [...prev, e.data]);
        mr.start(1000); // collect data every second
        mediaRecorder.current = mr;
        setRecording(true)
    }

    // 3. Stop & upload

    // 4. Post to backend
}

export default Recorder;