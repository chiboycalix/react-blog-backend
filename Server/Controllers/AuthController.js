import bcrypt from 'bcryptjs';
import { generateToken } from '../Middlewares/auth';
import User from '../Models/User';

class AuthController {
  static async signUp(request, response){
    const { firstname, lastname, email, password, username } = request.body;
    const token = await generateToken({ username })
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({firstname, lastname, email, password:hashedPassword, username})
    const userEmail = await User.findOne({ email })
    if(userEmail){
      return response.json({
        status: 409,
        error: 'user already exist'
      })
    }
    return user.save((error) => {
      if(error) return error;
      return response.json({
        status: 201,
        token,
        data: user,
      })
    })
  }

  static async login(request, response) {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return response.json({
        status: 404,
        error: 'user does not exist'
      })
    }
    const harshedPassword = bcrypt.compareSync(password, user.password);
    if(!harshedPassword){
      return response.json({
        status: 400,
        error: 'pasword deos not match'
      })
    }
    return response.json({
      status: 200,
      data: user,
    })
  }
}

export default AuthController;