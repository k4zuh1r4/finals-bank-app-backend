export default interface IUsersService {
    getAllUsers(res): Promise<any>
    createUser(userData, res):Promise<any>
    getUserByID(id, res):Promise<any>
    updateUser(id, patchData, res):Promise<void>
    deleteUser(id, req, res):Promise<void>
}