# Product Picker

*A Bayesian tool for discovering your true preferences*

Product Picker is a general-purpose pairwise comparison tool. It helps you make decisions when faced with too many visual options. Whether you're choosing a vacation destination, an apartment, a color scheme, or (as in the origin story) the perfect piece of jewelry, this app uses Microsoft's **TrueSkill** algorithm to learn your subjective taste through simple "A or B" choices.

## 📖 The Story & The Math

Read the full three-part series on how this works:

**[👉 Read the Blog Series (hosted on GitHub Pages)](https://hugocool.github.io/product_picker/)**

1. [Part 1: The Pendant Problem](https://hugocool.github.io/product_picker/part1-the-pendant-problem) — Motivation and why pairwise comparison beats absolute ratings.
2. [Part 2: TrueSkill Demystified](https://hugocool.github.io/product_picker/part2-trueskill-demystified) — How $\mu$ (appeal) and $\sigma$ (uncertainty) model your taste.
3. [Part 3: The Pair Selection Puzzle](https://hugocool.github.io/product_picker/part3-pair-selection-puzzle) — Active learning, $E[\Delta\sigma]$, and Thompson Sampling.

*(Markdown source files are also available [locally](./blog/README.md))*

## Features

- 🖼️ **Visual Discovery**: Scans any folder of images (JPG, PNG, WEBP, etc.)
- 🎯 **Preference Learning**: Learns your taste through natural "Which do you like more?" choices.
- 📊 **TrueSkill Algorithm**: Bayesian rating system that tracks both what you like and how confident it is.
- 🏆 **Stable Leaderboard**: Uses Conservative Scores ($\mu - 3\sigma$) to ensure top results are battle-tested favorites.
- 📈 **Active Learning**: Intelligently picks pairs that teach the algorithm the most about your preferences.
- 💾 **SQLite Persistence**: Your rankings and match history are saved locally in the image folder.

## Installation

```bash
# Clone the repository
git clone https://github.com/hugocool/product_picker.git
cd product_picker

# Install with uv (recommended)
uv sync

# Or with pip
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Usage

### From Python

```python
from product_picker.app import launch_app

# Launch the Gradio interface
launch_app()
```

### From Jupyter Notebook

See `notebooks/pendant_chooser.ipynb` for an interactive notebook interface.

### Command Line

```bash
python -m product_picker
# With uv
uv run python -m product_picker

# Or activate venv first
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

## How It Works

1. **Scan**: Point to a folder containing product images
2. **Compare**: Choose between pairs of images (Left/Right/Draw/Skip)
3. **Rank**: TrueSkill updates ratings after each comparison
4. **View**: Leaderboard shows top-ranked items with confidence scores

### TrueSkill Rating System

- Represents skill as N(μ, σ²) - a normal distribution with mean (μ) and uncertainty (σ)
- Conservative score = μ - 3σ (99.7% confidence lower bound)
- Prioritizes high-uncertainty items and close matchups for informative comparisons
- Penalizes repeated pair comparisons to avoid loops

### Data Persistence

- Database stored at `YOUR_FOLDER/.pendant_ranker/pendants.sqlite`
- Last used folder remembered at `~/.pendant_chooser/config.json`
- SHA-256 content hashing prevents duplicates
- Ratings persist across sessions
- Simply load the same folder to continue where you left off

## Project Structure

```
product_picker/
├── src/product_picker/
│   ├── __init__.py
│   ├── models.py          # SQLModel database schemas
│   ├── database.py        # Database operations
│   ├── rating.py          # TrueSkill rating logic
│   ├── images.py          # Image loading and processing
│   ├── matching.py        # Pair selection heuristics
│   ├── ui.py              # Gradio interface
│   └── app.py             # Main application entry point
├── notebooks/
│   └── pendant_chooser.ipynb
├── tests/
├── pyproject.toml
├── requirements.txt
└── README.md
```

## License

MIT
