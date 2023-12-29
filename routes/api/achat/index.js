const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/achat.controller')
const Vente = require('../../../models/achat')
const Achats = require('../../../models/achat');
// get all exercises
router.get('/', controller.getAll)
// get all exercises
router.post('/Add',controller.addNew)

// Update Vente
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedVente = await Vente.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedVente) {
            return res.status(404).json({ message: 'Vente not found' });
        }

        res.status(200).json(updatedVente);
    } catch (error) {
        console.error('Error updating Vente:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
 // Import your Achats model

 router.get('/totalAchats', async (req, res) => {
    try {
      const currentMonth = new Date().getMonth() + 1; // Month is zero-based
      const currentYear = new Date().getFullYear();
  
      const result = await Achats.aggregate([
        {
          $addFields: {
            parsedDate: {
              $dateFromString: {
                dateString: "$date",
                format: "%d/%m/%Y" // Adjust the format based on your date string
              }
            },
            totalPrice: {
              $toDouble: "$prix"
            }
          }
        },
        {
          $facet: {
            totalAchatsCurrentMonth: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: [{ $month: "$parsedDate" }, currentMonth] },
                      { $eq: [{ $year: "$parsedDate" }, currentYear] }
                    ]
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  totalAchats: { $sum: "$totalPrice" }
                }
              }
            ],
            totalAchatsCurrentYear: [
              {
                $match: {
                  $expr: {
                    $eq: [{ $year: "$parsedDate" }, currentYear]
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  totalAchats: { $sum: "$totalPrice" }
                }
              }
            ]
          }
        }
      ]);
  
      const totalAchatsCurrentMonth = result[0].totalAchatsCurrentMonth.length > 0
        ? result[0].totalAchatsCurrentMonth[0].totalAchats
        : 0;
  
      const totalAchatsCurrentYear = result[0].totalAchatsCurrentYear.length > 0
        ? result[0].totalAchatsCurrentYear[0].totalAchats
        : 0;
  
      res.json({ totalAchatsCurrentMonth, totalAchatsCurrentYear });
    } catch (error) {
      console.error('Error fetching total achats:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// get piece by id
router.get('/AchatById/:id', controller.getById)
// delete exercise by ID
router.delete('/delete/:id', controller.deleteById)

module.exports = router