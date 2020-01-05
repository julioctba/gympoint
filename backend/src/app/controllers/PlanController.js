import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const planExist = await Plan.findOne({
            where: { title: req.body.title },
        });

        if (planExist) {
            return res.status(400).json({ error: 'Plan already exists.' });
        }

        const { id, title, duration, price } = await Plan.create(req.body);

        return res.json({ id, title, duration, price });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string(),
            duration: Yup.number(),
            price: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { planId } = req.params;

        const plan = await Plan.findByPk(planId);

        if (req.body.title !== plan.title) {
            const planExist = await Plan.findOne({
                where: { title: req.body.title },
            });
            if (planExist) {
                return res.status(400).json({ error: 'Plan already exists.' });
            }
        }

        const { title, duration, price } = await plan.update(req.body);

        return res.json({
            title,
            duration,
            price,
        });
    }

    async index(req, res) {
        const { title, duration, price } = req.query;
        const { planId } = req.params;
        if (!planId) {
            const plans = await Plan.findAll({
                title,
                duration,
                price,
            });

            return res.json(plans);
        }
        const plan = await Plan.findByPk(planId);
        return res.json(plan);
    }

    async delete(req, res) {
        const { planId } = req.params;

        const plan = await Plan.findByPk(planId);

        await plan.destroy();

        return res.json(plan);
    }
}

export default new PlanController();
