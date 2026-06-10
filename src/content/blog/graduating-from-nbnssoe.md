---
title: "Four Years Done — Graduating in Computer Engineering with Honours in AI/ML"
description: "Closing the chapter on my bachelor's at NBNSSOE, Pune University — an 8.61 CGPA, a head full of theory, and an honest accounting of what I still can't do."
date: 2024-04-20
tags: ["Life", "Education"]
draft: false
---

This month I officially finished my Bachelor of Engineering in Computer Engineering, with Honours in AI/ML, from NBN Sinhgad School of Engineering, under Savitribai Phule Pune University. Final CGPA: **8.61**. I'm proud of that number. I also want to be honest about what it does and doesn't represent.

## What the degree gave me

Pune University gets criticised a lot — every university does — but I genuinely think the breadth of the syllabus did right by me. Over four years I went through Data Structures and Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Theory of Computation, Compilers, Software Engineering, and Systems Programming. The honours track in AI/ML added Machine Learning, Deep Learning, Natural Language Processing, and Data Mining on top of that.

That's a real foundation. When I read a paper now and it mentions gradient descent, B+ trees, process scheduling, or TCP congestion control, I know what those words mean from first principles — not from a YouTube summary. SPPU's exam pattern forces you to actually write things out by hand: derive backpropagation, draw the joins, trace the automaton. It's unfashionable, but it builds a kind of muscle.

NBNSSOE itself was good to me. The AI/ML faculty took the honours batch seriously, the labs were open when we needed them, and a couple of professors went well beyond the syllabus — one of them ran an informal reading group on ML papers that probably shaped my interests more than any single course did.

## What it didn't give me

Here's the honest part: almost everything I learnt was academic. I can explain how an LSTM works on paper. I have never deployed one. I know normalization forms cold; I've never managed a production database. Four years of computer engineering and I'd barely touched version control until my final year, never written a test suite, never seen a CI pipeline.

That's not entirely the university's fault — the syllabus can only do so much, and I could have built more on my own. But it's the gap I'm staring at now, and I'd rather name it than pretend the CGPA covers it.

## The final year project — a medicine dispenser

The one place theory met practice was my final year project: an **IoT-based automatic medicine dispenser**. The idea was simple — elderly patients forget doses, so build a device that dispenses the right pills at the right time and alerts a caregiver if a dose is missed.

We built the dispenser hardware around a microcontroller with a rotating compartment mechanism, and I wrote the companion app — which is where I ended up doing some Objective-C, since I was building against the iOS notification stack. Scheduling logic, dose reminders, a missed-dose escalation that pinged the caregiver. None of it was elegant. All of it taught me more about real software than three semesters of theory: hardware that ignores your assumptions, Bluetooth that drops at the worst moment, a demo that fails the night before.

When we presented it, our supervisor was genuinely impressed — not by the polish, but by the fact that it worked end to end, live, in the room. That reaction taught me something too: finishing a real thing, however small, counts for more than describing a big thing.

## What's next

The plan now is to close the gap — take the theory I'm carrying and put it under real load. Build things, ship things, break things. The degree was the foundation. The house is still unbuilt.

8.61 was the score. The real grade comes next.
