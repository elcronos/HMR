import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Centers } from '../../api/centers/centers'
import { UserSchema } from '../../api/users/users.js';

Meteor.methods({
    'resetDatabase'() {
        if(!Meteor.isServer)
        {
            console.log("From Client. Rejecting...");
            return;
        }
        console.log("Resetting Database");

        Meteor.users.remove({});
    },
    'fixtures.userData'() {
        if(!Meteor.isServer)
        {
            console.log("From Client. Rejecting...");
            return;
        }

        let adminObject = {
            username: 'admin',
            email: 'camilop@itadmin.com',
            firstName: 'Admin',
            lastName: 'User',
            password: 'admin@Medi7',
        };

        console.log("Create User Data");
        let adminId = Accounts.createUser(adminObject);
    },
    'fixtures.centerData'(){
      let centerBent = {
        name: 'Benthleigh',
        ip: '',
        code: 'bent'
      }

      let centerChad = {
        name: 'Chadstone',
        ip: '',
        code: 'chad'
      }

      let centerClay = {
        name: 'Clayton',
        ip: '',
        code: 'clay'
      }

      let centerMoor = {
        name: 'Mooroolbark',
        ip: '',
        code: 'moor'
      }

      let centerStkd = {
        name: 'St. Kilda',
        ip: '',
        code: 'stkd'
      }

      let centerLily = {
        name: 'Lilydale',
        ip: '',
        code: 'lily'
      }

      console.log("Create Centers Data");
      Centers.insert(centerBent);
      Centers.insert(centerChad);
      Centers.insert(centerClay);
      Centers.insert(centerMoor);
      Centers.insert(centerStkd);
      Centers.insert(centerLily);
    }
})

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  console.log('Startup ...')
  if(Meteor.users.find({}).count() === 0){
    Meteor.call('fixtures.userData')
  }
  if(Centers.find({}).count() === 0){
    Meteor.call('fixtures.centerData')
  }
})
