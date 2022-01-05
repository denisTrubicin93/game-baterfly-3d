import React, {
  useRef,
  createContext,
  useEffect,
  useCallback,
  useState,
} from "react";

//Components
import EditorController from "./EditorController";
import BabylonManager from "./BabylonManager";
//

export const GmContext = createContext(null);
//

const Editor = () => {
  const gmRef = useRef(null);
  const [gameManager, setGameManager] = useState(null);


  useEffect(() => {
    const GManger = BabylonManager(gmRef.current).GManger; //Create Babylonjs Ref
    setGameManager(GManger);
  }, [setGameManager]);

  const setHandler = useCallback((newHandler) => {
    setGameManager((GManger) => {
      GManger.studioSceneManager.handlers = newHandler; //Hnadlers
      return GManger;
    });
  }, [])

  const renderTabs = () => {
    return (
      <>
        <canvas {...{}} className="canvas" ref={gmRef} style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          height: '100%',
          zIndex: '100',
        }} />
      </>
    );
  };

  return (
    <GmContext.Provider value={{ gm: gameManager, setHandler: setHandler }}>
      <EditorController renderTabs={renderTabs()} />
    </GmContext.Provider>
  );
};
export default Editor;

// On Windows Shift + Alt + F.
// On Mac Shift + Option + F.
