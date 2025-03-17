---
title: Why Declarative Video Will Always Beat Generative Video
description: Creating crisp, professional videos with pixel-perfect control using cutting-edge tools like CodeVideo and Fframes
author: Chris
date: '2025-03-17'
---

![Halfway through an introduction to the Singleton pattern in a CodeVideo lesson.](https://cdn-images-1.medium.com/max/4436/1*IZXcTCAR3Hrsy_QbtTM3dw.png)

## It's All Video

Video-based content and apps are everywhere in 2025. TikTok almost goes without saying — so popular that it triggered an identity crisis on other social media apps, causing the launch of equivalent video-related posting on Instagram (via Reels), YouTube (via Shorts), and many more. On these platforms, engaging and high-quality video is essential to being competitive.

Furthermore, in the software education market, which CodeVideo is focusing on, the market continues to grow — more and more people are trying to learn to code. AI can only help so much, especially when it can only answer questions — questions that you may not even know to ask if you are just getting started learning to code. At some point, you need the experience, wisdom, and empathy of a real human teacher — and CodeVideo as a declarative platform provides exactly that.

## But… Creating Quality Video Content is Still Extremely Difficult?

So with all this video flying around the internet, how come we don’t have any high level, easy to use declarative video generation methods? This stuff should be easy, right? We’ve got multi-billion parameter LLMs! We’ve gone to the moon! We can do anything, right?! Wrong. Declarative video generation is an extremely challenging and open-ended problem and much more complex than it appears on the surface. It’s also way more challenging than throwing a bunch of video at a machine learning model and training it for a few days — generative AI maximalists will claim that generative video “can only get better”, but I’d challenge any ML-based video generation tool to generate a video as clean as this:

<iframe width="560" height="315" src="https://www.youtube.com/embed/xZ6EMfPJUho?si=PeHctYalnGNCxrOW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

or as clean as this 4K example:

<iframe width="560" height="315" src="https://www.youtube.com/embed/OGuR-drRWfo?si=KMShROECHdZmMORr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

In short, I want to make my point very clear: you’ll **never** get 4K video this clean using any generative method, regardless of future improvements in machine learning models. Video **needs** to be declaratively generated to be this crisp & clean.

## Declarative vs. Generative Video

There’s a big issue in the market. Compare these two paradigms for creating video:

### Declarative Video

Declarative video creation methods use explicit commands to assemble, edit, and transform pre-existing video footage

* **General Workflow**: Combines, cuts, transitions, and applies effects to existing video assets

* **Level of Control**: Highly precise control over exactly what appears in each frame

* **Examples**: Traditional video editing software (Adobe Premiere, Final Cut Pro), motion graphics tools (After Effects)

### Generative Video

Generative video creation methods use AI models to synthesize entirely new video content from text descriptions, images, or other inputs

* **General Workflow**: Describe what you want to see, and the system creates it

* **Level of Control**: Higher-level, conceptual control through prompts and parameters

* **Examples**: Runway Gen-3, Pika Labs, Sora, Stable Video Diffusion, and many, many more on the generative AI hype train

Do you see the problem here? (There are many, but I’ll point out the major one). Notice the **declarative** side of the comparison still has “traditional video editing software”, i.e. human-in-the-loop. In other words, **very labor-intensive and time-consuming**. And sure, there are other “declarative” frameworks like Motion Canvas and Remotion, but if you choose to use these frameworks, do you really want to figure out what an interpolate call is, and / or hire a developer just to start building a video system? Probably not. The number of tools that have both a high-level interface *and* are declarative video generation systems are extremely limited.

## New Paradigm: *Automated* Video Generation

With CodeVideo, there is now a brand new video editing paradigm: ***automated *video generation**. With tools like CodeVideo and Fframes, you define (as high level or as fine-grained as you’d like) exactly how your video should look, in a step-by-step fashion, even down to details like the mouse location! This is declarative paradigm at its finest: you know exactly what you are going to get in your final product.

## It’s Just Math…

This claim that declarative video is better than generative isn’t just my claim as some wacky one-off crazy solo dev. My argument is based on simple math. The arrangement space of a single frame in a 4K video is 3840 by 2160 pixels, for a total of 8,294,400 pixels. And, at least in 2025, each pixel can have 1 of 16 million (256³) colors. This leads to a total possible number of 1.26*10¹⁴ possible 4K frames that one can create. Even with just a single frame, attempting to generate exactly what you want at every single pixel with a generative method is frankly a laughable thought experiment.

(For the benefit of the doubt, even a 1080p video is in the same space: 1920 by 1080 pixels, a total of 2,073,600 pixels, with 16 million+ colors at each leads to a similar size, though granted one order of magnitude less, at 3.47*10¹⁴)

But I don’t know, maybe I am just a clueless arrogant dev — if you know a generative framework that can control all 8 million pixels for each frame, let me know! I’ll happily use that library instead!

## Generative Video is Also Complex — But a Manageable Complexity

This is not to say declarative video *isn’t* complex; think of how complex a single 2D graphic, like an SVG, can be (which [fframes](https://fframes.studio/) uses to create video). With some of the [SVGs I’ve created for my prints](https://portfolio.chrisfrew.in/), you can get into the direction of *gigabytes* in size, just for a single image! For a minute-long 4K video at 60 FPS, we’re already talking about moving potentially 3+ terabytes around to get the video!

But technicalities aside, the sales pitch is from the time savings: that super crisp 4K video example above? It took me about 2 minutes to build using [CodeVideo Studio](https://studio.codevideo.io).

## Create Your First Automated Video Today

In the [CodeVideo Studio](https://studio.codevideo.io), you can sign up today and get 50 free tokens — enough for generating 5 videos, 25 HTML exports, 16 PDF exports, and many others. Or star our various [GitHub repositories](https://github.com/codevideo) and self-host your own CodeVideo services.

## Thanks

As always, thanks for stopping by, and I hope you enjoy the Studio and the framework.

-Chris
