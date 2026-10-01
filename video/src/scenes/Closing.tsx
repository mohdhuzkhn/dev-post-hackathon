import {
  AbsoluteFill,
  Interactive,
  interpolate,
  useCurrentFrame,
} from "remotion";
export const Closing = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#183a34",
        color: "#f5f4eb",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Interactive.Div
        name="Project name"
        style={{
          fontSize: 112,
          fontWeight: 700,
          letterSpacing: -5,
          opacity: interpolate(frame, [0, 24], [0, 1], {
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [0, 30], ["0px 20px", "0px 0px"], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        VentureStress AI
      </Interactive.Div>
      <Interactive.Div
        name="Existing project tagline"
        style={{ fontSize: 46, color: "#cad9bb", marginTop: 30 }}
      >
        Clarity before commitment.
      </Interactive.Div>
      <Interactive.Div
        name="Live project URL"
        style={{ fontSize: 32, marginTop: 80, color: "#e3eae0" }}
      >
        venturestress-ai.netlify.app
      </Interactive.Div>
    </AbsoluteFill>
  );
};
