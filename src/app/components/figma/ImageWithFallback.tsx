import React from "react";

type Props = {
  /** Puedes pasar una URL normal o una ruta local, pero NO es obligatoria */
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;

  /** Texto a mostrar si no hay imagen o si falla */
  fallbackText?: string;
};

export default function ImageWithFallback({
  src,
  alt = "",
  className,
  style,
  width,
  height,
  fallbackText = "Imagen no disponible",
}: Props) {
  const [failed, setFailed] = React.useState(false);

  // Si no hay src o ya falló, mostramos placeholder
  if (!src || failed) {
    return (
      <div
        className={className}
        style={{
          width: width ?? "100%",
          height: height ?? 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.06)",
          border: "1px dashed rgba(255,255,255,0.16)",
          color: "rgba(255,255,255,0.65)",
          borderRadius: 12,
          fontSize: 14,
          textAlign: "center",
          padding: 12,
          ...style,
        }}
        role="img"
        aria-label={alt || fallbackText}
      >
        {fallbackText}
      </div>
    );
  }

  // Si hay src, intentamos renderizar img normal
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ ...style, width, height, borderRadius: style?.borderRadius ?? 12 }}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
