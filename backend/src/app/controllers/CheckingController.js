import * as Yup from 'yup';
import Moment from 'moment';
import Checkin from '../models/Checkin';

const { Op } = require('sequelize');

class CheckingCrontroller {
    async store(req, res) {
        const { studentId } = req.params;

        const schema = Yup.object().shape({
            studentId: Yup.number().required(),
        });

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const lastCheckins = await Checkin.findAll({
            where: {
                created_at: {
                    [Op.gte]: Moment()
                        .subtract(7, 'days')
                        .toDate(),
                },
                student_id: studentId,
            },
        });

        if (lastCheckins.length >= 5) {
            return res.status(400).json({
                error:
                    'Quantity maximum for Checkins is from five in seven days',
            });
        }

        const checkin = await Checkin.create({
            id: '',
            student_id: studentId,
        });

        return res.json(checkin);
    }

    async index(req, res) {
        const { studentId } = req.params;

        const checkins = await Checkin.findAll({
            where: { student_id: studentId },
        });

        return res.json(checkins);
    }
}

export default new CheckingCrontroller();
