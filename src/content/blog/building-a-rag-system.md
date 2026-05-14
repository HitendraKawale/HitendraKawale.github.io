---
title: "Building a RAG System From Scratch: What I Actually Learned"
description: "Most RAG tutorials stop at the happy path. Here's what breaks in production and what I'd do differently."
date: 2025-04-10
tags: ["RAG", "LLM", "FastAPI", "Qdrant"]
draft: false
---

Building a retrieval-augmented generation system is deceptively simple on the surface. Embed some documents, store them in a vector database, retrieve the top-k chunks, shove them into a prompt. Done, right?

Not quite.

## The chunking problem nobody warns you about

The first thing I got wrong was chunking. I split documents naively by token count — 512 tokens, fixed windows, sliding overlap. The retrieval scores looked fine. The outputs were garbage.

The problem: semantic units don't respect token boundaries. A 512-token window that cuts a paragraph in half doesn't just lose information — it actively creates misleading fragments that score high but produce wrong answers.

What actually worked: splitting by natural document structure (headings, paragraphs, code blocks) and then re-chunking large units. It takes more work but retrieval quality jumps significantly.

## The embedding model matters more than the vector database

I spent a lot of time optimizing my Qdrant configuration early on. Collection settings, HNSW parameters, quantization strategies. Useful, but I was optimizing the wrong thing.

Switching from a generic embedding model to one fine-tuned for technical content — without changing anything else — improved retrieval accuracy far more than any infra tuning.

The database is a solved problem. The embedding model is not.

## Evaluation is the hardest part

Knowing whether your RAG system is good is harder than building it. "The answers feel right" is not a metric.

I built a lightweight eval pipeline: a set of question-answer pairs, automated scoring via another LLM call, and a dashboard to track scores across changes. It added a week of work upfront and saved me from several regressions that I would have shipped otherwise.

## What I'd do differently

If I were starting again, I'd invest in the evaluation harness before touching retrieval. Every other decision becomes clearer once you have something that tells you if you're getting better or worse.

The infrastructure is the easy part. The hard part is knowing what "correct" means for your specific use case.
