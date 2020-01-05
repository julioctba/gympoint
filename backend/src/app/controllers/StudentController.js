import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.number().required(),
            height: Yup.number().required(),
            weight: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const studentExist = await Student.findOne({
            where: { email: req.body.email },
        });

        if (studentExist) {
            return res.status(400).json({ error: 'Student already exists.' });
        }

        const { id, name, email, age, height, weight } = await Student.create(
            req.body
        );

        return res.json({ id, name, email, age, height, weight });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            age: Yup.number(),
            height: Yup.number(),
            weight: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { studentId } = req.params;

        const student = await Student.findByPk(studentId);

        if (req.body.email !== student.email) {
            const studentExist = await Student.findOne({
                where: { email: req.body.email },
            });
            if (studentExist) {
                return res.status(400).json({ error: 'User already exists.' });
            }
        }

        const { name, email, age, weight, height } = await student.update(
            req.body
        );

        return res.json({
            name,
            email,
            age,
            weight,
            height,
        });
    }

    async index(req, res) {
        const { studentId, device } = req.params;
        const { q } = req.query;

        if (q) {
            const students = await Student.findAll({
                where: { name: { [Op.iLike]: `%${q}%` } },
            });
            return res.json(students);
        }

        if (device === 'mobile' && studentId) {
            const student = await Student.findByPk(studentId);
            return res.json({
                student: {
                    name: student.name,
                    email: student.email,
                    id: student.id,
                },
            });
        }

        if (!studentId) {
            const { name, email, age, weight, height } = req.query;

            const students = await Student.findAll({
                name,
                email,
                age,
                weight,
                height,
            });

            return res.json(students);
        }
        const student = await Student.findByPk(studentId);
        return res.json(student);
    }

    async delete(req, res) {
        const { studentId } = req.params;

        const student = await Student.findByPk(studentId);

        await student.destroy();

        return res.json(student);
    }
}

export default new StudentController();
