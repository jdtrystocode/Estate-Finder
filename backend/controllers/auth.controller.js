import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const register = async(req, res) => {
    const { username, email, password } = req.body;

    try {
    //Hash password 

    const hashedPassword =  await bcrypt.hashSync(password, 10);
    console.log(hashedPassword);
    //Create new user and save to database 
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        },
    });

    console.log(newUser);
    res.status(201).json({message: "User has been created successfully."});

} catch (err)
{
    console.log(err);
    res.status(500).json({message: "Failed to create user"});
} 
   
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try{
    //User exists 
    const user = await prisma.user.findUnique({
        where: {username}
    })
    if(!user) return res.status(401).json({message: "Invalid Credentials"});

    //Password is correct

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) return res.status(401).json({message: "Invalid Credentials"});

    //Generate token and send to client
    //res.setHeader("Set-Cookie", "test=" + "myValue").json("Login Successful");
    const age = 1000 * 60 * 60 * 24 * 7; //1 week
    const token = jwt.sign({
        id: user.id,
        isAdmin: false,
    },
    process.env.JWT_SECRET_KEY, 
    {expiresIn: age});

    const {password:userPassword, ...userInfo} = user;
    
    
    res.cookie("token", token, {
        httpOnly: true,
        secure:true,
        sameSite: "none",
        maxAge: age,
    }).status(200).json({message: userInfo});
    

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to login user"});
    }
}

export const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({ message: "Logout Successful" });
};