module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "allowUndefined": false // Isse yeh sunishchit hoga ki keys load hon
      }]
    ]
  };
};