export type AppStackParams = {
    Open :  undefined,
    Login : undefined,
    SignUp : undefined,
    Home : User_detail,
    Details : {
        name : string,
        index : number,
        color : string,
        imgUrl : string
    }
  }

export type User_detail = {
    name : string,
    email : string,
    password : string
}