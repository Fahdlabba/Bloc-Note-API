const addNote=require('./Notes/addNote')
const fetchNote=require('./Notes/fetchNote')
const createUser=require('./User/createUser')
const login=require('./User/login')
const logout=require('./User/logout')


module.exports={
    addNote,
    fetchNote,
    createUser,
    login,
    logout
}