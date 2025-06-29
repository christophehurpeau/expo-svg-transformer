const { transform } = require("@svgr/core");

const defaultSVGRConfig = {
  native: true,
  plugins: ["@svgr/plugin-jsx"]
};

module.exports.transform = async function expoSvgTransform({
  src,
  filename,
  options,
  originalMetroConfigTransformPath,
  ...rest
}) {
  const ogPath =
    originalMetroConfigTransformPath || "@expo/metro-config/babel-transformer";
  const ogTransform = require(ogPath).transform;

  if (filename.endsWith(".svg")) {
    // const config = await resolveConfig(resolveConfigDir(filename));
    // let svgrConfig = config
    //  ? { ...defaultSVGRConfig, ...config }
    //  : defaultSVGRConfig;
    let svgrConfig = defaultSVGRConfig;
    if (!filename.endsWith(".inline.svg")) {
      svgrConfig = { ...svgrConfig, exportType: "named" };
    }
    return ogTransform({
      src: await transform(src, svgrConfig),
      filename,
      options,
      ...rest
    });
  }
  return ogTransform({ src, filename, options, ...rest });
};
