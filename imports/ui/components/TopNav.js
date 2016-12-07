import React from 'react'
import Logo from './Logo'
import TopNavItem from './TopNavItem'
import cssVars from '/imports/ui/cssVars'

export default class TopNav extends React.Component{
  isActive(routeName){
    return FlowRouter.current().route.name === routeName;
  }

  render(){

    let style = {
      topNavWrapper : {
        background : cssVars.brandColor,
        backgroundSize: "contain",
        borderBottom : "1px solid #CCC"
      },
      topNav : {
        height: "90px",
        position : "relative",
        marginLeft: cssVars.bodySpacing
      },
      nav : {
        position : "absolute",
        display : "flex",
        bottom: 0,
        right: cssVars.bodySpacing
      }
    }

    return(
      <div style={style.topNavWrapper}>
        <div className="topNav" style={style.topNav}>
          <Logo href="/" />
          <nav style={style.nav}>
            <TopNavItem active={this.isActive('Home')} href="/">Home</TopNavItem>
            <TopNavItem active={this.isActive('About')} href="/about/">About</TopNavItem>
            <TopNavItem active={this.isActive('Contact')} href="/contact/">Contact</TopNavItem>
          </nav>
        </div>
      </div>
    )
  }
}
