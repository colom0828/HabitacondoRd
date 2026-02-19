import React from "react";

type Props = {
  /** Ruta normal: "/logo.png" (public) o URL "https://..." */
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;

  /** Opcional: imagen alternativa si falla */
  fallbackSrc?: string;

  /** Opcional: placeholder si no hay src */
  placeholderSrc?: string;
};

export default function ImageWithFallback({
  src,
  alt = "",
  className,
  style,
  width,
  height,
  fallbackSrc = "/placeholder.png",
  placeholderSrc = "/placeholder.png",
}: Props) {
  const [currentSrc, setCurrentSrc] = React.useState<string>(
    src && src.trim().length > 0 ? src : placeholderSrc
  );

  React.useEffect(() => {
    setCurrentSrc(src && src.trim().length > 0 ? src : placeholderSrc);
  }, [src, placeholderSrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={{ ...style, width, height }}
      loading="lazy"
      onError={() => {
        // evita loops si fallback también falla
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}
