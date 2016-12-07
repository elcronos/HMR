import React from 'react'
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter'

//Pages
import LoginPage from '/imports/ui/pages/LoginPage'
import MainPage from '/imports/ui/pages/MainPage'
//Layouts
import MainLayout from '/imports/ui/layouts/MainLayout'
//Nav
import TopNav from '/imports/ui/components/TopNav'


// Track if the user is suddendly logout ( session expire etc..)
Tracker.autorun(function(c) {
  var userId = Meteor.userId();
  if (c.firstRun)
    return;
  if(!userId){
    FlowRouter.go('/login');
  }
});

const authenticatedRoutes = FlowRouter.group(
  { name: 'authenticated',
    triggersEnter: [function(context, redirect) {
      //Not Authorized
      if(!Meteor.userId()){
        FlowRouter.go('/login')
      }
    }]}
);


authenticatedRoutes.route('/',{
  name: 'Home',
  action(){
    mount(MainLayout, {
      navbar: () => (<TopNav />),
      content: () => (<MainPage />)
    })
  }
})


FlowRouter.route('/login',{
  name : 'Login',
  action(){
    mount(MainLayout, {
      navbar: () => (''),
      content: () => (<LoginPage />)
    })
  }
})
