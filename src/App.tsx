import VideoPlayer from "./VideoPlayer/VideoPlayer";
import "./styles/style.css";

function App() {
  return (
    <div>
      <p>App</p>
      <VideoPlayer url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
    </div>
  );
}

export default App;
