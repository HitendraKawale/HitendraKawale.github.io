---
title: "Why I Built My Own LLM Evaluation Platform"
description: "Existing tools didn't fit how I actually work. So I built the infra myself and learned a lot about what LLM evaluation really requires."
date: 2025-05-02
tags: ["LLM", "Evaluation", "FastAPI", "PostgreSQL"]
draft: false
---

I spent three months trying to use existing LLM evaluation frameworks before I gave up and built my own. This is not a hot take — some of those frameworks are excellent for their intended use cases. But my use case didn't fit.

## What I needed

My workflow involves running the same prompt against multiple models, comparing outputs, tweaking the prompt, and running again. I wanted to persist everything — every run, every output, every score — so I could look back and understand why a model regressed two weeks later.

I also wanted to work locally. Most evaluation tooling is cloud-first or assumes you're hitting the OpenAI API. I'm usually running Ollama locally with models that don't have public APIs.

## What I built

The platform has four layers:

**Config management.** Models, their endpoints, their parameters. You define a model once and reference it by ID everywhere else.

**Dataset management.** Prompt templates, input variables, expected outputs. You can create a dataset once and reuse it across evaluation runs.

**Run engine.** Takes a model config and a dataset, fires requests, stores every raw response to PostgreSQL, computes scoring.

**Comparison view.** Given two run IDs, show me the differences. Which prompts got better, which got worse, by how much.

## The database was the right call

I was tempted to use files — JSONL exports, CSV outputs. Simpler to start. But once you're running evaluations regularly, you want to query across runs, filter by score, join against model configs. SQL is the right tool for this.

SQLAlchemy with Alembic for migrations meant the schema could evolve without me losing historical data.

## What I'd still add

Better async handling for large batches — right now I'm running requests sequentially, which is fine for tens of prompts but slow for hundreds. And a proper diff view for long-form text outputs, which is currently just a string comparison.

The core insight from building this: evaluation is a product problem, not just an engineering one. What matters isn't coverage — it's whether the scores you're computing actually reflect the thing you care about.
