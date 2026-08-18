# Introduction


First off, thank you for considering contributing to TULIP. It's people like you that make TULIP such a great tool.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

## What kinds of contributions we are looking for.

### 1. Reporting Bugs
Before creating a bug report, please check the existing issues to see if the bug has already been reported. 

When opening a new issue, please include:
* **A clear title and description** of the problem.
* **Steps to reproduce** the issue step-by-step.
* **Expected vs. actual behavior**.
* **Environment details** (OS, Node/Browser version, database setup).

### 2. Suggesting Enhancements
Feature requests are always welcome! When suggesting a feature:
* Explain **why** this feature would be useful to users.
* Describe **how** you envision it working.
* Provide context or examples where applicable.

### 3. Submitting Pull Requests
1. **Fork the repository** and create your branch from `main`.
2. **Set up your local environment** (see setup instructions below).
3. **Keep commits clean and concise** with descriptive commit messages.
4. **Ensure tests pass** before submitting.
5. **Open a Pull Request (PR)** against the `main` branch with a clear description of your changes and any related issue numbers (e.g., `Closes #12`).

---

## Ground Rules
### Code of Conduct

Please treat everyone in the community with respect, patience, and courtesy. We aim to foster an inclusive, welcoming environment for all contributors.

---

## Local Development Setup

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm**
* **PostgreSQL** database instance

### Getting Started
1. **Clone your fork:**
```bash
git clone https://github.com/[YOUR-USERNAME]/[project-name].git
cd project-name
```

2. **Install Dependencies**
```bash
npm install
```

3. **Run Backend**
```bash
cd api
npm run dev
```

4. **Run Frontend (in new terminal)**
```bash
cd app
npm run dev
```

---

## Code & Tech Stack Guidelines
### To keep the codebase consistent and accessible, please adhere to the following standards:
- Language & Formatting: Use JavaScript (ES6+ standard practices). Follow existing linting and formatting rules.
- Frontend UI: Use Bootstrap for layouts, components, and responsive styling. Avoid adding competing CSS frameworks.
- Database & Security: Ensure database queries and interactions are compatible with encrypted PostgreSQL configurations and adhere to secure data-handling practices.
- Testing: Write unit or integration tests for new features where appropriate. Ensure all existing tests pass before submitting your PR.

---

## Pull Request Review Process
### Once submitted, project maintainers will review your PR.

Maintainers may suggest changes, improvements, or request additional tests.

Once approved and all checks pass, your PR will be merged into `main`.

---

Thank you again for your time and contribution!
