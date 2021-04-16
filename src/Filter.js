import React, { Component} from 'react';
import PropTypes from 'prop-types'; 

// Filter
class Filter extends Component {

    getFilterCSSStyles = (functions)=>{
      let filterString = "";
        for (let filter in functions) {
          if( functions.hasOwnProperty(filter) ) {
            switch(filter){
              case 'hue': filterString+= 'hue-rotate(' + functions[filter] + 'deg) '; break;
              case 'blur': filterString += filter + '(' + functions[filter] + 'px) '; break;
              default: filterString += filter + '(' + functions[filter] + '%) '
            }
          } 
        }
        return filterString;
        
    }
    render(){
      let filterstring = this.getFilterCSSStyles(this.props.filterFunctions);
      return (  
        <div className="Filter" style={{width:'100%',height:'100%',filter: filterstring}} onClick={()=>{this.props.onClick(this.props.filterFunctions)}}>
          {this.props.children}  
        </div>
      );
    } 
  }
  
  Filter.propTypes = {
    // An object taking on a particular shape
    filterFunctions: PropTypes.shape({
      hue: PropTypes.number,
      contrast: PropTypes.number,
      brightness: PropTypes.number,
      saturate: PropTypes.number,
      sepia: PropTypes.number,
      blur: PropTypes.number
     
    }),
    onClick : PropTypes.func
  };

  export default Filter;