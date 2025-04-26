---
title: "Building a Virtual and Declarative IDE: How Complex is it to Create a New Folder or File in an IDE, Really?"
description: "...in this post, we’re going to find out :)"
author: Chris
date: '2025-04-16'
---

_Just a heads up here: This post is highly technical and meta in nature. It quite literally describes how I re-create the file or folder creation process in an IDE in an event-sourced and declarative manner. However, if you enjoy posts about high-level software architecture and design decisions, this post is for you!_

The new features discussed in this post are immediately available in our [CodeVideo CLI tool](https://github.com/codevideo/codevideo-cli), and will be rolled out to the [CodeVideo Studio](https://studio.codevideo.io/) shortly.

## In Short: It’s Complicated

<iframe src="https://www.youtube.com/watch?v=8ovGblSy5pk" frameborder=0></iframe>

Our latest version of the React-based CodeVideo IDE, used to create CodeVideos. Indeed, there is considerable complexity behind what one may assume at an initial glance is “just creating a new file in an IDE”.

## Breaking it Down

In an event-sourced nature, when you, as a human editor, go to create a folder or file in an interactive GUI-based IDE like Visual Studio Code, it typically involves the following steps:

 1. Go to the file explorer on the left of the IDE (or right — if you’re a barbarian) of your editor

 2. Right-click in that area

 3. Click either “Create New Folder...” or “Create New File...” that appears in the corresponding dropdown

 4. Type into the resulting auto-focused input

 5. Press enter to confirm the folder or file name

 6. In the case of a file, the file is opened up blank, but in an initially clean and saved empty state, ready for you to edit

When I originally launched CodeVideo, all I had for all these discrete actions was `file-explorer-create-file`

That meant I was missing at least 4–5 actions, not even in the CodeVideo framework at all at that time. Big oof.

This is also where I realized I might as well implement a variety of context menus — one for right-clicking anywhere in the file explorer, one for right-clicking. There is still much more to do here, such as options when right-clicking in the editor, terminal, and so on. Even for the existing implementation, it’s the true “bare bones” strongly opinionated version of what I think any creator would need at minimum to make a coherent software course.

In full technical summary, creating a hello-world.txt file in a CodeVideo JSON used to look like this:

```json
[
    {
        "name": "file-explorer-create-file",
        "value": "hello-world.txt"
    }
]
```

It now looks like this:

```json
[
    {
        "name": "mouse-move-file-explorer",
        "value": "1",
    },
    {
        "name": "mouse-right-click",
        "value": "1",
    },
    {
        "name": "mouse-move-file-explorer-context-menu-new-file",
        "value": "1",
    },
    {
        "name": "mouse-left-click",
        "value": "1",
    },
    {
        "name": "file-explorer-type-new-file-input",
        "value": "hello-world.txt",
    },
    {
        "name": "file-explorer-enter-new-file-input",
        "value": "1",
    }
]
```

But we can go even further — above is what the standard “create a file with mouse” flow would look like. We also can make a file using the terminal, which should look like this:

```json
[
    {
        "name": "mouse-move-terminal",
        "value": "1",
    },
    {
        "name": "mouse-left-click",
        "value": "1",
    },
    {
        "name": "terminal-type",
        "value": "touch hello-world.txt",
    },
    {
        "name": "terminal-enter",
        "value": "1",
    }
]
```

Even then — it’s not the same behavior as creating through the file explorer — this flow will just create the file and you’ll see it in the file explorer. You’d have to `mouse-move-file-explorer-file` to hello-world.txt and `mouse-left-click` to actually open the file! Sheesh, all just to open a measly file... but hey, while I probably said it’s a lot of fun, I didn’t say any of this was very easy.

## Some Good News

The good news is that this next level of the domain expansion helped me refine things heavily in the `virtual-mouse` and `virtual-file-explorer` domains. Until now, I didn’t even *have* a mouse-move action for any of the given IDE locations: `mouse-move-file-explorer`, `mouse-move-file-explorer-file-name`, mouse-move-file-explorer-folder-name, and so on! Heck, I didn’t even have the [`@fullstackcraft/codevideo-virtual-mouse` implementation](https://github.com/codevideo/codevideo-virtual-mouse) when starting this context menu insanity!

While this definitely complicates things for the user side, (but can be abstracted away with composite actions — which I’ll touch on in a bit), this heavily improves things on the UI side — as a developer working with these event names, I know exactly what is happening and where. When was previously just `file-explorer-create-file` - there were many logical, and thus visual jumps that would occur (mouse move to file name, file name appears, etc.), Now, we have very atomic actions that are easy to reproduce visually. In a way, while the user-facing side of things becomes more verbose, actually debugging any issues becomes much simpler - the actions are so atomic you can easily trace which one is the potential troublemaker.

## Introducing Composite Actions!

It’s now time to share an idea I’ve finally solidified: composite actions. The general idea behind a composite action is that you, as a user in the [CodeVideo Studio](https://studio.codevideo.io/) would select a “composite” action, which still has the standard name and value shape, like the simple ones above, i.e. `file-explorer-create-file`, however, you could have multiple options for this, such as `composite-file-explorer-create-file-with-mouse`, or `composite-file-explorer-create-file-with-terminal`. In the background, these composite actions would facilitate the actual atomic actions necessary for the proper state and UI changes that the CodeVideo framework guarantees.

To create composite actions, we can use generator functions to generate the steps needed. I’m still debating how to show these composite actions in the CodeVideo Studio; perhaps as a subset list of actions that are read-only, and only shown when you have a composite action chosen. [The initial draft generator functions are currently a part of the ](https://github.com/codevideo/codevideo-types/tree/main/src/generators) `@fullstackcraftllc/codevideo-types` library, written initially there to ensure future type safety. These will likely become their own repository, as I’ve brainstormed a variety of other composite actions where we can use the virtual state layer itself to generate them (Want to close all tabs? easy. Collapse all open folders? also easy. Open multiple terminals? also easy). Anyway, this is another post for another time ;)

## ...Atomic Actions?

We could go even further as well, for example, going the *opposite* direction, to *expand* actions, for example, expanding typing actions to truly single keystrokes, i.e.:

```json
[
    {
        "name": "editor-type",
        "value": "console.log('hello, world!');"
    }
]
```

becomes in a truly atomic fashion:

```json
[
    { "name": "editor-type", "value": "c" },
    { "name": "editor-type", "value": "o" },
    { "name": "editor-type", "value": "n" },
    { "name": "editor-type", "value": "s" },
    { "name": "editor-type", "value": "o" },
    { "name": "editor-type", "value": "l" },
    { "name": "editor-type", "value": "e" },
    { "name": "editor-type", "value": "." },
    { "name": "editor-type", "value": "l" },
    { "name": "editor-type", "value": "o" },
    { "name": "editor-type", "value": "g" },
    { "name": "editor-type", "value": "(" },
    { "name": "editor-type", "value": "'" },
    { "name": "editor-type", "value": "h" },
    { "name": "editor-type", "value": "e" },
    { "name": "editor-type", "value": "l" },
    { "name": "editor-type", "value": "l" },
    { "name": "editor-type", "value": "o" },
    { "name": "editor-type", "value": "," },
    { "name": "editor-type", "value": " " },
    { "name": "editor-type", "value": "w" },
    { "name": "editor-type", "value": "o" },
    { "name": "editor-type", "value": "r" },
    { "name": "editor-type", "value": "l" },
    { "name": "editor-type", "value": "d" },
    { "name": "editor-type", "value": "!" },
    { "name": "editor-type", "value": "'" },
    { "name": "editor-type", "value": ")" },
    { "name": "editor-type", "value": ";" }
]
```

though sometimes that feels a bit *too* overboard. We’ll see — for a series of PNGs, or GIF export for example, these atomic actions are in fact the *optimal* choice of action discretization. Not so much for portability or readability, however!

So, I think I’ll keep this post at that for now. Let me know if you’d like more or less technicality in following posts!

Until the next one!

-Chris
