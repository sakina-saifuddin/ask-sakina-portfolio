import { Header } from "@/components/Header";
import { RecruiterQA } from "@/components/RecruiterQA";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { Footer } from "@/components/Footer";
import { ChapterIntro } from "@/components/chapters/ChapterIntro";
import { ChapterWork } from "@/components/chapters/ChapterWork";
import { ChapterBuild } from "@/components/chapters/ChapterBuild";
import { ChapterExperience } from "@/components/chapters/ChapterExperience";
import { ChapterExpertise } from "@/components/chapters/ChapterExpertise";
import { ChapterRecognition } from "@/components/chapters/ChapterRecognition";
import { ChapterContact } from "@/components/chapters/ChapterContact";

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <Header />
      <main>
        <ChapterIntro />
        <ChapterWork />
        <ChapterBuild />
        <ChapterExperience />
        <ChapterExpertise />

        <div className="ask-resume-lead reveal">
          <span className="chapter-eyebrow">Curious about my experience?</span>
        </div>
        <RecruiterQA />

        <ChapterRecognition />
        <ChapterContact />
      </main>
      <Footer />
    </>
  );
}
