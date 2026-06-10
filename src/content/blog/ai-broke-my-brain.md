---
title: "AI Broke My Hands: A Confession About Vibe Coding"
description: "Two years of AI-assisted everything has quietly dismantled my ability to solve problems unassisted and type code from scratch. An honest audit of the damage."
date: 2026-06-10
tags: ["AI", "Confession", "Craft"]
draft: false
---

I want to write this down while the embarrassment is fresh, because embarrassment fades and then nothing changes.

Last week I opened an empty Python file to write something trivial — a script to walk a directory and rename some files. No framework, no ambiguity, the kind of thing 2022-me would have typed in four minutes with the radio on. I sat there. My fingers genuinely did not know how to begin. Was it `os.walk` or `os.listdir`? Does `argparse` take `add_argument` or `add_option`? I knew the *shape* of the answer — I could see the finished script in my head like a photograph — but the path from empty file to that photograph, the path I used to walk automatically, was gone. My actual reflex, observed honestly: open a chat window and describe the script.

That reflex is the confession. Somewhere in the last two years of AI-assisted everything, **I stopped being someone who writes code and became someone who requests code.**

## The damage, audited honestly

**Syntax has left my hands.** Not my eyes — I read code fine, I review fine, I can tell good from bad. But producing it cold, from a blank buffer, no autocomplete, no model? Dict comprehension syntax, the exact incantation of a context manager, matplotlib's seventeen ways to do anything — all of it has moved from "in my fingers" to "one prompt away." Reading fluency without writing fluency. I've become *literate but mute*.

**My problem-solving stamina has collapsed.** This is the scarier one. The old loop was: read the traceback, form a hypothesis, test it, be wrong, form a better one. That loop *built* something in me, and the building only happened during the struggle. The new loop is: paste the traceback into a chat before I've even finished reading it. The model is usually right, the bug is usually fixed, and I am usually none the wiser. I've outsourced exactly the part that made me better — I kept the answers and gave away the thinking.

**Blank-page paralysis.** Architecture still works — I can decompose a system, design the pipeline, see the components. But the bottom layer, where decomposition becomes actual typed lines? There's a flinch there now, a learned helplessness: *why would I type this when I could describe it?* The honest answer — *because typing it is what keeps me able to* — never wins in the moment.

I felt this during the dissertation, and I [wrote about the wreckage](/blog/saga-scribble-segmentation): duplicated dead code, a 500-line god method, silent `except: pass` blocks. I cleaned it up and learned from the cleanup. What I didn't say in that post is that the mess wasn't a deadline accident. It was the natural output of a workflow where I steered and something else drove.

## The uncomfortable nuance

Here's what makes this hard to think about clearly: **the assisted me ships more.** This site, the dissertation tooling, every recent project — built faster and arguably better than unassisted-me could have managed. AI assistance is not fake productivity; the output is real and I'm not giving it up. Anyone who tells you to code like it's 2019 is selling nostalgia.

But there's a difference between a tool that *amplifies* a capability and a tool that *replaces* it — and the difference shows up exactly when the tool isn't there. Whiteboard interviews. A live debugging session over someone's shoulder. Reasoning about a system at 2 AM when the question isn't "what's the fix" but "what's actually happening." The skill I'm losing is the one I'm interviewing to prove I have.

## The rehab plan

Naming the problem publicly is step one. The rest, starting today:

1. **No-AI hours.** Blocks where the chat window does not open. Small scripts, typed cold, errors read to the end before any help is summoned.
2. **The struggle has a timer.** Twenty minutes with the problem before the model gets a turn. Most of the value of struggling lives in the first twenty minutes anyway.
3. **Retype, don't paste.** When the model writes something worth keeping, I retype it by hand. Slower, deliberately. Hands remember what clipboards don't.
4. **LeetCode-style problems, raw.** Not because grinding is enlightenment, but because it's strength training for exactly the muscle that atrophied: blank page, working solution, no spotter.
5. **Keep the AI for what it's genuinely better at** — review, exploration, rubber-ducking, the boilerplate I've already proven I can write.

The goal isn't purity. It's to get back to being someone who *chooses* to delegate, instead of someone who has no other option. There's a version of this post in a year that reports back. I intend to be embarrassed by how dramatic this one sounds.
