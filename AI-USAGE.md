# AI Usage Log

You are expected to use AI well and prove it. At least 3 substantial entries.
At least one must be a time AI was confidently wrong and you caught it.

## AI moment 1
- What I was trying to do: I was trying to make the items under item.ts show on th web
- The prompt I wrote: I wrote " there is a typscript file that has a mockup data but that data is not retrivable under react folder. on inspect tab on browser it shows the error is under react file.where can i start checking for the mistake.
- What the AI gave back:Your AuthContext.tsx is at src/pages/context/ but it should be at src/context/. Move it up one level so the folder structure is.Here are the drop‑in replacements. Note: your file exports ITEMS (uppercase), so imports change too.
- What was wrong / weak / risky about it: under the items.ts file the was code already there and i couldnt link there data to show on the web
- What I changed and why: I had to change the code under itemDetails file to match with the item.ts

## AI moment 2
- ...

## AI moment 3 (the one where AI was wrong)
- The Ai was wrong when it was performing a self-review that I had explicitly asked for.The AI declared this behavior "defensible" without noticing that its own code had the Book button disabled on the detail page but never checked whether the same guard existed on the /book/:id route. That's the same class of bug I'd already caught for paused items a UI affordance being mistaken for a system rule and the AI had just confidently signed off on the `removed` version of it. If I'd trusted its self-review, I would have shipped a bookable withdrawn item. Self-reviews are the moment you most want the tool to be careful and it was the least careful.  I now treat AI self-audits the same way I'd treat a code review from a colleague who hadn't actually run the code.
