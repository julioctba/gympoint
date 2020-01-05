import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
    async store(req, res) {
        const { studentId } = req.params;

        const schemaParam = Yup.object().shape({
            studentId: Yup.number().required(),
        });

        const schemaBody = Yup.object().shape({
            question: Yup.string().required(),
        });

        if (
            !(await schemaParam.isValid(req.params)) &&
            !(await schemaBody.isValid(req.body))
        ) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const help_order = await HelpOrder.create({
            id: '',
            student_id: studentId,
            question: req.body.question,
        });

        return res.json(help_order);
    }

    async index(req, res) {
        const { studentId } = req.params;

        if (!studentId) {
            const help_orders_all = await HelpOrder.findAll();
            return res.json(help_orders_all);
        }

        const help_orders = await HelpOrder.findAll({
            where: { student_id: studentId },
        });

        return res.json(help_orders);
    }

    async update(req, res) {
        const answerId = req.params;

        const schemaParam = Yup.object().shape({
            answerId: Yup.number().required(),
        });

        const schemaBody = Yup.object().shape({
            answer: Yup.string().required(),
        });

        if (
            !(await schemaBody.isValid(req.body)) ||
            !(await schemaParam.isValid(req.params))
        ) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const answer_at = new Date();

        const help_order = await HelpOrder.findByPk(req.params.answerId);

        const resultHelpOrder = await help_order.update({
            id: answerId,
            answer: req.body.answer,
            answer_at,
        });

        return res.json(resultHelpOrder);
    }
}

export default new HelpOrderController();
