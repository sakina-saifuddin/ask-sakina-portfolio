"use client";

import { profile } from "@/data/portfolio";
import { ChapterOne } from "@/components/ChapterOne";
import { ChapterTwo } from "@/components/ChapterTwo";
import { ChapterThree } from "@/components/ChapterThree";
import { ChapterAchievements } from "@/components/ChapterAchievements";
import { ChapterFour } from "@/components/ChapterFour";
import { ChapterFive } from "@/components/ChapterFive";
import { Typewriter } from "@/components/Typewriter";
import { HorizontalTrack } from "@/components/HorizontalTrack";

export function HorizontalIntro() {
  return (
    <HorizontalTrack>
      <section className="hz-panel hz-panel-intro" data-panel-id="intro">
        <p className="hz-statement">
          <Typewriter text="Working at the intersection of data and technology to build things that are useful, clear, and impactful." />
        </p>

        <h1 className="hz-name">
          <Typewriter text={"Sakina\nSaifuddin"} speed={75} startDelay={3000} sound />
        </h1>

        <div className="hz-bottom-row">
          <span className="hz-bottom-left">{profile.location}</span>
          <span className="hz-bottom-center">Open for early-career roles</span>
          <span className="hz-bottom-right">Scroll</span>
        </div>
      </section>

      <ChapterOne />
      <ChapterTwo />
      <ChapterThree />
      <ChapterAchievements />
      <ChapterFour />
      <ChapterFive />
    </HorizontalTrack>
  );
}
