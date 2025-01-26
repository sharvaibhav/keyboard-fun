import KeyboardLearning from "./components/keyboard/KeyboardLearning";
import { SoundProvider } from "./sound/SoundContext";
import SoundSettingsModal from "./sound/SoundSettingsModal";

function App() {
  return (
    <SoundProvider>
      <div className="flex justify-end p-4">
        <SoundSettingsModal />
      </div>
      <KeyboardLearning />
    </SoundProvider>
  );
}

export default App;

// import { SoundSettingsModal } from "@/components/sound/SoundSettingsModal";
// import { SoundProvider } from "./sound/SoundContext";
// import KeyboardLearning from "./components/keyboard/KeyboardLearning";

// function App() {
//   return (
//     <SoundProvider>
//       <div className="flex justify-end p-4">
//         <SoundSettingsModal />
//       </div>
//       {/* Rest of your app */}
//       <KeyboardLearning />
//     </SoundProvider>
//   );
// }
