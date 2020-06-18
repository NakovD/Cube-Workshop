


const failSavingInDB = (error) => {
    const allErrors = error.message.split(', ');
        let errorMessage;
        if (allErrors.length > 1) {
            errorMessage = 'Invalid info!'
        } else {
            errorMessage = allErrors[0].split(': ')[2];
        }
        return errorMessage;
}


module.exports = failSavingInDB;
