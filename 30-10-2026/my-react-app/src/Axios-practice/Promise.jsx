const orderPromise = new Promise((resolve, reject) => {
    let foodAvailable = true;

    if (foodAvailable) {
        resolve("Food order successful!");
    } else {
        reject("Food is not available.");
    }
});

orderPromise
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    });