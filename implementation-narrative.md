# Implementation narrative

## What we built and why

We know that Relying Parties often underestimate what it takes to integrate with GOV.UK One Login — the people they need to involve, the decisions they need to make early, and the lead times on things like the Memorandum of Understanding. That lack of visibility leads to delays, missed dependencies, and the onboarding team having to repeatedly chase RPs.

This branch introduces a new section of the product pages: a simple, structured guide to the integration journey.

## What's new

The centrepiece is a new "Integrate with GOV.UK One Login" overview page at `/onboarding-journey`. It presents the journey as four numbered stages in a visual timeline — numbered circles connected by a vertical line — so RPs can immediately see the shape of the process before they've read a word.

Each stage links through to its own detail page:

- **Stage 1 — Plan your integration** covers the decisions to make before building: whether you need authentication, identity checking, or both; who to involve (service owner, tech lead, security, user support, comms); and design decisions like whether users sign in upfront or partway through.

- **Stage 2 — Build your integration** walks through getting access, building to the technical docs, and what to test — including mobile, assistive tech, and the user support process.

- **Stage 3 — Request to go live** is where the timeline warnings live. There's an inset telling RPs to start this stage at least 4 weeks before their planned go-live, and a prominent warning that the Memorandum of Understanding alone takes at least 25 business days to get signed. This is the information that's historically been missing — RPs find out about these lead times too late.

- **Stage 4 — Manage your live service** covers monitoring, staying up to date with changes, and supporting users once live.

Each detail page has previous/next navigation so RPs can read through the whole journey in sequence.

## How it connects to the rest of the site

The new section is wired into the side navigation under the documentation area, with the four stages appearing as child items beneath the overview. Two other pages were updated to link into it: the homepage now has a "See how to integrate your service" link in the integration panel, and the Getting Started page has a new link at the top pointing RPs to the journey overview before they register their interest.

The Getting Started page also got a small but meaningful addition: an inset text clarifying that the admin account is separate from a user's GOV.UK One Login — something that's caused confusion before.

## The CSS

The timeline component is built with a small amount of custom SCSS — a vertical line drawn with a pseudo-element, numbered blue circles as markers, and flexbox layout for the content alongside each marker. It uses GOV.UK Frontend's spacing and colour tokens throughout, so it sits naturally within the existing design system.
