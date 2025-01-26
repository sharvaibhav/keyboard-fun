import KeyboardLearning from "./components/keyboard/KeyboardLearning";
import { SoundProvider } from "./sound/SoundContext";
import SoundSettingsModal from "./sound/SoundSettingsModal";
import { SoundToggleButton } from "./sound/SoundToggleButton";

function App() {
  return (
    <SoundProvider>
      <div className="flex justify-end items-center gap-2 p-4">
        <SoundToggleButton />
        <SoundSettingsModal />
      </div>
      <KeyboardLearning />
    </SoundProvider>
  );
}

export default App;
