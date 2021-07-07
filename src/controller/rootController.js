import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "회원가입" });
};

export const postJoin = (req, res) => {
    const { email, username, password, checkPassword } = req.body;
    const pageTitle = "회원가입";
    if(password !== checkPassword) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "비밀번호 확인을 확인해주세요😭"
        })
    };
    const exists = await User.exists({ email });
    if(exists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "이미 가입된 이메일입니다😭"
        })
    }
    try {
        await User.create({
            email,
            username,
            password,
            avatar: "img"
        })
        return res.redirect('/login');
    } catch(error) {
        return res.status(400).render("join", {
            pageTitle: "join",
            errorMessage: error._message,
          });
    }
};

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "로그인" });
};

export const postLogin = (req, res) => {
    const { email, password } = req.body;
    const pageTitle = "로그인";
    const user = await User.findOne({ email });
    if(!user) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "존재하지 않는 이메일입니다😭"
        })
    }
    const check = await bcrypt.compare(password, user.password);
    if(!check) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "비밀번호를 확인해주세요😭"
        })
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};