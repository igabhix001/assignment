const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const  jwt  = require("jsonwebtoken");


const { Admin } = require("../db");
const { JWT_SECRET } = require("../config");


// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await Admin.findOne({
        username: username
    });
    if (existingUser) {
        res.status(400).json({
            error: 'Admin already exists'
        })
    } else {
        const newAdmin = await Admin.create({
            username: username,
            password: password
        });
        
        res.status(201).json({
            msg: 'Admin created successfully'
        })
    }
});

router.post('/signin', async(req, res) => {
    // Implement admin signin logic
    const username = req.body.username;
    const password = req.body.password;
   
    const VerifyUser = await Admin.findOne({
        username: username,
        password: password
    })
if(VerifyUser){
    const signature = jwt.sign({
        username: VerifyUser.username,
        password: VerifyUser.password
    }, JWT_SECRET);
    res.json({
        token: signature
    });
} else {
    res.status(400).json({
        error: 'Username does not exist'
    })
}
});


    

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // zod
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        message: 'Course created successfully', courseId: "new course id"
    })

});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
  const  response = await courses.find({});
    res.json({
        courses: response
    })
});

module.exports = router;