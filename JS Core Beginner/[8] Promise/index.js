function asyncOperation(operationName, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(operationName + ' выполнена.');
            resolve(operationName); 
        }, delay);
    });
}

function performSequentialOperations() {
    asyncOperation('Операция 1', 1000)
        .then(result => {
            return asyncOperation('Операция 2', 2000);
        })
        .then(result => {
            return asyncOperation('Операция 3', 1500);
        })
        .then(result => {
            console.log('Все операции выполнены.');
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        })
        .finally(() => {
            console.log('Завершение последовательных операций.');
        });
}

document.getElementById('startButton').addEventListener('click', () => {
    console.log('Начало последовательных операций.');
    performSequentialOperations();
});
