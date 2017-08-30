const Calculator = require('../models/Calculator');

module.exports = {
    indexGet: (req, res) => {
        res.render('home/index');
    },
    indexPost: (req, res) => {
        let calculatorBody = req.body['calculator'];
        let calculator = new Calculator(Number(calculatorBody.leftOperand), calculatorBody.operator, Number(calculatorBody.rightOperand));
        let result = calculator.operate();
        res.render('home/index', {'calculator': calculator, 'result': result});
    }
};