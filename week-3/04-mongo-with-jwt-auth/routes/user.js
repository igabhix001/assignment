const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db");
const  jwt  = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");




// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({
        username: username
    });
    if (existingUser) {
        res.status(400).json({
            error: 'User already exists'
        })
    } else {
        const newUser = await User.create({
            username: username,
            password: password
        });
        res.status(201).json({
            msg: 'User created successfully'
        })
    }
});


router.post('/signin', async(req, res) => {
    // Implement admin signin logic
    const username = req.body.username;
    const password = req.body.password;
   
    const VerifyUser = await User.findOne({
        username: username
    })
if(VerifyUser){
    const signature = jwt.sign({
        username
    }, JWT_SECRET);
    res.json({
        token: signature
    });
} else {
    res.status(400).json({
        error: 'User does not exist'
    })
}
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const response = await courses.find({});
    res.json({
        courses:Response
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const username =req.username;
    const couseId = req.params.courseId;

   User.updateOne({
        username
    }, {
        $push: {
            purchasedCourses: couseId
        }
    });

    res.json({
        msg: 'Course purchased successfully'
    })


});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
const user = await User.findOne({
    username:req.headers.username
})
const courses = await Course.find({
    _id: {
        "$in": user.purchasedCourses
    }
})
res.json({
    courses: courses
})
});

module.exports = router