import React from "react";

type Props = {
  /** Puedes pasar una URL normal o ruta local (opcional). Si no hay, se muestra fallback */
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;

  /** Texto/placeholder cuando NO hay imagen o falla */
  fallbackText?: string;
};

export default function ImageWithFallback({
  src,
  alt = "",
  className,
  style,
  width,
  height,
  fallbackText = "Sin imagen"
}: Props) {
  const [failed, setFailed] = React.useState(false);

  const showFallback = !src || failed;

  if (showFallback) {
    return (
      <div
        className={className}
        style={{
          width,
          height,
          display: "grid",
          placeItems: "center",
          borderRadius: 12,
          border: "1px dashed rgba(255,255,255,0.18)",
          background: "rgba(255,255,255,0.04)",
          color: "rgba(255,255,255,0.65)",
          fontSize: 12,
          textAlign: "center",
          padding: 10,
          ...style
        }}
        aria-label={alt || fallbackText}
      >
        {fallbackText}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ width, height, objectFit: "cover", ...style }}
      onError={() => setFailed(true)}
      loading="lazy"
    />
  );
}
