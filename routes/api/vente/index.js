const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/vente.controller')
const Ventes = require('../../../models/vente');
  

// get all pieces
router.get('/ventes', controller.getAll)
// get piece by id
router.get('/VenteById/:id', controller.getById)
// search by name
router.get('/SearchByUser/:userId', controller.searchByUser)
// add piece
router.post('/AddNewVente',controller.addNew)
router.delete('/delete/:id', controller.deleteById)
router.get('/total-ventes', async (req, res) => {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
      const currentYear = currentDate.getFullYear();
  
      const result = await Ventes.aggregate([
        {
          $addFields: {
            parsedDate: {
              $dateFromString: {
                dateString: "$date",
                format: "%d/%m/%Y" // Adjust the format based on your date string
              }
            },
            totalPrice: {
              $multiply: [
                { $toDouble: "$prix" },
                { $toDouble: "$quantite" }
              ]
            }
          }
        },
        {
          $facet: {
            totalVentesCurrentMonth: [
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
                  totalVentes: { $sum: "$totalPrice" }
                }
              }
            ],
            totalVentesCurrentYear: [
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
                  totalVentes: { $sum: "$totalPrice" }
                }
              }
            ]
          }
        }
      ]);
  
      const totalVentesCurrentMonth = result[0].totalVentesCurrentMonth.length > 0
        ? result[0].totalVentesCurrentMonth[0].totalVentes
        : 0;
  
      const totalVentesCurrentYear = result[0].totalVentesCurrentYear.length > 0
        ? result[0].totalVentesCurrentYear[0].totalVentes
        : 0;
  
      res.json({ totalVentesCurrentMonth, totalVentesCurrentYear });
    } catch (error) {
      console.error('Error fetching total ventes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/total-ventes', async (req, res) => {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
  
      const result = await Ventes.aggregate([
        {
          $addFields: {
            parsedDate: {
              $dateFromString: {
                dateString: "$date",
                format: "%d/%m/%Y" // Adjust the format based on your date string
              }
            },
            totalPrice: {
              $multiply: [
                { $toDouble: "$prix" },
                { $toDouble: "$quantite" }
              ]
            }
          }
        },
        {
          $match: {
            $expr: {
              $eq: [{ $year: "$parsedDate" }, currentYear]
            }
          }
        },
        {
          $group: {
            _id: {
              month: { $month: "$parsedDate" },
              year: { $year: "$parsedDate" }
            },
            totalVentes: { $sum: "$totalPrice" }
          }
        }
      ]);
  
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching total ventes:', error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router