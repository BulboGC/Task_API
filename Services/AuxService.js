function formatString(string) {
    try{
        const words = string.split(' ');

        const formattedWords = words.map(word => {
        if (word.length > 1) {
            return word.charAt(0).toUpperCase() + word.slice(1);

        } else if (word.length === 1) {

            return word.toUpperCase();
        } else {
            return '';
        }
    });

    return formattedWords.join(' ');
    }
    catch(err){
        throw new Error('erro na conversão')
    }
}

module.exports =  {formatString}