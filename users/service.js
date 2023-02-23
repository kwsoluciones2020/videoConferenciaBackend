const pool = require("../db");
//const queries = require("./queries");
const bcrypt = require("bcrypt");
const { password, rows } = require("pg/lib/defaults");
const jwt = require("jsonwebtoken");
const { jwtTokens } = require("../utils/jwt-helper");
const router = require("./routes");
const general = require("../utils/general")
const { Op } = require("sequelize");
const sendEmail = require("../utils/email")
fs = require("fs"); 
NOMBRE_ARCHIVO = __dirname + "/mail.txt";


let v_email = true;
const User = pool.user;



const getUsers = async (paginator = "true", page = 1) => {

/*     if (paginator === 'true') {
        const limit = 10;
        const count = await User.count();
        const pages = Math.ceil(count / limit);
        let off = parseInt(page) * 10 - limit;
        let located = parseInt(page);
        const users = await User.findAll({ attributes: { exclude: ['password', 'token_access'] }, limit: limit, offset: off });
        return ({ pages: pages, located: located, data: users })

    } else {
        const users = await User.findAll();
        return users;
    } */
    const users = await User.findAll();
    //console.log("paso",users);
    return users;
};

const addUser = async (user) => {
    let user_id = "";
    const { email } = user;

    if (v_email) {
        const usr = await User.findOne({ where: { "email": email } });
        if (usr === null) {
            try {
                const salt = await bcrypt.genSalt();
                if (user.email) {
                    if (user.password) {
                        const hashedPassword = await bcrypt.hash(user.password, 10);
                        user.password = hashedPassword;
                    }

                    let save = await User.create(user);
                    user_id = save.dataValues.id;
                    /* let data ={
                        email:user.email,
                        fullname:user.name?user.name:" ",
                        rol:user.rol,
                        type:0
                    } 
                    try {
                        sendEmail.sendMail(data);
                    } catch (error) {
                        console.log(error)
                    } */

                    return ({ data: { msg: 'registro existoso', id: user_id }, error: false });

                } else {
                    throw ({ data: "Los datos email, name, contraseña, identificacion son requeridos", error: true });
                }

            } catch (error) {
                //console.log("ERROR",error.original.detail)
                if (error.original.detail) {
                    return ({ data: error.original.detail, error: true })

                } else {
                    return ({ data: error, error: true })

                }

            }
        } else {
            //console.log("aquiii");
            return ({ data: 'El correo  ya existe', error: true })

        }
    } else {
        return ({ data: 'El correo ingresado no es real', error: true })

    }
};



const updateUser = async (user, iduser) => {

    if(user.password){
        const salt = await bcrypt.genSalt();
     
            if (user.password) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }

          
    }

    let condition = {};

    if (iduser.includes('@')) {
        condition["email"] = iduser;
    } else {
        condition["id"] = iduser;

    }

    try {
        const updatedRows = await User.update(
            user,
            {
                where: condition,
            }
        );
        if (updatedRows[0] !== 0) {
            return ({ data: 'registro existoso', error: false })

        } else {
            return ({ data: 'Algo inesperado ha pasado', error: true })

        }
    } catch (error) {
        return ({ data: error.original.detail, error: true })


    }

};

const loginUser = async (user) => {
    const { username, password } = user;

    const usr = await User.findOne({ where: { username: username } });
    console.log('AQUII',usr);

    if (usr === null) {
        return ({ data: 'El Usuario no se encuentra registrado', error: true });
    } else {
        const validPassword = await bcrypt.compare(
            password,
            usr.password
        );
        if (!validPassword)
            return ({ data: 'La contrasena es incorecta', error: true })

        let tokens = jwtTokens(usr.username);
        let access = {
            token_access: tokens.accessToken
        }

        let up = await updateUser(access, usr.id);
        console.log(up);

        tokens['name'] = usr.name +' '+ usr.last_name;
        tokens['username'] = usr.username;

        return tokens;
    }



}

const verifyEmail = async (user) => {
    const { email } = user;
    const usr = await User.findOne({ where: { email: email } });
    if (usr === null) {
        return false;
    } else {
        return true;
    }

}

const sendEmailCode = async (user) => {
    const { email } = user;
    const usr = await User.findOne({ where: { email: email } });
    if (usr === null) {
        return ({ data: 'El Correo no existe en el sistema', error: true });
    } else {
        let str = "";
        for (let index = 0; index < 4; index++) {
            let random = Math.random();
            random = random * 9 + 1;
            random = Math.trunc(random);
            str += random;
            console.log(str);
        }
        let data = {
            email: user.email,
            code: str,
            type: user.type
        }
        let code = {
            code_recovery: str
        }
        let a = await updateUser(code, email);
        //console.log('AAAAAAAAAAAAAAAAA',a);
        fs.readFile(NOMBRE_ARCHIVO, "utf8", function (error, datos) {
            if (error) throw error;
            sendEmail.sendMail(data,datos.replace("${pass}", str));
        });
        return ({ data: 'Correo enviado con exito ', error: false });

    }


}

const validateCode = async (user) => {
    const { email, code } = user;
    const usr = await User.findOne({ where: { email: email, code_recovery: code } });
    if (usr === null) {
        return ({ data: 'Codigo Incorrecto', error: true });
    } else {
        let code = {
            code_recovery: ""
        }
        let a = await updateUser(code, email);
        return ({ data: 'Verificacion existosa',_id:usr.id, error: false });
    }

}

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
    loginUser,
    getUsers,
    addUser,
    updateUser,
    verifyEmail,
    sendEmailCode,
    validateCode,

};