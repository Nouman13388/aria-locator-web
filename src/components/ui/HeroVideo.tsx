import { useRef, useState, useSyncExternalStore } from "react";
import { shouldLoadHeroVideo } from "./heroVideoPolicy";
type Connection = EventTarget & { saveData?: boolean };
const connection = () =>
  (navigator as Navigator & { connection?: Connection }).connection;
function eligible() {
  return shouldLoadHeroVideo({
    width: window.innerWidth,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches,
    saveData: !!connection()?.saveData,
  });
}
function subscribe(listener: () => void) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  window.addEventListener("resize", listener);
  motion.addEventListener("change", listener);
  connection()?.addEventListener("change", listener);
  return () => {
    window.removeEventListener("resize", listener);
    motion.removeEventListener("change", listener);
    connection()?.removeEventListener("change", listener);
  };
}
export function HeroVideo() {
  const load = useSyncExternalStore(subscribe, eligible, () => false);
  const video = useRef<HTMLVideoElement>(null);
  const failedSources = useRef(new Set<string>());
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  function sourceError(format: string) {
    failedSources.current.add(format);
    if (failedSources.current.size === 2) setFailed(true);
  }
  async function toggle() {
    const element = video.current;
    if (!element) return;
    if (element.paused) {
      try {
        await element.play();
      } catch {
        setPlaying(false);
      }
    } else element.pause();
  }
  return (
    <div className="hero-visual">
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet="/videos/poster-mobile.webp"
          type="image/webp"
        />
        <source srcSet="/videos/poster.webp" type="image/webp" />
        <img
          className={`hero-background hero-poster ${load && ready && !failed ? "video-ready" : ""}`}
          src="/videos/poster.jpg"
          alt=""
          width="1280"
          height="720"
          fetchPriority="high"
          onError={(event) => {
            const image = event.currentTarget;
            image.parentElement
              ?.querySelectorAll("source")
              .forEach((source) => source.removeAttribute("srcset"));
            if (!image.src.endsWith("/images/aria-exterior.webp"))
              image.src = "/images/aria-exterior.webp";
          }}
        />
      </picture>
      {load && !failed && (
        <video
          ref={video}
          className="hero-background hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/poster.jpg"
          aria-hidden="true"
          onPlaying={() => {
            setPlaying(true);
            setReady(true);
          }}
          onPause={() => setPlaying(false)}
          onError={() => {
            setFailed(true);
            setReady(false);
          }}
        >
          <source
            src="/videos/hero.webm"
            type="video/webm"
            onError={() => sourceError("webm")}
          />
          <source
            src="/videos/hero.mp4"
            type="video/mp4"
            onError={() => sourceError("mp4")}
          />
        </video>
      )}
      <div className="hero-wash" />
      {load && !failed && (
        <button
          className="video-toggle"
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause hero video" : "Play hero video"}
        >
          <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
          <span>{playing ? "Pause" : "Play"}</span>
        </button>
      )}
    </div>
  );
}
