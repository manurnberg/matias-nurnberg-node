const Mutation = require('../model/mutation.model');
const checkDna = require('../services/checker.service');
const { save, getStats } = require('../repository/mutation.repository');


 const mutationController = {};

mutationController.getData = async (req, res, next) => {
    try {
        return await getStats()
        .then((stats) => {
            res.status(200).json(stats);
        })
    } catch (error) {
        throw error;
    }
    
}

mutationController.checkMutation = async (req, res, next) => {
    
    const dna = req.body['dna'];

    const result = checkDna(dna)
    if (result.error) {
        return res.status(400).json({ error: result.error });
      }

    try {
        const newData = await save({
            hasMutation: result,
            dna: dna.toString()
        })
        if(newData.hasMutation){
            return res.send(200);
        } else {
            return res.send(403);
        }
        
    } catch (error) {
        throw new Error('Store data error');
    }

}

module.exports = mutationController