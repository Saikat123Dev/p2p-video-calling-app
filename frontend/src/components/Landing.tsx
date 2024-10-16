import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Room } from "./Room";

export const Landing = () => {
    const [name, setName] = useState("");
    const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
    const [localVideoTrack, setLocalVideoTrack] = useState<MediaStreamTrack | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [joined, setJoined] = useState(false);

    const getCam = async () => {
        const stream = await window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        const audioTrack = stream.getAudioTracks()[0];
        const videoTrack = stream.getVideoTracks()[0];
        setLocalAudioTrack(audioTrack);
        setLocalVideoTrack(videoTrack);
        if (!videoRef.current) {
            return;
        }
        videoRef.current.srcObject = new MediaStream([videoTrack]);
        videoRef.current.play();
    };

    useEffect(() => {
        if (videoRef && videoRef.current) {
            getCam();
        }
    }, [videoRef]);

    if (!joined) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <video
                        autoPlay
                        ref={videoRef}
                        className="w-full h-64 bg-gray-200 rounded-lg mb-4"
                    ></video>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={() => setJoined(true)}
                    >
                        Join
                    </button>
                </div>
            </div>
        );
    }

    return <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />;
};
