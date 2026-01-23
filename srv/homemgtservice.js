module.exports = async (srv) => {
    // Here "*" mean all, instead we can mention entity name.
    srv.on('READ', '*', async (req) => {
        // Return dummy data directly for this entity set
        return [
            { Mid: "1", Name: 'Sagar Salyan', Age: 28 },
            { Mid: "2", Name: 'Sunil', Age: 28 },
            { Mid: "3", Name: 'Shiva', Age: 28 }
        ];
    });
};