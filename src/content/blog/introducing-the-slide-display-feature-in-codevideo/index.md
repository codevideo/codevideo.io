---
title: Introducing the Slide Display Feature in CodeVideo!
description: Even in software courses, sometimes slides are the best way to learn!
author: Chris
date: '2025-04-26'
---

![A GIF of our slide feature at work.](https://cdn-images-1.medium.com/max/3840/1*rJ7g19Hn4aj6gaYrkD05Cw.gif)

Check out the demo video on YouTube:

<iframe src="https://youtu.be/1duE604MGHs" frameborder=0></iframe>

## Slides, Slides, Everywhere There’s Slides

For every software course I’ve ever taught, I’ve always at one point in the course used slides to convey ideas and concepts. Clean, minimalist slides are sometimes a better choice for learning than always working directly with complex and cluttered code in the IDE. To this end, we’ve just added yet another new feature to the CodeVideo ecosystem: the ability to show slides!

## Using the Slide Display Feature in CodeVideo

To make use of the slide display, the process is straightforward: you provide an action with name slide-display and set the action’s value to whatever content you would like to display in your slide in markdown format, for example:

<pre>
{
    "name": "slide-display",
    "value": "# This is a slide!## And this is a subheading
- This is a bullet point
- This is another bullet point
- This is a third bullet point
And this is some text below the bullet points.
```typescript
export interface MyInterface {
    name: string;
    age: number;
}
```
And that ^ is a TypeScript code block! 
We can also render `inline code` and emojis 😎."
}
</pre>

The CodeVideo IDE is configured to stay on that slide until either a new slide-display action is encountered, or any non-author action. (That means you can keep as many speaking steps over your slides as needed!)

The slide display feature is available immediately via the [CodeVideo CLI tool](https://github.com/codevideo/codevideo-cli). We’re fixing up a few bugs on the [Studio](https://github.com/codevideo/studio.codevideo.io) and [API](https://github.com/codevideo/codevideo-api), but it will also be available there in a few days.

## ...Styling? Of Course!

This feature was heavily inspired by [Scrimba](https://scrimba.com/home), which also has the ability to show slides during a course as needed instead of source code. On Scrimba, these slides aren’t just simple black and white text, but typically have some sort of theming to them. We’ve allowed a variety of styling properties on the SlideDisplay component:

```tsx
<SlideDisplay
    value={markdownString}
    hljsTheme="monokai"
    fontSize="1.25rem"
    fontFamily="'Segoe UI', sans-serif"
    color="#2c3e50"
    backgroundColor="#ecf0f1"
    backgroundImage="https://.../bg.jpg"
    padding="3rem"
    maxWidth="900px"
/>
```

Currently, we’re working on updating both the API and CLI to expose the vast variety of options that the CodeVideo IDE has to offer — another post for another time!

## Thanks!

As always, thanks for reading — we can’t wait to see what you create with CodeVideo Studio!

-Chris
