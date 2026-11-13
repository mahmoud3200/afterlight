"use client";

import { useId, useState } from "react";
import { ChevronRight } from "lucide-react";

export default function StorySources({ artifact }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-5 text-xs text-muted">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex cursor-pointer items-center gap-1 py-2"
      >
        <ChevronRight
          size={12}
          aria-hidden="true"
          className={`transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-90" : ""}`}
        />
        Sources &amp; visual credits
      </button>
      <div
        id={panelId}
        inert={!open}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-400 ease-in-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="space-y-2 px-1 pt-1 pb-2">
            {artifact.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {source.label}
                </a>
                <p>{source.claims}</p>
              </li>
            ))}
            <li>
              <a
                href={artifact.assetSource}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Visual source — {artifact.credit}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
