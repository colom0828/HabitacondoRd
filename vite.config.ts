import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function figmaAssetStub() {
  return {
    name: "figma-asset-stub",
    enforce: "pre",
    resolveId(id: string) {
      if (id.startsWith("figma:asset/")) return id; // lo “capturamos”
      return null;
    },
    load(id: string) {
      if (id.startsWith("figma:asset/")) {
        // devolvemos un módulo válido que exporta un string vacío
        return `export default ""`;
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [figmaAssetStub(), react()],
});
