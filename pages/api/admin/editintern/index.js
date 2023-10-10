import mongooConnect from '../../../../utils/db';
import Intern from '../../../../models/Intern';

export default async function handler(req, res) {
  const { method } = req;
  await mongooConnect();

  if (method === 'PUT') {
    try {
      const {
        name,
        course,
        university,
        department,
        startDate,
        endDate,
        temperature,
        period,
        _id,
      } = req.body;

      await Intern.updateOne(
        { _id },
        {
          name,
          course,
          university,
          department,
          startDate,
          endDate,
          temperature,
          period,
        }
      );

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error editing intern:', error);
      res.status(500).json({ success: false, error: 'Failed to edit intern' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
