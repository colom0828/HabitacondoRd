import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Plugin: neutraliza imports tipo "figma:asset/..."
 * - En Vercel ese esquema no existe.
 * - Como tú NO quieres usar imágenes, devolvemos un string vacío.
 */
function ignoreFigmaAssets() {
  const VIRTUAL_EMPTY = "\0virtual:figma-asset-empty";
  return {
    name: "ignore-figma-assets",
    enforce: "pre" as const,
    resolveId(id: string) {
      if (id.startsWith("figma:asset/")) return VIRTUAL_EMPTY;
      return null;
    },
    load(id: string) {
      if (id === VIRTUAL_EMPTY) {
        // Export default vacío => <img src="" ...> no rompe build
        return 'export default "";\n';
      }
      return null;
    }
  };
}

export default defineConfig({
  plugins: [ignoreFigmaAssets(), react(), tailwindcss()]
});
