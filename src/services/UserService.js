const User = require("../models/UserModel");
// const bcrypt = require("bcrypt");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try{
      const checkUser = await User.findOne({
        email: email
      })
      if (checkUser != null) {
        resolve({
          status: "OK",
          message: "The email is exist!",
        });
      }
      const createUser = await User.create({
        name,
        email,
        password,
        confirmPassword,
        phone,
      });
      if (createUser) {
        resolve({
          status: "OK",
          message: "Create user success!",
          data: createUser,
        });
      }

      
    }
    catch(e){
      reject(e);
    }
  });
};



  
    
// const hash = bcrypt.hashSync(password, 10);


// const loginUser = (userLogin) => {
//   return new Promise(async (resolve, reject) => {
//     const { name, email, password, confirmPassword, phone } = userLogin;

//     try {
//       const checkUser = await User.findOne({ email: email });
//       if (checkUser === null) {
//         resolve({
//           status: "OK",
//           message: "The user is not defined!",
//         });
//       }
//       // const comparePassword = bcrypt.compareSync(password, checkUser.password);

//       // if (!comparePassword) {
//       //   resolve({
//       //     status: "OK",
//       //     message: "The password or user is not correct!",
//       //   });
//       // }

//       // const access_token = await generalAccessToken({
//       //   id: checkUser.id,
//       //   isAdmin: checkUser.isAdmin,
//       // });
//       // console.log("access_token", access_token);

//       // const refresh_token = await generalRefreshToken({
//       //   id: checkUser.id,
//       //   isAdmin: checkUser.isAdmin,
//       // });
//       // resolve({
//       //   status: "OK",
//       //   message: "Create user success!",
//       //   access_token,
//       //   refresh_token,
//       // });
//       resolve({
//         status: "OK",
//         message: "Login success!",
//         data: checkUser,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
// module.exports = { createUser, loginUser };

module.exports = { createUser };
