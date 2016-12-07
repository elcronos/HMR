import React from 'react'
import {createMarkupForStyles} from 'react-dom/lib/CSSPropertyOperations'
import Isvg from 'react-inlinesvg'


export function getSVGUrl(type){
  return "/images/icons/icon_"+type+".svg"
}

export class Icon extends React.Component {
  render(){
    return <CustomSvg onClick={this.props.onClick} style={this.props.style} src={getSVGUrl(this.props.type)} />
  }
}


export default class CustomSvg extends Isvg {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    ...Isvg.defaultProps,
    cacheGetRequests: true,
    onClick: ()=>{}
  }

  static propTypes = {
    ...Isvg.propTypes,
    style : React.PropTypes.object
  }

  render() {
    let styles = {
      wrapper : {
        display : 'flex'
      }
    }
    return this.props.wrapper({
      onClick : this.props.onClick,
      className: this.getClassName(),
      style : styles.wrapper,
      dangerouslySetInnerHTML: this.state.loadedText ? {
        __html: this.processSVG(this.state.loadedText)
      } : undefined
    }, this.renderContents());
  }

  processSVG(svgText) {
    // Check if we receive an html file instead of an svg ( from a 404 )
    // This should be done before, but the packages doesn't seem to support that'
    if(svgText.indexOf('<html') !== -1){
      return super.processSVG('');
    }
    if(this.props.style) {
      // Find something cleaner
      svgText = svgText.replace('<svg ','<svg style='+createMarkupForStyles(this.props.style)+' ');
    }
    return super.processSVG(svgText);
  }
}
