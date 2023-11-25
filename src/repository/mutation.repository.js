const Mutation = require('../model/mutation.model');


const getStats = async () => {

    try {
        await Mutation.sync();
        const countMutations = await Mutation.count({ where: { hasMutation: true } });
        const countNoMutation = await Mutation.count({ where: { hasMutation: false } });
        
        const ratio = countMutations / (countNoMutation + countMutations);
    
        return {
            count_mutations: countMutations,
            count_no_mutations: countNoMutation,
            ratio: ratio.toFixed(2)
        };
    } catch (error) {
        throw error;
    }
}


const save = async (data) => {
    if(!data){
        throw new Error('data es undefined')
    }
    try {
        await Mutation.sync(); 
        return await Mutation.create(data);
    } catch (error) {
        throw new Error('Store data error');
    }
}

module.exports = {save, getStats};