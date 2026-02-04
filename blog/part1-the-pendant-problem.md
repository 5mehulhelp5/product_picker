# Part 1: The Pendant Problem

*A Valentine's Day shopping crisis, 237 browser tabs, and one very nerdy solution*

---

## The Setup

February 2nd. Valentine's Day in 12 days. I'm sitting here with 237 pendant options saved across browser tabs, Pinterest boards, and random screenshot folders.

My girlfriend mentioned wanting a pendant once. Months ago. Casually. And now I've got rose gold teardrops and minimalist geometric things and vintage cameos and modern sculptural pieces all blurring together. They're all... nice? Some are really nice. But which one is *the one*?

I have no idea.

---

## The Solution

Long story short: I built a thing. A little tool that shows me two pendants at a time, asks "which one?", and figures out my preferences from there.

![The Pendant Picker comparison interface](/screenshots/comparison_interface.png)
*The Pendant Picker. Two images, one click. Repeat until it knows what you like.*

47 comparisons. That's all it took. Less than 5 minutes, and I had a clear winner.

Here's how it works—and honestly, the math behind it is kind of beautiful.

---

## Why Rating Things Sucks

My first instinct was a spreadsheet. Rate everything 1-5, sort by score, done.

I made it through about 30 pendants before this fell apart.

"Is this a 4 or a 5?" I'm staring at some rose gold teardrop thing. It's nice. Really nice. But is it *five-star* nice? What even is a 5? That geometric one I rated 5 earlier looks nothing like this—are they really equals?

Here's the thing about rating stuff on an absolute scale: our brains are terrible at it. What feels like a 4 at 10am feels like a 3 at 2pm after you've seen 50 more options. The scale drifts. You get tired. By pendant #50, everything's getting 3s and 4s because you just don't care anymore.

There had to be a better way.

---

## The Pairwise Trick

Turns out psychologists figured this out ages ago.[^1]

Ask someone "Rate this pendant 1-5" and watch them squirm. Ask them "Which of these two do you like better?" and you'll get an answer in a second.

Comparisons are just... easier. You don't need some internal calibration. You don't need to remember what a "4" means. You just look at two things and pick one.

> ❌ *"Rate this pendant 1-5"* — requires mental calibration, drifts over time, exhausting
>
> ✅ *"A or B?"* — instant, no calibration, doesn't wear you out

This is why taste tests work. This is why chess uses Elo ratings. Pairwise comparisons squeeze a lot of information out of very little effort.[^2]

But there's a problem.

---

## Too Many Pairs

237 pendants means:

$$\binom{237}{2} = \frac{237 \times 236}{2} = 27{,}966 \text{ possible pairs}$$

Almost 28,000 comparisons. At 5 seconds each, that's 39 hours. Valentine's Day would come and go.

Obviously I'm not comparing every pair. If A beats B and B beats C, A probably beats C. But how do I decide *which* pairs to compare?

Random? Wastes time on obvious matchups.

Round-robin? Still too slow, and why keep comparing things I'm already confident about?

I needed something smarter:

1. Learn a ranking from *few* comparisons
2. Pick which pairs to show next (not random, not exhaustive)
3. Know when to stop

---

## The Algorithm

Of course someone's solved this before. Turns out: several people, actually.

The tool I built mashes together two ideas:

1. **TrueSkill**[^3] — Microsoft built this to match Xbox players. Each item gets a "skill" rating plus an uncertainty measure. After each match, both get updated. Works just as well for pendants as for Halo players.

2. **Active Learning**[^4] — Instead of picking pairs randomly, pick the ones that will teach you the most. Information theory meets decision making.

Put them together and you get something that actually works. Show me two pendants, I pick one, repeat. After 47 comparisons—that's 0.2% of all possible pairs—the top 3 were clear and the ranking had stabilized.

---

## Want to Try It?

This works for anything, not just pendants. Apartments, vacation photos, design mockups, restaurant options, baby names—anything you can screenshot.

```bash
git clone https://github.com/hugocool/product_picker
# follow the README to set up
# point it at a folder of images
# start clicking
```

The whole thing is open source. If you're lazy, just ask ChatGPT or Claude to help you set it up.

---

## What's Next

The next two posts get into the math:

**[Part 2: TrueSkill Demystified](./part2-trueskill-demystified.md)** — How the Xbox matchmaking algorithm works, what $\mu$ and $\sigma$ actually mean, and why "conservative score" matters.

**[Part 3: The Pair Selection Puzzle](./part3-pair-selection-puzzle.md)** — The explore/exploit tradeoff, $E[\Delta\sigma]$ (expected information gain), Thompson Sampling, and the hybrid approach that ties it together.

The core insight: you have preferences you can't articulate directly, but every comparison reveals a little more about them.

---

## References

[^1]: Thurstone, L. L. (1927). "A law of comparative judgment." *Psychological Review*, 34(4), 273–286.

[^2]: Elo, A. E. (1978). *The Rating of Chessplayers, Past and Present*. Arco Publishing.

[^3]: Herbrich, R., Minka, T., & Graepel, T. (2007). "TrueSkill™: A Bayesian Skill Rating System." *Advances in Neural Information Processing Systems*, 19.

[^4]: Settles, B. (2009). "Active Learning Literature Survey." *Computer Sciences Technical Report 1648*, University of Wisconsin-Madison.

---

*Next: [Part 2 - TrueSkill Demystified](./part2-trueskill-demystified.md)*
