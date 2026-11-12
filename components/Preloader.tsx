"use client";

import { useEffect, useState } from "react";

/** Full-screen loader that fades out once the page has finished loading. */
export default function Preloader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const finish = () => {
      setLoaded(true);
      document.body.classList.add("loaded");
    };

    if (document.readyState === "complete") {
      finish();
      return;
    }

    window.addEventListener("load", finish);
    return () => window.removeEventListener("load", finish);
  }, []);

  return (
    <div className={`preload${loaded ? " loaded" : ""}`} aria-hidden="true">
      <div className="circle" />
      <p className="text">Dawat</p>
    </div>
  );
}
