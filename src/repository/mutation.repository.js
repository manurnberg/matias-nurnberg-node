const Mutation = require('../model/mutation.model');


const getStats = async () => {

    try {
        await Mutation.sync();

        console.info('Counting mutations...');
        const countMutations = await Mutation.count({ where: { hasMutation: true } });
        console.info('Counting no mutations...');
        const countNoMutation = await Mutation.count({ where: { hasMutation: false } });
        console.info('Calculating ratio...');
        const ratio = countMutations / (countNoMutation + countMutations);
        
        console.info('Operations completed successfully.');
        return {
            count_mutations: countMutations,
            count_no_mutations: countNoMutation,
            ratio: ratio.toFixed(2)
        };
    } catch (error) {
        console.error('Error retrieving statistics:', error);
        throw error;
    }
}


const save = async (data) => {
    if(!data){
        console.error('Error: data is undefined');
        throw new Error('data is undefined')
    }
    try {
        await Mutation.sync(); 
        console.info('Saving data...');
        const result = await Mutation.create(data);
        console.info('Operation completed successfully.');

        return result
    } catch (error) {
        console.error('Error storing data:', error);
        throw new Error('Error storing data');
    }
}

module.exports = { save, getStats };