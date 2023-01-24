const addNote=require('./Notes/addNote')
const fetchNote=require('./Notes/fetchNote')
const createUser=require('./User/createUser')
const login=require('./User/login')
const logout=require('./User/logout')
const {resetPswd,verifyUser}=require('../Controller/User/resetPassword')


module.exports={
    addNote,
    fetchNote,
    createUser,
    login,
    logout,
    resetPswd,
    verifyUser,
}