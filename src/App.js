import React, { Component} from 'react';
import './App.css';
import Settings from './Settings';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        image: './defaultImg.jpg'
        
    }
  }
  render() {
    return(
      <div className="App">
        <div className="ImageBG" style={{backgroundImage: 'url('+ this.state.image + ')'}}></div>
        <Settings image={this.state.image} />
      </div>  
    )
  }
}


export default App;

