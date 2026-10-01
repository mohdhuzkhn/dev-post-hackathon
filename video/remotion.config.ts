/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// Limit encoder memory on laptops; screenshot footage remains sharp at CRF 18.
Config.overrideFfmpegCommand(({args}) => [
  ...args.slice(0, -1),
  "-threads", "1", "-preset", "veryfast", "-tune", "zerolatency",
  args[args.length - 1],
]);
