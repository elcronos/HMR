import React from 'react'

import TrackerReact from 'meteor/ultimatejs:tracker-react'
import SndTopNav , {SndTopNavAction} from '/imports/ui/components/SndTopNav'
import cssVars from '/imports/ui/cssVars'
import LeftSidebar from '/imports/ui/components/LeftSidebar'
import Sorter from '/imports/ui/components/Sorter'
import { Centers } from '../../api/centers/centers'
import { Fetch } from 'node-fetch'
import { HTTP } from 'meteor/http'

import { SearchInput , SimpleInput, Selector , Label, Radio} from '/imports/ui/components/FormElements'

export default class MainPage extends TrackerReact(React.Component) {
  constructor(){
    super()
    this.state = {
      filter : 'all',
      selectedSort: 'asc',
      suscription : {
        centers: Meteor.subscribe('centers')
      }
    }

    this.handleOnChangeSorter = this.handleOnChangeSorter.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.fetchData = this.fetchData.bind(this)
  }

  componentWillUnmount() {
  		this.state.subscription.centers.stop();
  }

  handleFilter(value){
    console.log('Handle Filter')
    this.fetchData()
    this.setState({filter: value})
  }

  handleOnChangeSorter(code){
    this.setState({selectedSort: code})
  }

  listCenters(){
    return Centers.find({}).fetch()
  }

  fetchData(codesite){
    HTTP.get( `http://192.168.10.103:3333/api/${codesite}`, { /* options */ },
              function(error, response) {
                if ( error ) {
                  console.log( error );
                } else {
                  console.log( response );
                }
              }
            );
  }

  render(){

    let optionsSorter = [
      {code : 'asc', text: 'Name (A–Z)', sorter: {name: 1}},
      {code : 'desc', text: 'Name (Z–A)', sorter: {name: 1}},
      {code : 'youngest', text: 'D.O.B Asc', sorter: {createdAt: -1}},
      {code : 'oldest', text: 'D.O.B Desc', sorter: {createdAt: 1}}
    ]

    return(
    <div style={styles.container}>
          <div style={styles.wrapper}>
            <LeftSidebar>
              <Label>Search by</Label>
              <SearchInput id="form-search-keyword" onChange={this.handleSearchFilter} placeholder="Title, keyword, tag" />
              {/*<Selector id="form-select-industry" placeholder="Select industry" multiple={true} onChange={this.handleIndustryFilter} data={this.listIndustries()} />
              <Selector id="form-select-theme" placeholder="Select theme" onChange={this.handleThemeFilter} data={this.listThemes()} />
              */}
              <Label>Filter results</Label>
              <Radio id="SelectAllCenters" current={this.state.filter} value="bent" onClick={this.handleFilter}>All Centers</Radio>
              {this.listCenters().map((c)=>{
                return <Radio dataId={c._id} key={c._id} current={this.state.filter} value={c.code}  onClick={() => this.handleFilter}>{c.name}</Radio>
              })}
            </LeftSidebar>
            <main style={styles.main}>
              <div style={styles.topBar}>
                <div style={styles.topTitle}>
                  HMR
                </div>
                <Sorter id="SelectSorting" onChange={this.handleOnChangeSorter} options={optionsSorter}/>
              </div>
              <div id="container-playlists">

              </div>
            </main>
          </div>
    </div>
  )
  }
}

var styles = {
  container : {
    height: "calc(100% - 180px)",
  },
  wrapper : {
    display : "flex",
    minHeight: '100%'
  },

  main : {
    flex:1,
    width: '100%',
    padding:'0 '+cssVars.bodySpacing,
  },
  topBar: {
    display: 'flex',
    borderBottom: "1px solid " + cssVars.midGrey
  },
  topTitle: {
    color: cssVars.brandColor,
    marginRight : 'auto',
    padding: '20px 0'
  },
}
