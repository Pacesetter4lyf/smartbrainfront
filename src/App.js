import React, {Component} from 'react';
import './App.css';
import Navigation from "./Components/Navigation/Navigation.js"
import Logo from "./Components/Logo/Logo.js"
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm.js"
import Rank from "./Components/Rank/Rank.js"
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition.js"
import Signin from "./Components/Signin/Signin.js"
import Register from "./Components/Register/Register.js"
import "tachyons"
import Particles from 'react-particles-js';
const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: 'bf71bf11e81945e0b29a1b4e53d2aa20'}); 

const particlesOptions={
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area:800
      }
    }
  }
}

const initialState = {
    textsrc: "",
    imgsrc : "",
    box:{},
    route: "signin",
    isSignedIn: false,
    user: {
      id: "",
      name: "",
      email: "",
      password: "",
      entries: 0,
      joined: ""
    }
}

class App extends Component{
  constructor(){
    super();
    this.state = initialState;
  }

loadUser = (data) => {
  this.setState({user: data})
}

  calculateFaceLocation(data){
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.right_col*height)
    }
  }

  displayFaceBox = box => {
    //console.log(box)
    this.setState({box:box})
    //console.log("inDisplayBox  ", this.state.box)
  }

  onInputChange = (event) => {
    //console.log(event.target.value)
    this.setState({textsrc: event.target.value})
  }
//"a403429f2ddf4b49b307e318f00e528b"
//8c63373e83c34fb69a79fb4288bc80b6
//a403429f2ddf4b49b307e318f00e528b
  onButtonClick = () => {
    this.setState({imgsrc: this.state.textsrc})
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.textsrc)
      .then(response => {
        //console.log(response)
        if(response){
          fetch("https://lit-bastion-65104.herokuapp.com/image", {
            method: "put",
            headers: {'content-type':"application/json"},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) =>{
    if(route === "home"){
      this.setState({isSignedIn: true})
    }else{
      this.setState(initialState)
    }
    this.setState({route: route})
  }

  render(){
    const {isSignedIn, imgsrc, route, box} = this.state;
    const {name, entries} = this.state.user;

    return (
      <div className="App">
        <Particles className = "particles" params = {particlesOptions} />
        <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
        {route === "signin"
          ? <Signin  loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
          : route === "home"
            ? <div>
                <Logo/> 
                <Rank name = {name} entries = {entries} />
                <ImageLinkForm onInputChange = {this.onInputChange} onButtonClick = {this.onButtonClick}/>
                <FaceRecognition imgLink = {imgsrc} box = {box}/>
              </div>
            : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
        }
      </div>
    );
  }
}
//loadUser = {this.loadUser}
export default App;
//{/*this.state.route === "home"?*/}
//{/*<Register onRouteChange = {this.onRouteChange}/>*/}
