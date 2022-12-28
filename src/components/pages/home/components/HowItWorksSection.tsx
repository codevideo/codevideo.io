import * as React from "react";
import { SignUpButton } from "../../../shared/SignUpButton";

export interface IHowItWorksSectionProps {}

const howItWorksConfig = [
  {
    emoji: "🤖",
    description:
      "1. We take your code snippet and put it on a canvas.",
  },
  {
    emoji: "⚙️",
    description:
      "2. The canvas stream is captured as your code is typed.",
  },
  {
    emoji: "📹",
    description:
      "3. The captured stream is converted to an mp4. We then send you a link to the mp4!",
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
        <h2 className="mb-5">The Future of Software Content Creation</h2>
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-6">
            <span className="display-5">🎉</span>
          </div>
        </div>
        <div className="row justify-content-center align-items-center mb-5">
          <div className="col-12 col-md-6">
            <span className="fs-5">
              <b>Eliminate</b> the need to try to type and speak simultaneously for
              your YouTube videos or courses!
            </span>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-6">
            <span className="display-5 ">🎊</span>
          </div>
        </div>
        <div className="row justify-content-center align-items-center mb-5">
          <div className="col-12 col-md-6">
            <span className="fs-5">
              <b>Stop</b> wasting hours on end in Shotcut or Adobe Premiere
              trying to chop down your videos!
            </span>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-6">
            <span className="display-5">🥳</span>
          </div>
        </div>
        <div className="row justify-content-center align-items-center mb-5">
          <div className="col-12 col-md-6">
            <span className="fs-5">
              <b>Perfect</b> for crafting videos you want share on socials like
              TikTok, Instagram Reels, or YouTube Shorts!
            </span>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-6">
            <span className="display-5">🌟</span>
          </div>
        </div>
        <div className="row justify-content-center align-items-center mb-5">
          <div className="col-12 col-md-6">
            <span className="fs-5">
              <b>Join</b> the new paradigm shift of creating coding videos! Sign up now
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
          <div className="col-6 fs-5">
            Both the backend (Docker container) and the frontend (JavaScript
            function) engines that power CodeVideo are open source and can be
            found on GitHub.
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
