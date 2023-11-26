const Mutation = require('../model/mutation.model');
const checkDna = require('../services/checker.service');
const { save, getStats } = require('../repository/mutation.repository');


 const mutationController = {};

 mutationController.getData = async (req, res, next) => {
    try {
        console.info('Fetching mutation statistics...');
        const stats = await getStats();
        res.status(200).json(stats);
    } catch (error) {
        console.error('Error retrieving mutation statistics:', error);
        throw error;
    }
};

mutationController.checkMutation = async (req, res, next) => {
    const dna = req.body['dna'];

    console.info('Checking mutation for DNA sequence...');
    const result = checkDna(dna);

    if (result.error) {
        console.error('Invalid DNA sequence:', result.error);
        return res.status(400).json({ error: result.error });
    }

    try {
        await Mutation.sync();

        console.info('Saving mutation data...');
        const newData = await save({
            hasMutation: result,
            dna: dna.toString()
        });

        if (newData.hasMutation) {
            console.info('Mutation detected. Sending success response.');
            return res.status(200).send();
        } else {
            console.info('No mutation detected. Sending forbidden response.');
            return res.status(403).send();
        }
    } catch (error) {
        console.error('Error storing mutation data:', error);
        throw new Error('Error storing mutation data');
    }
};

module.exports = mutationController