<br/>
<p align="center">
<a href="https://<insert URL here>" target="_blank">
</a>
Up up down down left right
</p>
<br/>


[![Gitbook](https://img.shields.io/badge/docs-grey?logo=gitbook&style=flat-square)](<docs link>)
[![Discord](https://img.shields.io/discord/887411327696511027?style=flat-square&logo=discord)](<discord link>)
[![Telegram](https://img.shields.io/badge/chat-telegram-blue?logo=telegram&style=flat-square)](<tg link>)
[![X (formerly Twitter) Follow](<twitter img>)](<twitter link>)



# <add description here>

## Contributing
Read through [CONTRIBUTING.md](./CONTRIBUTING.md) for a general overview of our contribution process.
Then check out our list of [good first issues](https://github.com/org/reponame/contribute) to find something that needs to get done


## Directory Structure

<pre>
root
├── <a href="./src">src</a>: Main source code directory
│   ├── <a href="./src/components">components</a>: React components
│   │   ├── <a href="./src/components/common">common</a>: Common components used across the app
│   │   └── <a href="./src/components/ui">ui</a>: UI components and utilities
│   ├── <a href="./src/constants">constants</a>: Constant values used across the app
│   ├── <a href="./src/hooks">hooks</a>: Custom React hooks
│   │   ├── <a href="./src/hooks/actions">actions</a>: Action-related hooks
│   │   └── <a href="./src/hooks/wallet">wallet</a>: Wallet-related hooks
│   ├── <a href="./src/lib">lib</a>: Library functions and utilities
│   │   ├── <a href="./src/lib/onchain">onchain</a>: On-chain related functions and contracts
│   │   ├── <a href="./src/lib/providers">providers</a>: Context providers
│   │   └── <a href="./src/lib/stores">stores</a>: State management stores
│   ├── <a href="./src/pages">pages</a>: Next.js pages
│   │   └── <a href="./src/pages/api">api</a>: API routes managed by Next,
│   ├── <a href="./src/styles">styles</a>: CSS and style-related files
│   ├── <a href="./src/supabase">supabase</a>: Supabase-related functions and queries
│   └── <a href="./src/utils">utils</a>: Utility functions
├── <a href="./public">public</a>: Public assets
│   ├── <a href="./public/fonts">fonts</a>: Custom fonts
│   └── <a href="./public/images">images</a>: Image assets
└── <a href="./">root</a>: Project root containing configuration files
</pre>

## Setup

Clone the repository, open it, and install nodejs packages with `yarn`:

```bash
git clone <git url>
cd <reponame>
bun i
```



### Building the TypeScript packages

Packag hygine:

Packages compiled when on one branch may not be compatible with packages on a different branch.
**You should recompile all packages whenever you move from one branch to another.**
Use the above commands to recompile the packages.


## Contribution workflow
<!-- TODO: this actually belongs in a contributing.md file, but let's be honest, how many people actually read those? -->
<!-- Additionally, the two-branch approach is somewhat temporary, so having this section in the README is probably fine. -->

We use a two-branch strategy for development:

- `main`: This is the primary development branch where all development happens. All regular pull requests (new features, bug fixes, etc) should be opened against this branch.
  - Refer to [Implementing a New Feature](#scenario-1-implementing-a-new-feature) for more details.
- `release`: This branch is used for production front-end releases and is the one that gets deployed to production. The production front-end build always uses the latest commit from this branch.
  - Refer to [Releasing a Front-end Update](#scenario-2-releasing-a-front-end-update) for more details.

> `main` should never be behind `fe-release`! The only exception is when a hotfix is needed on the production front-end.
> Refer to [Hotfixing the Production Front-end](#scenario-3-hotfixing-the-production-front-end) for more details.

We use the following merge strategies:

.
- **Regular merge**: Latest changes from `master` are **regularly merged** into `release`. This ensures that the production front-end always uses the latest changes from `master`, and prevents merge conflicts when merging into `fe-release`.
  > `master` branch should never be the **source branch** when merging into `release`. This is because the source branch is always deleted after merging, and we don't want to delete `master`.

### Scenario 1: Implementing a New Feature/ Standard feature development

In this scenario you are implementing a new feature that doesn't automatically trigger a front-end release.

1. **Create a new branch**: From the `master` branch, create a new branch for your feature. The branch name should be descriptive of the feature you're implementing.

```bash
git checkout master && git pull && git checkout -b <feature branch name>
```

2. **Implement your feature**: Make your changes in this branch.
3. **Commit your changes**: Regularly commit your changes with clear, concise commit messages. Do as monke say and not as monke do.
4. **Push your branch**: When you're ready to open a pull request, push your branch to the remote repository and open a pull request on GitHub. Add an overview of your changes and a link to the relevant issue (if applicable).

```bash
git push <feature branch name>
```

5. **Sync with `master`**: If you need to use the latest changes from `master`, you can merge them into your branch. This is especially useful if you're working on a long-running feature branch (or if some tests are failing on your branch, which have been fixed on `master`).  Always merge master into your branch prior to merging back into master.  This avoids other peoples code from getting nuked

```bash
git checkout master & git pull
git checkout <feature branch name>
git merge master
```

7. **CI checks**: Once you've pushed your branch, the CI checks will run automatically. If any of the checks fail, you can fix the issues in your feature branch and push again. The CI checks will run again automatically.  THIS STILL NEEDS TO BE IMPLEMENTED
8. **Review and merge**: The PR will be reviewed. If any changes are requested, make them in your feature branch and the PR will automatically update. Once the PR is approved by at least one maintainer, it can be **merged** into `master` and your feature branch will be deleted.


### Scenario 2: Hotfixing the Production Front-end

Sometimes, a bug is discovered in the production front-end that needs to be fixed immediately. In this scenario, you are hotfixing the production front-end without using the latest changes from `master`.

1. **Create a new branch**: From the `fe-release` branch, create a new branch for the hotfix.

```bash
git checkout master && git pull
# Date format is YYYY-MM-DD (sorry my American friends)
git checkout -b hotfix/<hotfix-branch-name>
```

2. **Implement your hotfix**: Make your changes in this branch.

3. **Push your branch**: Push your branch to the remote repository and open a pull request on GitHub.

```bash
git push -u origin hotfix/date
```

4. **CI checks**: Once you've pushed your branch, the CI checks will run automatically. Depending on the severity of the hotfix, you might want to merge the PR as soon or before it passes all checks.

5. **Review and merge**: The PR will be reviewed. Once the PR is approved by either watcher or monke, it can be **merged** into `master` and your hotfix branch will be deleted.

6. Take a deep breath and relax. Or panic, you are your own monke.

7. **Catch up branches**: now that the hotfix is released, you should catch up any applicable branches with the latest changes from the newly updated `master`. This ensures that the fix doesnt get reverted on any future merges

```bash
git checkout master && git pull
git checkout <branch to update> && git pull
git checkout -b catchup/date
git merge master
```

8. **Push your branch**: Push your `catchup/date` branch to the remote repository and open a pull request on GitHub.

```bash
git push -u origin catchup/date
```

9. **CI checks**: Once you've pushed your branch, the CI checks will run automatically. Assuming that `fe-release` is passing all checks, your branch should pass all checks as well.

10. **Review and merge**: The PR will be reviewed. Once the PR is approved by at **least one maintainer**, it can be **regularly merged** into `master` and your catchup branch will be deleted.