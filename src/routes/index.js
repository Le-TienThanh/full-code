const UserRouter = require("./UserRouter");
// check api trên gg chorme
// const routes = (app) => {
//   app.use("/api/user", (req, res) => {
//     res.send("Hello World toi toi day ae");
//   }); 
// };
const routes = (app) => {
  app.use("/api/user", UserRouter); 
};
module.exports = routes;
