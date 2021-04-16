import React, { Component} from 'react';
import PropTypes from 'prop-types'; 
import domtoimage from 'dom-to-image-improved';
import { AiOutlinePlus,AiOutlineCloudDownload } from "react-icons/ai";
import Filter from './Filter';

// Settings Container
class Settings extends Component{
    constructor(props){
      super(props);
      this.state = {
          'contrast':100,
          'hue':0,
          'brightness':100,
          'saturate':100,
          'sepia':0,
          'blur':0,
          'image':props.image
        };
      this.props = props;
    }
    handleImg = (e)=>{
        if(e.target.files[0]) {
            this.setState({
                image: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });    
        }
    }
    handleChange = (e)=>{
      let filter = e.target.id;
      let value = parseInt(e.target.value); 
      this.setState((prevState,props)=>{
        prevState[filter] = value;
        return prevState;
      });
    }
    updateSettings = (nextFilterState)=>{
      this.setState(nextFilterState);
    }

    saveAsPNG = ()=>{
        let img = document.querySelector('.ImageContainer .Filter');
        domtoimage.toPng(img, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'Photo.png';
            link.href = dataUrl;
            link.click();
        });
       
    }
    
    saveAsJPEG = ()=>{
        let img = document.querySelector('.ImageContainer .Filter');
        domtoimage.toJpeg(img, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'Photo.jpeg';
            link.href = dataUrl;
            link.click();
        });
       
    }
    render() {
      return (
        <div className="Settings">
          <div className="MainWrapper">
            <div className="Sidebar">
              <div className="Title">FILTERS</div>
              <Setting name="contrast"   min={0} max={200} value={this.state.contrast} onChange={this.handleChange}></Setting>
              <Setting name="hue"        min={-360} max={360} value={this.state.hue} onChange={this.handleChange}></Setting>
              <Setting name="brightness" min={0} max={200} value={this.state.brightness} onChange={this.handleChange}></Setting>
              <Setting name="saturate"   min={0} max={100} value={this.state.saturate} onChange={this.handleChange}></Setting>
              <Setting name="sepia"      min={0} max={100} value={this.state.sepia} onChange={this.handleChange}></Setting>
              <Setting name="blur"      min={0} max={100} value={this.state.blur} onChange={this.handleChange}></Setting>
              <div className="FilterList">
                <Filter key="Original" filterFunctions={{'contrast':100,'hue':0,'brightness':100,'saturate':100,'sepia':0,'blur':0}} onClick={this.updateSettings}><Image image={this.state.image} imageStyle="Original"/></Filter>
                <Filter key="Aged" filterFunctions={{'contrast':94,'hue':-54,'brightness':92,'saturate':100,'sepia':44,'blur':0}} onClick={this.updateSettings}><Image image={this.state.image} imageStyle="Aged"/></Filter>
                <Filter key="Vintage" filterFunctions={{'contrast':164,'hue':0,'brightness':47,'saturate':0,'sepia':100,'blur':0}} onClick={this.updateSettings}><Image image={this.state.image} imageStyle="Vintage"/></Filter>
              </div>
            </div>
            <div className="ImageContainer">
              <Filter key="Default" filterFunctions={{'contrast':this.state.contrast,'hue':this.state.hue,'brightness':this.state.brightness,'saturate':this.state.saturate,'sepia':this.state.sepia,'blur':this.state.blur}}><Image image={this.state.image}/></Filter>          
            </div>  
         </div>
         <div className="FilterBtns">
             <label className="btn btn-new">
             <input 
                    type="file" 
                    accept=".png, .jpg, .jpeg" 
                    id="photo" 
                    className="visually-hidden"
                    onChange={this.handleImg}
                />
                <span className="txt">New Image</span>
                <span className="round"><AiOutlinePlus/></span>
                </label>
                <button className="btn btn-save" onClick={this.saveAsPNG}>
                    <span className="txt">Save PNG</span>
                    <span className="round"><AiOutlineCloudDownload/></span>
                </button>
                <button className="btn btn-save-jpeg" onClick={this.saveAsJPEG}>
                    <span className="txt">Save JPEG</span>
                    <span className="round"><AiOutlineCloudDownload/></span>
                </button>
        
                
             </div>
        </div>
  
      )
    }
  }
  
  function Setting(props){
      return (
          <div className="Setting">
            <label><div>{props.name}</div><div>{props.value}</div></label>
            <input min={props.min} max={props.max} step="1" onChange={props.onChange} id={props.name} type="range" value={props.value} />
          </div>
        );
  }
  
  Setting.propTypes = {
    name:PropTypes.string,
    value:PropTypes.number,
    min:PropTypes.number,
    max: PropTypes.number,
    onChange : PropTypes.func
  };

  
// Image
function Image(props){
    return (
    <>
      <div className="Image" style={{backgroundImage: 'url(' + props.image + ')'}}></div>
      <label><div className="ImageStyle">{props.imageStyle}</div></label>
    </>
    );
};
  export default Settings;