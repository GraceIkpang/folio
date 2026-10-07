import Image from "next/image";
import Link from "next/link";
import type { Shot } from "@/content/site";
import { LoopingVideo } from "./looping-video";
import { WindowFrame } from "./window-frame";

/** A UI exploration preview that opens the shot's full page. */
export function UiShotCard({ shot }: { shot: Shot }) {
  return (
    <Link
      href={`/explorations/${shot.slug}`}
      className="group block rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <WindowFrame className="transition-colors group-hover:border-muted/40">
        <figure className="relative overflow-hidden rounded-md">
          {shot.preview ? (
            <LoopingVideo
              src={shot.preview.src}
              poster={shot.preview.poster}
              width={534}
              height={698}
              className="aspect-[178.5/233.33] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <Image
              src={shot.image}
              alt=""
              width={357}
              height={467}
              sizes="(min-width: 640px) 179px, 50vw"
              className="aspect-[178.5/233.33] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          )}
          {/* Keeps the white name readable over the moving preview. */}
          {shot.preview && (
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/45 to-transparent"
            />
          )}
          <figcaption className="absolute bottom-2 left-[6.5px] p-1 font-system text-caption font-medium text-white">
            {shot.name}
          </figcaption>
        </figure>
      </WindowFrame>
    </Link>
  );
}
