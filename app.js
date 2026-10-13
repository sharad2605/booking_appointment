
const sequelize = require("./utils/db-connection");
const { Student, Course } = require("./models/association");

async function insertData() {
    try {
        await sequelize.sync();

        const student1 = await Student.create({
            name: "Rahul"
        });

        const student2 = await Student.create({
            name: "Priya"
        });

        const course1 = await Course.create({
            title: "Node.js"
        });

        const course2 = await Course.create({
            title: "React.js"
        });

        // Rahul enrolls in both courses
        await student1.addCourse(course1);
        await student1.addCourse(course2);

        // Priya also enrolls in Node.js
        await student2.addCourse(course1);

        console.log("Students, courses, and associations created!");

        // Retrieve Rahul along with his courses
        const result = await Student.findByPk(student1.id, {
            include: Course
        });

        console.log(JSON.stringify(result, null, 2));

    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await sequelize.close();
    }
}

insertData();