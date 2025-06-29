module.exports.withExpoSvgTransformer = (config) => {
  const originalMetroConfigTransformPath =
    config.transformer.babelTransformerPath;

  return {
    ...config,
    transformer: {
      ...config.transformer,
      unstable_allowRequireContext: true,
      babelTransformerPath: require.resolve("./transformer"),
      originalMetroConfigTransformPath
    },
    resolver: {
      ...config.resolver,
      assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...new Set([...config.resolver.sourceExts, "svg"])]
    }
  };
};
