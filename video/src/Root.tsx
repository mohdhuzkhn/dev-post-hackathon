import { Composition } from "remotion";
import { Walkthrough } from "./Walkthrough";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VentureStress"
        component={Walkthrough}
        durationInFrames={1218}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
