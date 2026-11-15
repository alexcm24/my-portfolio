import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";

type Props = {
  image: ProjectImage;
  /** how wide the frame is drawn, for the responsive image sizes */
  sizes: string;
  className?: string;
  /** a shared frame ratio (a pair of screenshots); the screenshot sits whole inside it on its edge colour */
  box?: string;
  priority?: boolean;
};

// A real screenshot at its own proportions in a quiet frame: never stretched, cropped or drawn wider
// than its file (the frame's column is narrower than every screenshot here).
export default function Shot({ image, sizes, className = "", box, priority = false }: Props) {
  const style = box
    ? ({ "--ar": box, "--shot-bg": image.edge ?? "#f3f2ef" } as React.CSSProperties)
    : undefined;
  return (
    <figure className={`shot${box ? " shot--box" : ""} ${className}`.trim()} style={style}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        quality={90}
        priority={priority}
      />
    </figure>
  );
}
