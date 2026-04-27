const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('obj', 'mtl', '3ds');

module.exports = withNativeWind(config, { input: "./global.css" });
