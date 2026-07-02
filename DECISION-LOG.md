# Decision Log

At least 8 real entries. Generic entries score nothing. Use this shape:

## Decision:(1) [what you decided]
- Context: Plain CSS with a small token set, no Tailwind or component library
- Options I considered: Plain CSS in a single styles.css with CSS custom properties as design tokens.
Tailwind,fast to write, huge utility surface.
- What I chose and why: I chose Plain CSS with named tokens (--paper, --ink, --stamp, --rule) lets the design vocabulary come from the subject matter (paper, ink, rubber stamps, ruled lines) instead of from Tailwind's
- What I gave up: : Speed on future features adding a new page means writing CSS by hand instead of composing utility classes.

---

## Decision: (2)
- Context:The catalog-card aesthetic wants a "call number" (LDG-001) on every card and detail slip.
- Options I considered: Add callNumber as a field on Item and populate it in the mock data.
erive it deterministically from id in a callNumberFor(id) utility.
Generate it randomly at render time.
- What I chose and why: The mock data represents "what a real API would return," and a real API almost certainly wouldn't return a display-only string that's a function of the id — it'd return the id and let the client format it
- What I gave up: The founder can't override the call number for a specific item (say, to match a legacy catalog).

## Decision: (3)
- Context:Home has a search bar, a filter drawer, and a grid of cards. Standard responsive question.
- Options I considered: Filters inline above the grid at every breakpoint.
Sticky filter sidebar on desktop, collapses to a top-of-page accordion on mobile.

- What I chose and why: I choose the sticky filter.The drawer sits to the right of the grid on desktop and stacks below on narrow screens. With only three filters the drawer is small enough to fit on-screen without hiding and the aesthetic depends on the drawer being visible. 

- What I gave up:  Vertical space on mobile. the filter drawer pushes results further down the page than a "Filters" button would.

## Decision: (4)
- Context: Booking requires auth. I could disable/hide the Book button when logged out or let unauth users click it and get bounced.
- Options I considered: Hide or disable the Book button when there's no user.
Let the Book button navigate to /book/:id regardless and guard the route with a RequireAuth wrapper that redirects to /login with a return path.

- What I chose and why: I chose the second option becouse Auth is a route-level concern, not a component-level one if I add three more auth-gated pages later, I want a single RequireAuth to handle them, not three buttons each doing their own check. 

- What I gave up: 

## Decision: (5)
- Context:
- Options I considered:

- What I chose and why:

- What I gave up: 

## Decision: (6)
- Context:
- Options I considered:

- What I chose and why:

- What I gave up: 

## Decision: (7)
- Context:
- Options I considered:

- What I chose and why:

- What I gave up: 

## Decision: (8)
- Context:Home has a search bar, a filter drawer, and a grid of cards. Standard responsive question.
- Options I considered:

- What I chose and why:

- What I gave up: 

## Decision: (3)
- Context:Home has a search bar, a filter drawer, and a grid of cards. Standard responsive question.
- Options I considered:

- What I chose and why:

- What I gave up: 

## Decision: (3)
- Context:Home has a search bar, a filter drawer, and a grid of cards. Standard responsive question.
- Options I considered:

- What I chose and why:

- What I gave up: 

## Decision: (3)
- Context:Home has a search bar, a filter drawer, and a grid of cards. Standard responsive question.
- Options I considered:

- What I chose and why:

- What I gave up: 