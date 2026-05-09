# User Interviews

To validate the deterministic engine rules, we conducted informal interviews with startup operators.

## Interview 1: "The Redundant Engineer"
**Role:** CTO  
**Stage:** Series A (40 employees)  

**Quote:** *"Honestly, I just expense whatever the devs ask for. Half of them asked for Copilot last year, and then this year the other half said Cursor was better so we bought that. I didn't realize they were paying for both."*

**Surprising Insight:** CTOs aren't actively monitoring AI spend at the seat level. It's often handled via decentralized corporate cards.
**Product Change:** Added the explicit "Overlapping Coding Assistants" rule to the deterministic engine to flag this exact scenario.

## Interview 2: "The Security Blanket"
**Role:** Founder/CEO  
**Stage:** Seed (5 employees)  

**Quote:** *"We use ChatGPT Enterprise because we need to make sure our proprietary code isn't training their models. It's expensive, but we can't risk it."*

**Surprising Insight:** Early-stage founders don't realize the ChatGPT "Team" plan ($30/mo) offers the exact same data privacy guarantees as the "Enterprise" plan.
**Product Change:** Created a rule: If `Plan == Enterprise` AND `Seats < 50`, recommend `Team` and explicitly mention in the reasoning that the data privacy guarantees are identical.
