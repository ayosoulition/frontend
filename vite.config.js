import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // CRITICAL: This allows other devices on your Wi-Fi network to see the app
    port: 3000, // This forces the React frontend to run on port 3000
    cors: true, // Tells Vite to allow cross-origin resource sharing during development
  },
});
