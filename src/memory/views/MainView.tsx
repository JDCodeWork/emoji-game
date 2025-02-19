import { JSX } from "react";

import { SoundBtn } from "../components/SoundBtn";
import { useMemoryState } from "../hooks/useMemoryState";
import { MemoryStateTypes } from "../interface/memory-store";
import {
  LostView,
  PausedView,
  PlayingView,
  StartView,
  WonView
} from "./";

const renderViews: Record<MemoryStateTypes, () => JSX.Element> = {
  playing: PlayingView,
  paused: PausedView,
  start: StartView,
  won: WonView,
  lost: LostView
}

export const MainMemoryView = () => {
  const { state } = useMemoryState()

  const RenderView = renderViews[state] || renderViews.start

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <SoundBtn />
      <RenderView />
    </main>
  )
}
