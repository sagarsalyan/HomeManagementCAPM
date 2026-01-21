module.exports = async (srv) => {
    srv.on('READ', 'Members', async (req) => {
        // Return dummy data directly for this entity set
        return [
            { Mid: "1", Name: 'Sagar Salyan', Age: 28 },
            { Mid: "2", Name: 'Sunil', Age: 28 },
            { Mid: "3", Name: 'Shiva', Age: 28 }
        ];
    });
};