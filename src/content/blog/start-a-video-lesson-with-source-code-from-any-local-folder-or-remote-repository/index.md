---
title: Start a Video Lesson with Source Code from Any Local Folder or Remote Repository!
description: With CodeVideo, you can now make tutorials that explore existing codebases, or that start from a previous lesson, or any point in time!
author: Chris
date: '2025-06-26'
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/7DK40-9KqEA?si=C_FL4iaWP4SAod7P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Tutorial Modes: Building From Scratch vs. Modifying or Exploring an Existing Project

Until now, CodeVideo was optimized for the sort of “start from scratch” type of software courses where an educator starts from a completely blank canvas: no folders, files, or even editors open, and goes through every single step to get to the final product. Typically, these courses include all the tooling you would need, repository setup, and so on.

However, with CodeVideo’s Course → Lesson → Action architecture, there is an obvious need to be able to start a lesson or tutorial with a given initial project — or at least a project with a certain snapshot in time. This opens the possibility to then make tutorials that could be simply exploratory — describing areas of a codebase step by step, or tutorials that start off from a previous lesson.

In CodeVideo, it’s now possible to start your interactive lesson with the code state from any of the following sources:

 1. A local folder on your file system

 2. Any GitHub repository (at commit HEAD is the default, but any commit is possible)

 3. A previous lesson (if this isn’t exactly clear, there is more on this below)

For the first two points, this opens the possibility to create software videos that start from any codebase from any given point in time.

For the third point, this allows you to kick off a lesson exactly with the same state as you left off in the previous lesson — a software course creator’s dream!

## Formal Validation of a Software Course

In our [whitepaper](https://studio.codevideo.io/pdf/CodeVideo_Framework_White_Paper.pdf), we describe that a software course is nothing more than a series of lessons, where each lesson is made up of a series of actions. In summary, we can define that each lesson has:

 1. an initial snapshot, which is either completely empty or based on a previous lesson / point in time from any codebase or other lesson

 2. a final snapshot, which is the initial snapshot plus all actions applied in the lesson

We can take it a bit further and then state that for a software course to be formally continuous, the initial snapshot of any non-initial lesson should be that of the previous lesson. In other words, the initial snapshot of lesson 2 should be identical to the final snapshot of lesson 1, the initial snapshot of lesson 3 should be identical to the final snapshot of lesson 2, and so on.

## What’s Next? Static Code Analysis!

Unfortunately, even with these snapshot comparisons, we’re not completely done — it’s also of essential importance that the code changes you are making in your course be statically correct and actually runnable! (After all, what’s the point of creating software courses that don’t actually produce running code? Yes, looking at you LLMs 😄). I’ve started some simple drafts and ideas, most notably our [dynamic AST library](https://github.com/codevideo/codevideo-dynamic-ast), which just takes an array of file paths and their content, detects the type of project, and then runs a compiler against their contents. Very interesting idea (in my opinion) but still much work would need to be done here to get it production-ready.

Until next time,

Chris
