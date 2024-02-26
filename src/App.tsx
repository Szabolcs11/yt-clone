import VideoPlayer from "./VideoPlayer/VideoPlayer";
import "./styles/style.css";

function App() {
  return (
    <div>
      <p>App</p>
      <VideoPlayer url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
      <VideoPlayer url="http://localhost:5173/videos/2023-11-06 17-12-52.mkv" />
    </div>
  );
}

export default App;
