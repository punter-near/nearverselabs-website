# Cricket Statistics AI Agent

## 🎯 Project Overview

This project is an open-source contribution toward building **the most intelligent sports AI agent ever created**. By leveraging comprehensive public cricket statistics, we've developed a sophisticated scoring system that analyzes player performance, team composition, and match dynamics with unprecedented depth.

Our system processes real-world Test cricket data spanning decades to create an AI-powered framework capable of evaluating team strength, predicting performance outcomes, and understanding the nuanced interplay of batting, bowling, fielding, and experience factors.

---

## 🚀 Key Features

### 1. **Comprehensive Data Collection**
- Web scraping from ESPNcricinfo's public statistics database
- Four specialized scrapers for different performance dimensions:
  - **Batting Statistics**: Runs, averages, centuries, consistency metrics
  - **Bowling Statistics**: Wickets, economy rates, strike rates, five-wicket hauls
  - **Fielding Statistics**: Catches, stumpings, dismissal rates
  - **All-rounder Statistics**: Combined batting and bowling prowess

### 2. **Advanced Player Scoring System**
- **Longevity-Adjusted Metrics**: Uses Bayesian shrinkage to fairly evaluate players with different career lengths
- **Multi-dimensional Assessment**: 
  - Batting Score (0-100)
  - Bowling Score (0-100)
  - Fielding Score (0-100)
  - Experience Score (0-100)
- **Consistency Modifiers**: Accounts for not-outs, ducks, and performance reliability

### 3. **Intelligent Team Evaluation**
- Analyzes team composition (6 batsmen, 1 wicketkeeper, 4 bowlers)
- Weighted contributions from top performers
- Component-level scoring with realistic weights:
  - Batting: 35%
  - Bowling: 35%
  - Fielding: 15%
  - Experience: 15%

### 4. **Contextual Match Factors**
- Home/Away advantage modeling
- Luck factor simulation for match variability
- Game situation adaptability

### 5. **Statistical Distribution Analysis**
- Monte Carlo simulation with 150,000+ team generations
- Percentile-based tier classification
- Distribution visualization and balance analysis

---

## 📊 Data Pipeline

### Stage 1: Data Acquisition
```
ESPNcricinfo Public Stats → Web Scrapers → Raw CSV Files
```

Four Python scripts collect data with proper rate limiting and error handling:
- `batting_data_scrapping.ipynb` - Collects batting records
- `bowling_data_scrapping.ipynb` - Collects bowling records  
- `fielding_data_scrapping.ipynb` - Collects fielding records
- `allrounder_data_scrapping.ipynb` - Collects all-rounder records

### Stage 2: Data Cleaning & Integration
```
Raw CSVs → Data Cleaning → Player Merge → Final Dataset
```

The cleaning script (`data_merger.py`):
- Standardizes player names and extracts countries
- Merges statistics across all dimensions
- Handles missing data intelligently
- Creates derived metrics (e.g., fielding catches vs keeper stumpings)
- Categorizes players (Batsman/Bowler/Wicketkeeper/All-rounder)

### Stage 3: Scoring & Analysis
```
Final Dataset → Individual Scoring → Team Generation → Distribution Analysis
```

Multiple analysis scripts provide:
- Individual player evaluation
- Team strength assessment
- Score distribution modeling
- Tier-based classification systems

---

## 🧮 Scoring Methodology

### Individual Player Scores

Each player receives four component scores (0-100 scale):

#### Batting Score
- **Batting Average**: Adjusted for career length using Bayesian shrinkage
- **Total Runs**: Career run accumulation
- **Centuries & Fifties**: Major milestone achievements
- **Consistency Modifier**: Rewards not-outs, penalizes ducks proportionally

#### Bowling Score  
- **Bowling Average**: Lower is better, adjusted for career length
- **Total Wickets**: Career wicket-taking ability
- **Five-Wicket Hauls**: Match-winning performances
- **Matches Played**: Experience factor

#### Fielding Score
- **Catches**: Outfield catching ability
- **Stumpings**: Wicketkeeper-specific skill (bonus weighting)

#### Experience Score
- **Career Longevity**: Matches played over career span
- **Pure longevity metric**: No overlap with batting/bowling stats

### Team Score Calculation

**Individual → Team Aggregation**
1. Calculate individual weighted score for all 11 players
2. Sum individual totals (0-1100 range)
3. Scale to 0-1000 range
4. Apply component variance (5%) for realistic fluctuation
5. Apply team variance (3%) for match-day factors
6. Apply contextual modifiers (home/away, luck factor)
7. Smooth scaling to expand range while preserving skill hierarchy

**Key Principle**: Skill dominates over luck. Elite teams consistently outperform average teams.

---

## 🎲 Tier Classification System

Five-tier system based on team scores:

| Tier | Score Range | Color | Rarity | Expected Distribution |
|------|-------------|-------|--------|----------------------|
| **Base** | 0-571 | Black | Common | 40% |
| **Rare** | 571-623 | Bronze | Rare | 25% |
| **Super Rare** | 623-678 | Silver | Super Rare | 20% |
| **Legendary** | 678-733 | Gold | Legendary | 10% |
| **Mythic** | 733-1000 | Platinum | Mythic | 5% |

*Note: Tier boundaries are determined purely by team performance scores, not luck factors.*


---

## 🔧 Installation & Setup

### Prerequisites
```bash
Python 3.8+
pip install pandas numpy scipy matplotlib seaborn beautifulsoup4 requests scikit-learn
```


## 📈 Analysis Outputs

### Console Output
- Statistical summaries (min, max, mean, median, std dev)
- Percentile breakdowns (every 5th and 10th percentile)
- Tier distribution analysis
- Component score analysis
- Home/away impact analysis
- Luck factor impact (gameplay only)

### Visualizations
- Team score distribution with tier boundaries
- Tier distribution pie chart
- Component score box plots
- Luck factor impact analysis
- Comprehensive PDF reports

### CSV Outputs
- Individual player scores
- Team compositions
- Score distributions
- Tier classifications

---

## 🧪 Simulation Capabilities

The system supports multiple simulation modes:

1. **Single Team Generation**: Create one team with detailed breakdown
2. **Small-Scale Testing**: 10,000 simulations for quick validation
3. **Large-Scale Analysis**: 150,000+ simulations for stable distributions
4. **Comparative Studies**: Analyze score distributions across parameters

**Configurable Parameters:**
- Component variance (how much scores fluctuate)
- Team variance (match-day variability)
- Home/away advantage magnitude
- Luck factor impact range
- Smooth scaling parameters for range expansion

---

## 🎯 AI Agent Intelligence Features

### 1. **Contextual Understanding**
The AI understands that:
- Elite batsmen need different evaluation criteria than part-time bowlers
- Wicketkeepers have unique value beyond their batting
- All-rounders require balanced assessment across multiple dimensions
- Career longevity impacts statistical reliability

### 2. **Fair Comparison Framework**
- Young talents aren't unfairly penalized for short careers
- Legends with 150+ matches get their full statistical weight
- Performance consistency matters alongside peak achievements

### 3. **Realistic Match Modeling**
- Home teams have statistical advantages (5% boost)
- Away teams face challenges (3% penalty)
- Luck exists but doesn't overwhelm skill (±5-8% range)
- Top performers contribute disproportionately (weighted averaging)

### 4. **Adaptive Learning Potential**
The framework is designed for:
- Integration with machine learning models
- Real-time prediction systems
- Strategy recommendation engines
- Player development tracking

---

## 🔬 Technical Innovations

### Bayesian Shrinkage for Longevity
```
adjusted_avg = (matches / (matches + k)) * player_avg + 
               ((k / (matches + k)) * league_avg)
```
Where `k` represents the number of matches needed to establish statistical reliability.

### Smooth Score Scaling
```
normalized = (score - min_expected) / (max_expected - min_expected)
scaled = normalized ^ (1 / stretch_power)
final_score = scaled * (target_max - min_expected) + min_expected
```
This preserves skill hierarchy while expanding the score range naturally.

### Weighted Component Aggregation
Top performers in each category (batting, bowling) receive higher weights, reflecting their disproportionate impact on match outcomes.

---

## 📊 Sample Results

### From 150,000 Team Simulations:

**Score Distribution:**
- Mean: ~565
- Median: ~563
- Std Dev: ~75
- Range: 300-950

**Tier Breakdown:**
- Base (40%): 60,000 teams
- Rare (25%): 37,500 teams  
- Super Rare (20%): 30,000 teams
- Legendary (10%): 15,000 teams
- Mythic (5%): 7,500 teams

**Elite Team Threshold:**
- 95th percentile: ~700
- 99th percentile: ~750
- Maximum: ~950

---

## 🤝 Contributing to Sports AI

This project demonstrates several principles crucial for building intelligent sports agents:

1. **Data Quality**: Rigorous cleaning and validation of public statistics
2. **Domain Knowledge**: Cricket-specific understanding of player roles and metrics
3. **Statistical Rigor**: Proper handling of small samples and career variability
4. **Interpretability**: Every score can be traced back to its components
5. **Scalability**: Framework extensible to other sports and formats

---

## 🔮 Future Enhancements

Potential extensions for the AI agent:

- **Format Expansion**: ODI, T20, domestic leagues
- **Temporal Analysis**: Era-adjusted comparisons, form tracking
- **Match Prediction**: Win probability models
- **Strategy Optimization**: Batting order, bowling changes
- **Player Recommendations**: Team building, draft picks
- **Real-time Integration**: Live match scoring and updates
- **Natural Language Interface**: Query system for statistics
- **Visual Analytics Dashboard**: Interactive exploration tools

---

## 📚 Data Sources

All data is collected from publicly available sources:
- ESPNcricinfo Statistics Database (https://stats.espncricinfo.com)
- International Cricket Council (ICC) public records
- Historical Test match archives

**Data Ethics:** 
- No private or personal information collected
- Only publicly available performance statistics used
- Proper rate limiting and respectful scraping practices
- Attribution to original sources maintained

---

## 🙏 Acknowledgments

- ESPNcricinfo for maintaining comprehensive public cricket statistics
- The cricket analytics community for insights into player evaluation
- Open-source Python ecosystem (pandas, numpy, scipy, scikit-learn)

---

## 📧 Contact

For questions, suggestions, or collaboration opportunities related to building the most intelligent sports AI agent:

- Open an issue on this repository
- Contribute via pull requests
- Share your analysis results and findings

---

## 🎓 Research Applications

This framework has potential applications in:

- **Sports Analytics Research**: Academic studies on player valuation
- **Machine Learning**: Feature engineering for predictive models  
- **Data Science Education**: Real-world dataset for teaching
- **AI Development**: Training data for sports-specific agents
- **Statistical Methods**: Demonstrating Bayesian approaches to sports data

---

**Built with ❤️ for advancing sports AI intelligence through open-source collaboration**

