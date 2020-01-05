import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';

class EnrollmentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number().required(),
            plan_id: Yup.number().required(),
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const getPlan = await Plan.findOne({
            where: { id: req.body.plan_id },
        });

        const enrollmentExist = await Enrollment.findOne({
            where: { student_id: req.body.student_id },
        });

        if (enrollmentExist) {
            return res
                .status(400)
                .json({ error: 'Enrollment already exists.' });
        }

        const { start_date, student_id, plan_id } = req.body;
        const end_date = addMonths(parseISO(start_date), getPlan.duration);
        const price = getPlan.duration * getPlan.price;

        const enrollment = await Enrollment.create({
            id: '',
            price,
            student_id,
            plan_id,
            start_date,
            end_date,
        });

        return res.json(enrollment);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number().required(),
            plan_id: Yup.number().required(),
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { enrollmentId } = req.params;

        const enrollment = await Enrollment.findByPk(enrollmentId);

        if (req.body.student_id !== enrollment.student_id) {
            const enrollmentExist = await Enrollment.findOne({
                where: { student_id: req.body.student_id },
            });
            if (enrollmentExist) {
                return res
                    .status(400)
                    .json({ error: 'Enrollment already exists.' });
            }
        }

        const getPlan = await Plan.findOne({
            where: { id: req.body.plan_id },
        });

        const { student_id, plan_id, start_date } = req.body;
        const end_date = addMonths(parseISO(start_date), getPlan.duration);
        const price = getPlan.duration * getPlan.price;

        const response = await enrollment.update({
            student_id,
            plan_id,
            start_date,
            end_date,
            price,
        });

        return res.json(response);
    }

    async index(req, res) {
        const { enrollmentId } = req.params;
        if (!enrollmentId) {
            const enrollments = await Enrollment.findAll();

            return res.json(enrollments);
        }
        const enrollment = await Enrollment.findByPk(enrollmentId);
        return res.json(enrollment);
    }

    async delete(req, res) {
        const { enrollmentId } = req.params;

        const enrollment = await Enrollment.findByPk(enrollmentId);

        await enrollment.destroy();

        return res.json(enrollment);
    }
}
export default new EnrollmentController();
