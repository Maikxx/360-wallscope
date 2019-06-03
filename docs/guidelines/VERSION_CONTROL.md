# Version control guidelines

## Table of Contents

* [Commiting](#Commiting)
    * [Action](#Action)
    * [Scope](#Scope)
    * [Description](#Description)
* [Branching](#Branching)

## Commiting

The preferred way to write version control messages is as follows: `action(scope): description`.

### Action

The action in the phrase can be one of the following:

* `chore` - Use this if you install new dependencies or change things to the configuration of the application. **These changes need to be pushed on a seperate commit from other changes.**
* `feat` - You will probably use this most of the time. This is for the cases when you add something new to the application.
* `fix` - If there is something broken that has already been pushed and you fixed that.
* `refactor` - Most of the time you use this when you rewrite a piece of code so that it looks better, or is written in a nicer way.
* `copy` - Use this if you only change the copy of a piece of text in the application.

**Note on multiple actions at once**

Preferrably split commits up into separate of these actions.

If for some reason this is not possible or preferrable, use the one on top of the other one.
Like so: `feat` > `fix` or `feat` > `refactor`.
Where the left one in these cases is the one you are going to use.

### Scope

The scope of the phrase above is simply the part of the application where you changed things.
This can be either one of the following:

* `docs` - If you change something to the global documentation, including `BRIEFING.md` files.
* `deps` - For the case where dependencies change. Used in combination with chore.
* `client > *` - For cases where you change something in the client folder. The asterisks (_*_) stands for the part of the application that you changed. For example: `feat(client > home): add homepage`.
* `server > *` - For cases where you change something in the server folder. The asterisks (_*_) stands for the part of the application that you changed. For example: `feat(server > api): integrate api`.
* `*` - For cases where you just don't give a shit, mostly used when you have tried to fix something multiple times, when it clearly did not work.

### Description

This is the easiest of the three pieces, here you just type the message, starting with a _lowercase_, ending without a dot (_._).

Please be descriptive, so: `feat(client > home): add homepage to views folder`, not `feat(client > home): 💩`.

## Branching

<!-- TODO -->