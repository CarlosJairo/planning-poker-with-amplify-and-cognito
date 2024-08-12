import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SplashScreen from "./components/pages/SplashScreen/SplashScreen";
import CreateGameScreen from "./components/pages/CreateGameScreen/CreateGameScreen";
import GameTableScreen from "./components/pages/GameTableScreen/GameTableScreen";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

// Estilos
import "@aws-amplify/ui-react/styles.css";

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);

  return (
    <Authenticator>
      {() => (
        <>
          <HashRouter>
            <Routes>
              <Route
                path="/"
                element={
                  showSplashScreen ? (
                    <SplashScreen
                      showSplashScreen={showSplashScreen}
                      setShowSplashScreen={setShowSplashScreen}
                    />
                  ) : (
                    <CreateGameScreen />
                  )
                }
              />
              <Route path="/game/:gameName" element={<GameTableScreen />} />
            </Routes>
          </HashRouter>
        </>
      )}
    </Authenticator>
  );
}

export default App;
