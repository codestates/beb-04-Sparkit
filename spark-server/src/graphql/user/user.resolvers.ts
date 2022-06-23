import userModel from "../../models/user.model";
import {status} from "../../constants/code"

type user = {
  id:number,
  email:string,
  password:string,
  nickname:string,
  account:string,
  balance:string,
  privateKey:string,
  createdAt:string
}

export default {
    Mutation: {
      async createUser(_:any,args:user) {
        await userModel.create({ 
          email:args.email,
          password:args.password,
          nickname:args.nickname,
          account:args.account,
          private_key:args.privateKey,
          balance:args.balance
        });
        return status.SUCCESS
      },
      async login(_:any, args:user){
        let user = await userModel.findOne({
          where: {
            email:args.email,
            password:args.password
          }
        })
        if(!user) {
          return status.WRONG_USER_INFO
        }
        return user
      }
    }
  };