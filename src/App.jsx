import React, { useState, useRef, useEffect } from "react";
import KineticText from "./components/KineticText";
import ReactAudioPlayer from "react-audio-player";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

// Fungsi untuk konversi waktu h:m:s.ms ke detik
const convertTimeToSeconds = (time) => {
  const [hours, minutes, seconds] = time.split(":").map(parseFloat);
  return hours * 3600 + minutes * 60 + seconds;
};

const lyrics = [
  { text: "Persis setahun yang lalu", start: "00:00:11.150", end: "00:00:14.080" },
  { text: "Ku dijauhkan dari yang tak ditakdirkan untukku", start: "00:00:14.160", end: "00:00:20.170" },
  { text: "Yang kuingat saat itu", start: "00:00:23.020", end: "00:00:25.130" },
  { text: "Yang kulakukan hanya menggerutu Angkuh", start: "00:00:25.240", end: "00:00:32.110" },
  { text: "Lebih percaya cara-caraku", start: "00:00:33.190", end: "00:00:36.170" },
  { text: "Pilih ragukan rencana Sang Maha Penentu", start: "00:00:36.180", end: "00:00:41.010" },
  { text: "Untungnya bumi masih berputar", start: "00:00:45.050", end: "00:00:50.090" },
  { text: "Untungnya ku tak pilih menyerah", start: "00:00:50.230", end: "00:00:56.120" },
  { text: "Untungnya ku bisa rasa", start: "00:00:56.220", end: "00:00:59.170" },
  { text: "Hal-hal baik yang datangnya belakangan", start: "00:00:59.180", end: "00:01:05.020" },
  { text: "Ada waktu-waktu", start: "00:01:29.200", end: "00:01:35.140" },
  { text: "Hal buruk datang berturut-turut", start: "00:01:36.060", end: "00:01:40.170" },
  { text: "Semua yang tinggal juga yang hilang", start: "00:01:41.110", end: "00:01:44.100" },
  { text: "Seberapapun absurd-nya pasti ada makna", start: "00:01:44.110", end: "00:01:48.180" },
  { text: "Untungnya bumi masih berputar", start: "00:01:53.000", end: "00:01:58.150" },
  { text: "Untungnya ku tak pilih menyerah", start: "00:01:58.160", end: "00:02:03.220" },
  { text: "Itu memang paling mudah", start: "00:02:04.180", end: "00:02:07.160" },
  { text: "Untungnya kupilih yang lebih susah", start: "00:02:07.170", end: "00:02:12.150" },
  { text: "Untungnya ku pakai akal sehat", start: "00:02:15.160", end: "00:02:20.210" },
  { text: "Untungnya hidup terus berjalan", start: "00:02:21.050", end: "00:02:26.240" },
  { text: "Untungnya ku bisa rasa", start: "00:02:27.080", end: "00:02:30.010" },
  { text: "Hal-hal baik yang datangnya belakangan", start: "00:02:30.020", end: "00:02:34.230" },
  { text: "Untungnya untungnya hidup harus tetap berjalan", start: "00:02:42.170", end: "00:02:52.030" }
];

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleTimeUpdate = (currentTime) => {
    setCurrentTime(currentTime);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.audioEl.current.pause();
    } else {
      audioRef.current.audioEl.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current.audioEl.current;
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    return () => {
      audio.removeEventListener('play', () => setIsPlaying(true));
      audio.removeEventListener('pause', () => setIsPlaying(false));
    };
  }, []);
  console.log(`Current time: ${currentTime}`);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-purple-900 to-black overflow-hidden">
      {/* Galaxy Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-30 animate-pulse"></div>
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="z-10 w-full max-w-4xl px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8">
          Bernadya - Untungnya, Hidup Harus Tetap Berjalan
        </h1>

        {/* Audio Player */}
        <div className="mb-8 flex justify-center items-center">
          <ReactAudioPlayer
            src="/Bernadya - Untungnya, Hidup Harus Tetap Berjalan.mp3"
            controls
            ref={audioRef}
            onListen={handleTimeUpdate}
            listenInterval={100}
            className="hidden"
          />
          <button onClick={togglePlay} className="text-white text-4xl">
            {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
          </button>
        </div>

        {/* Lyrics */}
        <div className="lyrics-container space-y-4">
          {lyrics.map((line, index) => (
            <KineticText
              key={index}
              text={line.text}
              start={convertTimeToSeconds(line.start)}
              end={convertTimeToSeconds(line.end)}
              currentTime={currentTime}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
