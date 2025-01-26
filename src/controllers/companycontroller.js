const prisma = require('../utils/prisma');

exports.getCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({});
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};