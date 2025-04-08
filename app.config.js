import 'dotenv/config';

export default {
  expo: {
    name: "AlgoView",
    slug: "algoview",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#ffffff"
      }
    },
    web: {
    },
    extra: {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    },
  }
};