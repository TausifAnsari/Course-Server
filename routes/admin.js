const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const mongoose = require('mongoose')

const User = require('../models/user')
require('../models/promotions')
const Faculty = require('../models/faculties')
const Enrolled = require('../models/enroll')
const Courses = require('../models/courses')
const Comments = require('../models/comments')
require('../models/urls')
//databases: [mongoose],

AdminBro.registerAdapter(AdminBroMongoose)


const adminBro = new AdminBro({
    
  
  resources: [User,Faculty,Enrolled,Courses,Comments],
  rootPath: '/admin'
})


const router = AdminBroExpress.buildRouter(adminBro)

module.exports= router
