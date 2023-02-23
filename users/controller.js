const pool = require("../db");
const bcrypt = require("bcrypt");
const { password, rows } = require("pg/lib/defaults");
const jwt = require("jsonwebtoken");
const { jwtTokens } = require("../utils/jwt-helper");
const router = require("./routes");

const userService = require('./service');

const getUsers = (req, res, next) => {
    // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para ver lista de usuario.'

    /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/User" },
               description: 'Usuário encontrado.' 
        } */


  let paginator = (req.query.paginator);
  let page = req.query.page;
  userService.getUsers(paginator, page)
    .then((user) => user ? res.json(user) : res.sendStatus(404))
    .catch((err) => next(err));
};



const addUser = async (req, res, next) => {

    // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para registro de usuario.'
  /* #swagger.parameters['req.body'] = {
       in: 'body',
       description: 'Informacion de Endpoint.',
       required: true,
       schema: { $ref: "#/definitions/AddUser" }
  } */

  userService.addUser(req.body)
    .then((user) => {
      if (user.error) {
        res.status(500).send(user);
      } else {
        res.json(user)
      }
    })
    .catch((err) => next(err));
};

const updateUser = async (req, res, next) => {
//console.log('AQAUII'.req.params.id)

  userService.updateUser(req.body, req.params.id)
    .then((user) => {
      if (user.error) {
        res.status(500).send(user);
      } else {
        res.json(user)
      }
    })
    .catch((err) => next(err));
};


const getUserByUsername = (req, res) => {
  const username = req.params.username;
  pool.query(queries.getUserByUsername, [username], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const removeUser = (req, res, next) => {
  userService.updateUser(req.body, req.params.id)
    .then((user) => {
      if (user.error) {
        res.status(500).send(user);
      } else {
        res.json(user)
      }
    })
    .catch((err) => next(err));
  /* const id = parseInt(req.params.id);

  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send("User does not exist in database.");
    }

    pool.query(queries.removeUser, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("User removed successfully");
    });
  }); */
};

const verifyUser = async (req, res, next) => {

  userService.verifyEmail(req.body)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => next(err));
};

const recoverPasswordSendEmail = async (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para enviar correo de recuepracion.'
  /* #swagger.parameters['req.body'] = {
       in: 'body',
       description: 'Informacion de Endpoint.',
       required: true,
       schema: { $ref: "#/definitions/LoginSocial" }
  } */
  userService.sendEmailCode(req.body)
    .then((user) => {
      if (user.error) {
        res.status(500).send(user);
      } else {
        res.json(user)
      }
    })
    .catch((err) => next(err));
};

const recoverPasswordValidateCode = async (req, res, next) => {

  userService.validateCode(req.body)
    .then((user) => {
      if (user.error) {
        res.status(500).send(user);
      } else {
        res.json(user)
      }    })
    .catch((err) => next(err));
};

const loginUser = async (req, res, next) => {

  console.log("AQIOOO");

  userService.loginUser(req.body)
    .then((user) => {
      if (user.error) {
        res.status(500).send(user.data);
      } else {
        res.cookie("refresh_token", user.refreshToken, { httpOnly: true });
        res.json(user)
      }
    })
    .catch((err) => next(err));

};

const loginUserGoogle = async (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para login mediante GOOGLE si el usuario se encuentra registrado.'
  /* #swagger.parameters['req.body'] = {
       in: 'body',
       description: 'Informacion de Endpoint.',
       required: true,
       schema: { $ref: "#/definitions/AddUser" }
  } */


  userService.loginUserGoogle(req.body)
  .then((user) => {
      if (user.error) {
        res.status(500).send(user.data);
      } else {
        res.cookie("refresh_token", user.refreshToken, { httpOnly: true });
        res.json(user)
      }
    })
    .catch((err) => next(err));

};

const loginUserFacebook = async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para login mediante FACEBOOK si el usuario se encuentra registrado.'
  /* #swagger.parameters['req.body'] = {
        in: 'body',
        description: 'Informacion de Endpoint.',
        required: true,
        schema: { $ref: "#/definitions/LoginSocial" }
  } */


  userService.loginUserFacebook(req.body)
    .then((user) => {
      if (user.error) {
        res.status(500).send(user.data);
      } else {
        res.cookie("refresh_token", user.refreshToken, { httpOnly: true });
        res.json(user)
      }
    })
    .catch((err) => next(err));

};

const reLoginUserGoogle = async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para Re-login mediante GOOGLE si el usuario se encuentra registrado.'
  /* #swagger.parameters['req.body'] = {
     in: 'body',
     description: 'Informacion de Endpoint.',
     required: true,
     schema: { $ref: "#/definitions/LoginSocial" }
} */

  userService.reLoginUserGoogle(req.body)
    .then((user) => {
      if (user.error) {
        res.status(500).send(user.data);
      } else {
        res.cookie("refresh_token", user.refreshToken, { httpOnly: true });
        res.json(user)
      }
    })
    .catch((err) => next(err));

};

const reLoginUserFacebook = async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para Re-login mediante FACEBOOK si el usuario se encuentra registrado.'
  /* #swagger.parameters['req.body'] = {
     in: 'body',
     description: 'Informacion de Endpoint.',
     required: true,
     schema: { $ref: "#/definitions/LoginSocial" }
} */
  userService.reLoginUserFacebook(req.body)
    .then((user) => {
      if (user.error) {
        res.status(500).send(user.data);
      } else {
        res.cookie("refresh_token", user.refreshToken, { httpOnly: true });
        res.json(user)
      }
    })
    .catch((err) => next(err));

};

const refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (refreshToken === null)
      return res.status(401).json({ error: "null refresh token" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        let tokens = jwtTokens(user);
        res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
        res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const deleteRefresh = (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "refresh token deleted." });
  } catch {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  removeUser,
  verifyUser,
  recoverPasswordSendEmail,
  recoverPasswordValidateCode,
  loginUser,
  loginUserGoogle,
  reLoginUserGoogle,
  loginUserFacebook,
  reLoginUserFacebook,
  getUserByUsername,
  refreshToken,
  deleteRefresh,
};
