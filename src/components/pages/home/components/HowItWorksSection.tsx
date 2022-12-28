import * as React from "react";
import { SignUpButton } from "../../../shared/SignUpButton";

export interface IHowItWorksSectionProps {}

const howItWorksConfig = [
  {
    emoji: "🤖",
    description:
      "1. We take your code snippet and send it to our super duper fancy robot simulation desktop machine.",
  },
  {
    emoji: "⚙️",
    description:
      "2. The machine opens up a Visual Studio Code instance and types out your code, just as you would.",
  },
  {
    emoji: "📹",
    description:
      "3. All the while, we record Visual Studio Code and save the output. Then we send you the link to the video!",
  },
];

export function HowItWorksSection(props: IHowItWorksSectionProps) {
  return (
    <>
      <hr className="mt-5" />
      <section>
        <span className="display-2 mb-5">✨</span>
        <h2>How it works</h2>
        <div className="container col-4">
          {howItWorksConfig.map((item, index) => {
            const flexDirection =
              index % 2 === 0 ? "flex-row-reverse" : "flex-row";
            return (
              <div
                className={`row ${flexDirection} justify-content-center align-items-center my-5`}
              >
                <div className="col-12 col-lg-6">
                  <span className="display-5 mb-3">{item.emoji}</span>
                </div>
                <div className="col-12 col-lg-6">
                  <span className="fs-5">{item.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <hr className="mt-5" />
      <section>
        <span className="display-2 mb-5">🪄</span>
        <h2>The Future of Software Content Creation</h2>
        <div className={`row justify-content-center align-items-center my-5`}>
          <div className="col-12 col-md-6">
            <span className="display-5 mb-5">🎉</span>
            <span className="fs-5">
              <b>No more</b> trying to multi task both typing and talking for
              your YouTube videos or courses!
            </span>
          </div>
        </div>
        <div className={`row justify-content-center align-items-center my-5`}>
          <div className="col-12 col-md-6">
            <span className="display-5 mb-5">🎊</span>
            <span className="fs-5">
              <b>No more</b> wasting hours on end in Shotcut or Adobe Premiere
              trying to edit down your videos!
            </span>
          </div>
        </div>
        <div className={`row justify-content-center align-items-center my-5`}>
          <div className="col-12 col-md-6">
            <span className="display-5 mb-5">🥳</span>
            <span className="fs-5">
              <b>Perfect</b> for crafting videos you want share on socials like
              TikTok, Instagram Reels, or YouTube Shorts!
            </span>
          </div>
        </div>
        <div className={`row justify-content-center align-items-center my-5`}>
          <div className="col-12 col-md-6">
            <span className="display-5 mb-5">🌟</span>
            <span className="fs-5">
              Join the new paradigm shift of creating coding videos! Sign up now
              for early access!
            </span>
          </div>
        </div>
        <SignUpButton />
      </section>
      <hr className="mt-5" />
      <section>
        <span className="display-2 mb-5">❤️</span>
        <h2>
          The Best Part?
          <br />
          ...We're Open Source!
        </h2>
        <div className={`row justify-content-center align-items-center my-5`}>
          <div className="col-12 col-md-6">
            <span className="fs-5 mb-5">
              The Docker
              container that produces the videos is open source and can be found
              on GitHub.
            </span>
            <span className="fs-5">
              <b>Because we are so awesome and caring, we've even included the Docker container so you can choose
              whether to run on premise or in the cloud.</b>
            </span>
          </div>
        </div>
        <a
          className="btn btn-primary"
          href="https://github.com/codevideo"
          target="_blank"
          rel="noreferrer"
          type="button"
        >
          Go to our GitHub
        </a>
      </section>
    </>
  );
}
