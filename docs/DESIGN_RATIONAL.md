# Design Rational

## Debriefing

Together with **Wallscope**, **Information Services Division** (ISD) wants to improve their website so that users are able to easily look up data on their platform. The ISD has four target groups, The Curious, The Detailed, The focused and The Diggers.

**The Curious** are not sure what they want yet and are drawn in by ideas. They mainly want an unbiased point of view.
**The Detailed** want to fully understand an issue, to connect all the dots to improve the system.
**The Focused** know what they want and want easy access to it.
**The Diggers** need raw data, to conduct their own research and connect the unconnected.

ISD is an open data source that provides their users with data about health information, health intelligence and statistics. This in cooperation with **NHS Scotland**.
Together with Wallscope they want to link data to one another, so that users are able to easily access the data on the ISD platform.

Wallscope creates links in the dataset by creating triples.
A triple creates a link between two entities by having a reference in the middle.
The database uses **RDF** (Resource Description Framework), which represents data as statements. One statement is composed of one triple: the subject → predicate → object. How would that look like? Example:
`(subject)John → (predicate)Has mother → (object)Heather`. So the statement is that John has a mother named Heather.

By using these triples it is possible to present the user more targeted search results, so that users aren't overwhelmed by all the data that ISD has at their disposal.

Wallscope and ISD would like to see an improved version of the current ISD website, where the user is able to look up information by using natural language search terms. As a result the users are able to create links between data to underpin their research.

## Problem definition

Users can't find what they are looking for when searching through the data with the ISD website.
They don't understand all the different tables and input fields that have to be filled in before they even get any results.
This bad user experience results in the fact that none of the four target groups are able to find what they are looking for in the way they want to look for it.

## Stakeholders

* **NHS Scotland**
    Provide data in cooperation with ISD.
* **ISD Scotland**
    Provide data to the users, through their online platform.
* **Wallscope**
    Create solutions, to make data more manageable. So that users do not get lost in a maze of data, but are able to retrieve this easily.
* **The Curious**
    They are not sure what they want yet and are drawn in by ideas. They mainly want an unbiased point of view.
* **The Detailed**
    They want to fully understand an issue, to connect all the dots to improve the system.
* **The Focused**
    They know what they want and want easy access to the data.
* **The Diggers**
    They need raw data, to conduct their own research and connect the unconnected.

## Context

The context will be mainly indoors and while people are focussed on their laptop.
The people that are using the system will be mostly looking for something specific.
For example, students are doing research for an upcoming test or journalists that are looking for data to use as a base for infographics.

## Sub-questions

* Does the user think this application is an improvement for the current website?
* Is the application user friendly?
* Is the application accessible?
* Is the concept of linked data going to have any effect on the design of the application?

## Design challenge

Create an application that enables the user to search the NHS database more effectively.
Improve the overall user experience in a way that the target group will find it easy and helpful to use the app.

## Solution

RAIN, enabling medical students and researchers to find data, store this data and link the data together in various ways. This results in more relevant data for the user, which makes it easier for them to draw conclusions.

## Explanation of the code

The project is structured in a complex manner from the base and up.

We use Node as the servers language, since this is a language we most are familiar with.
On top of JavaScript (Node) we used TypeScript, to provide a more error prone way of writing code, which is essential for cases where projects get large quickly, like this one did, this also applies to the client.
On the server we also have some unit tests with Mocha and Chai, to test some of the more error prone pieces of code.
With just Node you can do only so much, so we used Express to handle interactions between the server and the client, via REST API calls.
We choose Express, because of the ease of use, no other reason.
When working with data, you often also have some form of data storage, in this case we use a PostgreSQL database to store various tables of data, that are used by the client.
PostgreSQL was chosen, because we wanted to practise using this type of SQL language.

On the flip-side (client) we use a combination of TypeScript, React and SCSS (with the BEM methodology).
We use Parcel to bundle all the files together into three files of each type, HTML, CSS and JavaScript.
These then get outputted to the public folder of the server when something changes, resulting in the page being updated.
SCSS and BEM where easy to choose, since it makes writing CSS in large applications way easier.

The frontend framework was probably the most cumbersome to decide, since everyone had experience with a different framework, except for two of us.
We decided to go for React, because of the fact that the application was too large of a scale to create natively, while it was the easiest one of the bunch to use, since two of us already had used it.
It did end up being a little bit of a burden for some of us in the end.

Because we didn't have time to integrate the linkage system in the live application, one of us decided it would be best to create a separate folder called “linkables”, where the linkage system actually works in native JavaScript.

### Structure

* client/
    * src/
        * components/ (React components)
        * services/ (API calls and localStorage interaction)
        * types/ (TypeScript types)
        * utils/ (General utility JavaScript functions)
        * views/ (React top level views, which render components)
        * Client application root files
    * config files
* docs/ (All markdown documents, along with their assets, except for the README)
* server/
    * public/ (Client-side compiled code is outputted here, as well as a robots.txt)
    * src/
        * orm/ (Database interacting functions, structured by scope folders)
        * routes/ (Express route handling functions, these call orm functions)
        * services/ (General structure providers, like auth and routing)
        * types/ (TypeScript types)
        * utils/ (General utility JavaScript functions)
        * Server application root file
* General project files, like tsconfig.json, package.json and .gitignore
