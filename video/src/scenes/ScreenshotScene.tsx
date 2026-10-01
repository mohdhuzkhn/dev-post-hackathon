import {
  AbsoluteFill,
  CanvasImage,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const ScreenshotScene = ({
  image,
  title,
  step,
}: {
  image: number;
  title: string;
  step: string;
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f4f5ef",
        fontFamily: "Arial, sans-serif",
        color: "#182e36",
      }}
    >
      <Interactive.Div
        name="Brand"
        style={{
          position: "absolute",
          left: 76,
          top: 46,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        VentureStress AI
      </Interactive.Div>
      <Interactive.Div
        name="Scene number"
        style={{
          position: "absolute",
          right: 76,
          top: 48,
          fontSize: 24,
          color: "#29695a",
          letterSpacing: 4,
        }}
      >
        {step} / 08
      </Interactive.Div>
      <Interactive.Div
        name="Scene title"
        style={{
          position: "absolute",
          left: 76,
          top: 102,
          fontSize: 62,
          fontWeight: 600,
          letterSpacing: -2,
          opacity: interpolate(frame, [0, 18], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {title}
      </Interactive.Div>
      <Interactive.Div
        name="Screenshot frame"
        style={{
          position: "absolute",
          left: 76,
          top: 220,
          width: 1768,
          height: 714,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          scale: interpolate(frame, [0, 180], [0.98, 1], {
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [0, 24], ["0px 16px", "0px 0px"], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <CanvasImage
          src={staticFile(`download (${image}).png`)}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Interactive.Div>
      <Interactive.Div
        name="Website"
        style={{
          position: "absolute",
          left: 76,
          bottom: 58,
          fontSize: 25,
          color: "#49645e",
        }}
      >
        venturestress-ai.netlify.app
      </Interactive.Div>
      <Interactive.Div
        name="Format label"
        style={{
          position: "absolute",
          right: 76,
          bottom: 58,
          fontSize: 22,
          color: "#71847c",
        }}
      >
        SCREENSHOT WALKTHROUGH
      </Interactive.Div>
    </AbsoluteFill>
  );
};
