# Version control guidelines

## Table of Contents

* [Commiting](#Commiting)
    * [Action](#Action)
    * [Scope](#Scope)
    * [Description](#Description)
* [Branching](#Branching)
    * [Tooling](#Tooling)
    * [How-to](#How-to)
    * [Types of branches](#Types-of-branches)
        * [Master branch](#Master-branch)
        * [Develop branch](#Develop-branch)
        * [Named branches](#Named-branches)
    * [Pull requests](#Pull-requests)

## Commiting

The preferred way to write version control messages is as follows: `action(scope): description`.

### Action

The action in the phrase can be one of the following:

* `chore` - Use this if you install new dependencies or change things to the configuration of the application. **These changes need to be pushed on a seperate commit from other changes.**
* `feature` - You will probably use this most of the time. This is for the cases when you add something new to the application.
* `fix` - If there is something broken that has already been pushed and you fixed that.
* `refactor` - Most of the time you use this when you rewrite a piece of code so that it looks better, or is written in a nicer way.
* `copy` - Use this if you only change the copy of a piece of text in the application.

**Note on multiple actions at once**

Preferrably split commits up into separate of these actions.

If for some reason this is not possible or preferrable, use the one on top of the other one.
Like so: `feature` > `fix` or `feature` > `refactor`.
Where the left one in these cases is the one you are going to use.

### Scope

The scope of the phrase above is simply the part of the application where you changed things.
This can be either one of the following:

* `docs` - If you change something to the global documentation, including `BRIEFING.md` files.
* `deps` - For the case where dependencies change. Used in combination with chore.
* `client > *` - For cases where you change something in the client folder. The asterisks stands for the part of the application that you changed. For example: `feature(client > home): add homepage`.
* `server > *` - For cases where you change something in the server folder. The asterisks stands for the part of the application that you changed. For example: `feature(server > api): integrate api`.
* `*` - For cases where you just don't give a shit, mostly used when you have tried to fix something multiple times, when it clearly did not work.

### Description

This is the easiest of the three pieces, here you just type the message, starting with a _lowercase_, ending without a dot.

Please be descriptive, so: `feature(client > home): add homepage to views folder`, not `feature(client > home): 💩`.

## Branching

When working on a version controlled project it is highly preferred to work in branches.

### Tooling

When using branches, I suggest using a tool called [Fork](https://git-fork.com/) or [SourceTree](https://www.sourcetreeapp.com/) to easily get an overview of the full project.

Simply follow the installation steps and open the project inside one of these programs to get started.

### How-to

Creating new branches is fairly simple (Most of these commands can also be done with the tools provided above):

1. You change to the branch where you want to branch off from. `git checkout <branchName>`.
2. Create a new branch from your current branch. `git branch -b <newBranchName>`.
3. Switch to that new branch. `git checkout <newBranchName>`.

For more information on git itself checkout the [documentation](https://www.git-scm.com/).

**Warning**

Never delete a branch with `git branch -D <branchName>`.
This will also delete the current branch that you are on, and it can also delete te master branch, which you know, gives trouble unless the project is backed up somewhere.

### Types of branches

Branches are in itself all equal, which is of not much use to us.
That is why there is a smart branch naming system, of which I don't know the name 💩.

Branch naming in itself does nothing to enforce the commits pushed on it, however when using a tool such as Fork or SourceTree, these branches become _folder-like_, which is very useful to reduce clutter on the `origin` branch.

The default branches are `master` and `develop`.

#### Master branch

The master branch is a branch on which should not be pushed.
If I somehow find out how to restrict pushing to this branch I will do that.

This branch is for release versions of the software that is being created.
There should be no explicitly known bugs in the code in this branch.

#### Develop branch

This is the branch that is being staged for release (or in English, this will be merged soon into master).
This branch should not be restricted from being pushed to, since some commits are typically allowed. Allowed commits include one of the following actions: `chore`, `fix` and `copy`.

Features and refactors should almost never be pushed to this branch, but instead should be created inside `feature/<branchName>` and `refactor/<branchName>` branches, respectively.

#### Named branches

Branches can be named (wow, I know), but did you also know you could use _slashes_ in that name?
I for one did not until a few months ago.

Version control tools such as the ones mentioned above provide a folder like structure when using these kinds of branches, which is nice.

Semantic branch names:
* `feature/` - Branch for specific features.
    Avoid hitting files outside of the scope of this branch.
    Example: `feature/client-app-view-integration`. (Branched from `develop`)
* `refactor/` - Branch for specific refactors (rewrites of code).
    Avoid hitting files outside of the scope of this branch.
    Example: `refactor/client-app-view-integration`. (Branched from `develop`)
* `fix/` - Branch for specific fixes. Avoid hitting files outside of the scope of this branch.
    Example: `fix/client-app-view-integration`.
    These type of branches will be less common, since it is also allowed to perform fixes on `develop`. (Branched from `develop`)
* `hotfix/` - Branch for **high prio fixes**, that are already on the `master` branch.
    These type of branches should really never occur, since all code and designs going to `master` should already be tested.
    Hotfix branches generally have different names from normal branches, I have not thought out this far yet.
    If it occurs that you need it and you read this, ask me again what naming conventions these should follow.
    Everything is allowed in this branch, as long as it aims to fix **high prio bugs** on `master`. (Branched from `master`)

### Pull requests

When you are finished working on a specific branch, feel free to create a [pull request](https://github.com/Maikxx/360-wallscope/pulls) with a descriptive **name**, **description** containing explanation on what has been changed and a **reviewer**.

You will probably always want to choose `develop` as your **base** branch and the branch you want to merge as the **compare** branch, except for the case when merging a `hotfix` branch.

When merging branches, you come to one of the most crappy things about working with any source control... **merge conflicts**.
This happens when two people have worked on the same file, on the same line where git doesn't know what version to take.
Most of the time these are pretty easy to fix, often you can _take both_, for other cases where you get stuck, let others know and they will probably help you out.

[VSCode](https://code.visualstudio.com/) has got a pretty decent merge conflict overview tool, while some of the other tools mentioned above are good too.