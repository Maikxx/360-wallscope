# Notes 360-wallscope

* [Learning React](#Learning-React)
* [Rubrics](#Rubrics)

# Learning React
I used this [Tutorial](https://react.holiday/2017/) to understand the basics of React.
### Props
```Javascript
import React from "react";
import ReactDOM from "react-dom";

function Greeting(props) {
  return <h1>Hello {props.name}!</h1>;
}

ReactDOM.render(
  <Greeting name="bulbasaur" />,
  document.getElementById("root")
);
```

Using props with while using a class to define a component
```Javascript
class ClapCounter extends React.Component {
  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() => alert(1 + " claps")}
        >
        👏
        </button>
        <i> be the first to clap {this.props.name}</i>
      </div>
    );
  }
}

ReactDOM.render(
  <ClapCounter name='jesper' />,
  document.getElementById("root")
);

```

### Children
The component can be used dynamic, when you want to use the component for instance a button. You might want the text/content to change but the rest of the button to stay the same. This is how you can *smoosh* these together.

```Javascript
ReactDOM.render(
  <ClapCounter>
    <h1>Clap This!</h1>
  </ClapCounter>,

  ...
```

```Javascript
class ClapCounter extends React.Component {
  render () {
    <div>
      {this.props.children}

      ...
```

The `<h1>` element will be placed on the spot where: `{this.props.children}` is defined in the component.

### States
A state stores a value which you can use in the component itself, e.g. for calculations. 

How to set a state for a component:
```Javascript
class MyStateOfMind extends React.Component {
  constructor() {
    super();
    this.state = { sexy: true }
  }
  ...
```

ESNext way:
```Javascript
class MyStateOfMind extends React.Component {
  state = { sexy: true }
  ...
  ```

  #### Change the state in the component:
  ```Javascript
  <button
  type="button"
  onClick={() =>
    this.setState({ clapCount: 1 })
  }
>

...
```

#### Change the state dynamically
```Javascript
...

this.setState((previousState) =>
  ({ clapCount: previousState.clapCount + 1 })
)

...
```

### Rendering data
Use .map() to put the JSON data in for example a list:
```Javascript
class Pokemon extends React.Component {
  state = {
    character: null
  };

  componentDidMount() {
    fetchPokemon(this.props.id, character =>
      this.setState({ character })
    );
  }

  render() {
    return this.state.character ? (
      <div>
        {console.log(this.state.character)}
        <h2>{this.state.character.name}</h2>

        <h4>Abilities</h4>
        <ul>
          {this.state.character.abilities.map(ability => (
            <li>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
    ) : (
      <div>loading...</div>
    );
  }
}

```

Don't forget to set a key! 

```Javascript
<li key={ability.ability.name}>
  {ability.ability.name}
</li>
```

### Event aan component doorgeven
Gebruik het geïmporteerde component in je huidige component.
Geef 'onClick' als property mee
```Javascript
     <Button
          onClick={() => {
            console.log("hello");
          }}
        >
          -
        </Button>
```

In het Button component:
```Javascript
  render() {
    return <button onClick={this.props.onClick}>{this.props.children}</button>;
  }
```

### Lifecycle Hooks
When pressing the button to update the property id the number changes but the api call doesn't start again. This is what Lifecycle Hooks are used for. 
```Javascript
import React from "react";
import ReactDOM from "react-dom";
import fetchPokemon from "./fetchPokemon";

class Pokemon extends React.Component {
  state = {
    character: null
  };
  
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.id !== prevProps.id) {
      fetchPokemon(this.props.id).then(character =>
        this.setState({ character }))
    }
  }

  componentDidMount() {
    fetchPokemon(this.props.id).then(character =>
      this.setState({ character })
    );
  }

  render() {
    return this.state.character ? (
      <div>
        <h2>{this.state.character.name}</h2>

        <h4>Abilities</h4>
        <ul>
          {this.state.character.abilities.map(ability => (
            <li key={ability.ability.name}>
              {ability.ability.name}
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div>loading...</div>
    );
  }
}

class PokemonPager extends React.Component {
  state = {
    id: 1
  };

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() =>
            this.setState(({ id }) => ({ id: id - 1 }))}
        >
          Previous
        </button>
        
        <button
          type="button"
          onClick={() =>
            this.setState(({ id }) => ({ id: id + 1 }))}
        >
          Next
        </button>
        
        <h2>{this.state.id}</h2>

        <Pokemon id={this.state.id} />
        
      </div>
    );
  }
}

ReactDOM.render(
  <PokemonPager />,
  document.getElementById("root")
);

```

## New ES6 things (I didn't know of)
(Using Typescript)

When having this object:
```Typescript
interface Props {
    className?: string
    type?: ButtonType
    styleOverride?: StyleType
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}
```

You can pick two out in a shorter way:
```Javascript
const { className, styleOverride } = this.props
```

# Rubrics

## Web Apps From Scratch
![WAFS](./img/WAFS.png)

## CSS to the rescue
![CSS](./img/CSS.png)
![CSS2](./img/CSS2.png)

## Web Design
![WebDesign](./img/WebDesign.png)

# User test
## Report
### General info
* Team: [Chelsea](https://github.com/chelseadoeleman), [Maikel vV](https://github.com/Maikxx), [Maikel S](https://github.com/Senpaizuri), [Jesper](https://github.com/jesperingels)
* Date: 06-20-2019
* Product: RAIN, enabling students and journalists to find data, store this data and link the data. This results in more relevant data for the user, which makes it easier for them to draw conclusions.
* Why does the user use this app?: To find data they need in their research, article, thesis etc. 

### Purpose of this test
**High-level**
1. Does the user understand how the app can help them?
2. Is the usability good enough for them to achieve their goals. 
3. Does the user understand what Boards does and why it's usefull for them?
4. Would the user use it more often on their phone or laptop/desktop?


**Research questions**
1. Does the user understand they first have to log in to be able to store data?
2. Does the user understand how they can add an article to their board.
3. Does the user know how to link the data?

### Intro scenario / tasks
* You're a student writing your thesis and you have to search our database. You want to store this data so you can get an overview. 

* The data is related to eachother, for your research you want to define which data belongs to eachother. 

* While your logged in, change your username. 

## User Scenario
Noah is a medical student writing his thesis and has to look into multiple (medical) datasets to support his findings. He sits in the school library on his laptop searching the few specific websites that provide this data. Noah had to follow a seperate course to be able to search for the data using these websites, this is because the usability of the websites is very bad. 

Noah downloads the app 'Rain', he heard is friend talk about this app. Noah is writing about alcohol abuse, and how it differs in different areas in the country. So he opens up the app and the first thing he does is type in what he's searching for: 'Alcohol abuse in Noord-Holland'.

| ![Home page](./img/Home-Search@2x.jpg) | ![Articles](./img/articles@2x.jpg) |   
|----------------------------------------|------------------------------------|

 The key words the system (Natural Language Processing) picks out are highlighted, so Noah now knows which words the app is using to search the data. 

<img height="800px" src="./img/articlesPlus@2x.jpg" />

 
 Noah doesn't quite find what he's looking for, so he adds some keywords that the app suggests to him. The ammount of articles and datasets decreases, which means that the search has become more specified.

<img height="800px" src="./img/popupBoards@2x.jpg" />

Noah browses through the articles and wants to save some articles to get an overview. He clicks on the 'boards' button in the bottom-menu and is prompted with the message that he has to be logged in to use 'boards'. So Noah creates an account. 

<img height="800px" src="./img/createAccount@2x.jpg" />


After Noah created his account he goes right back to where he left and adds an article to his Board.

| ![Home page](./img/articlesLi@2x.jpg) | ![Articles](./img/addToBoard@2x.jpg) |   
|----------------------------------------|------------------------------------|

After Noah added the article to his boards he navigates to the boards page. 

<img height="800px" src="./img/Boards@2x.jpg"/>

In the overview Noah sees the board he just created: 'Alcohol'. If he clicks on this board he sees the overview of the articles and datasets he collected for this topic. 

<img height="800px" src="./img/Linking@2x.jpg"/>

On this page Noah can link the data he just collected. This is so he can see what data is linked to eachother,
since it is important that he draws the right conclusions in his research.

