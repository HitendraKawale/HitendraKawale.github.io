---
title: "Dissertation, Round One: Losing to Flash3D"
description: "My first dissertation direction was feed-forward 3D reconstruction with Flash3D. The pipeline won. A post about the false start nobody puts on their CV."
date: 2025-06-18
tags: ["Masters", "Dissertation", "3D"]
draft: false
---

Every dissertation has a chapter that never makes it into the dissertation. This is mine.

## The plan

For my MSc dissertation I wanted to work in 3D reconstruction — specifically around **Flash3D**, the feed-forward approach that reconstructs a 3D Gaussian scene from a single image. No per-scene optimization, just one forward pass from photo to splats. The paper is elegant, the results are impressive, and I figured I'd build on top of it: get the pipeline running, reproduce some results, then find my contribution from there.

That last sentence is doing a lot of work. "Get the pipeline running" turned out to be the whole story.

## The pipeline wins

I'll be honest about something blog posts usually aren't: I don't remember every specific failure anymore. They blur together. What I remember is the *texture* of the weeks — a long sequence of being almost there.

The dataset was the first wall. Training and evaluating these models means feeding them something like RealEstate10K-scale data — enormous collections of video frames that you don't simply download so much as *negotiate with*. Hundreds of gigabytes, fetched frame-by-frame from source videos, some of which no longer exist, through preprocessing scripts written for someone else's directory structure on someone else's cluster. My storage quota tapped out. Then my patience. Then my storage quota again.

Behind that wall were the usual suspects, in rotating order: CUDA version mismatches with the custom rasterizer, environments that built on Tuesday and not on Thursday, checkpoints expecting tensor shapes the preprocessing didn't produce, out-of-memory errors at the exact step that took forty minutes to reach. Every fix revealed the next problem, like a video game where each boss drops the key to a harder boss.

At no point was any single problem unsolvable. That's what made it dangerous — it always felt like one more evening would crack it. Weeks of one-more-evenings later, I had a mostly-working pipeline, no reproduced results, and no dissertation contribution in sight.

## Calling it

The hardest part was admitting that "I can probably get this working eventually" wasn't the question. The question was whether there'd be a dissertation's worth of *research* left after the engineering — and on my timeline, there wasn't.

So I called it. Kept the lessons, cut the direction:

1. **Reproducibility is a feature papers don't ship.** The gap between "code released" and "usable by a master's student with a deadline" can be a chasm.
2. **Estimate the data before the model.** I budgeted my excitement for the architecture and got bankrupted by the dataset.
3. **A false start isn't lost time if you fail toward something.** All that fighting with Gaussian Splatting internals — rasterizers, splat parameters, scene structure — turned out to be exactly the background I needed for what came next.

Because while digging through the Gaussian Splatting literature for Flash3D, I kept tripping over a different problem entirely — segmentation *inside* 3D Gaussian scenes. That one stuck. More on it in the next post.
