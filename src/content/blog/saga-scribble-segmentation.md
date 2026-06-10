---
title: "Scribbles on Gaussians: Interactive 3D Segmentation with SAGA"
description: "Dissertation, round two: building scribble-guided segmentation and 3D floater filtering on top of SAGA (Segment Any 3D Gaussians) — and learning to describe my own work precisely."
date: 2025-08-24
tags: ["Masters", "Dissertation", "3D", "Segmentation"]
draft: false
---

After [losing round one to Flash3D](/blog/dissertation-flash3d-false-start), my dissertation found its real home: **SAGA — Segment Any 3D Gaussians**. SAGA distills SAM's 2D masks into a contrastive 3D feature field over a Gaussian Splatting scene, so you can click a point in a rendered view and segment the corresponding object in 3D. Click, and the chair lifts out of the scene.

My work lived on the **interactive side**. The original GUI was 756 lines; by the end, mine was 1,572. Here's what's actually in those lines — described precisely, because I learned the hard way that precision about your own contribution matters as much as the contribution.

## Scribble-guided prompting

SAGA's interaction model was a single click: one pixel, one feature vector, one cosine-similarity query against the 3D field. Powerful, but brittle — one pixel is a noisy sample of an object's feature distribution.

I replaced it with **scribbles**. You drag a brush stroke over the object; I rasterize the polyline into a 2D mask (`cv2.polylines` plus dilation), index the rendered feature map at every covered pixel, mean-pool those features into a single prompt vector, normalize it, and query it against the scale-gated 3D Gaussian features. One noisy pixel becomes a dense region average — the prompt now describes the object, not a point on it.

Is the idea novel? No — scribble prompts are established in 2D segmentation. The contribution is the lift into 3D through the contrastive feature field, and the difference in practice is large: strokes are far more forgiving on thin structures, textured surfaces, and boundary regions where a single click routinely missed.

## Floater removal: 3D connected-component filtering

Gaussian Splatting scenes have a well-documented failure mode: **floaters** — stray Gaussians hanging in space that match your query features and contaminate the selection. This was the most algorithmically interesting part of my work.

After a query selects a set of 3D Gaussians, I build a radius/kNN graph over their centers, label connected components via DFS, and prune the small ones. Three details make it more than a textbook exercise:

- **Seed protection** — any component containing a top-fraction-by-similarity seed point is immune from pruning, so the filter can't delete the very thing you pointed at.
- **Largest-k safety net** — an over-aggressive `min_size` can never wipe the whole selection; the largest components always survive.
- **Scale-aware normalization** — point coordinates are divided by the geometric mean of each Gaussian's per-axis scaling before graph construction, so one global radius behaves sensibly across scenes with wildly different point densities. Gaussians are anisotropic and scale-variable; a filter that ignores that breaks the moment you change scenes.

Plus the small stuff: refine modes (overwrite / add / remove via boolean mask composition) for iterative selection, and unbreaking the codebase on modern PyTorch — the original used `torch.eig`, removed in PyTorch 1.9+, which I replaced with `torch.linalg.eig` and proper handling of the complex eigenvalues.

## What I did *not* do — and why I say so

I did not touch SAGA's contrastive loss, the scale-gated feature field, the splatting backbone, the SAM supervision pipeline, or the training loop. Early on I caught myself describing my work as "architectural changes to SAGA." It isn't. It's a **new prompt modality and a 3D post-processing layer on top of a frozen, pretrained SAGA**.

That reframing felt like a demotion at first. It's the opposite. Overclaiming is how you get dismantled in thirty seconds by anyone who's read the paper; precise claims are defensible all day. "I built scribble prompting and a scale-aware floater filter for an interactive 3D segmentation system" is smaller than "I changed the architecture" — and worth more, because every word of it survives scrutiny.

## What the code taught me about myself

Doubling a research GUI under deadline pressure leaves scars, and I found most of mine in review: the same component filter implemented twice down different paths (one was dead code), a fetch-and-segment method that had bloated into a ~500-line god function, a few `try/except: pass` blocks silently eating errors, and tensor-shape assumptions documented nowhere except a `[warn] N mismatch` print I'd written to console instead of fixing. Cleaning that up — extracting the duplicated filter call, decomposing the god method, writing shape-annotated docstrings — was less glamorous than the algorithm work and at least as educational.

The dissertation is submitted. A working, demoable system: scribble in a rendered view, watch the object separate from the scene in 3D, floaters filtered, selection refinable. Round one taught me to pick fights I can finish. Round two taught me to describe the win exactly.
