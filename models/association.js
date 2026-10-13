
const Student = require("./students");
const Course = require("./course");

Student.belongsToMany(Course, {
    through: "StudentCourses"
});

Course.belongsToMany(Student, {
    through: "StudentCourses"
});

module.exports = { Student, Course };



// const User = require("./user");
// const Post = require("./post");

// // One user can have multiple posts
// User.hasMany(Post, {
//     foreignKey: "userId",
//     onDelete: "CASCADE"
// });

// // Each post belongs to one user
// Post.belongsTo(User, {
//     foreignKey: "userId"
// });

// module.exports = { User, Post };