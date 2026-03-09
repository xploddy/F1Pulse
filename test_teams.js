const axios = require('axios');

async function getConstructorCareerStats(constructorId) {
    try {
        const [racesRes, winsRes, firstPage] = await Promise.all([
            axios.get('https://api.jolpi.ca/ergast/f1/constructors/' + constructorId + '/races.json?limit=1'),
            axios.get('https://api.jolpi.ca/ergast/f1/constructors/' + constructorId + '/results/1.json?limit=1'),
            axios.get('https://api.jolpi.ca/ergast/f1/constructors/' + constructorId + '/results.json?limit=100')
        ]);

        let allRaces = firstPage.data.MRData.RaceTable.Races || [];
        const totalRows = parseInt(firstPage.data.MRData.total || '0');
        const pages = Math.ceil(totalRows / 100);

        if (pages > 1) {
            const promises = [];
            for (let i = 1; i < pages; i++) {
                promises.push(axios.get(`https://api.jolpi.ca/ergast/f1/constructors/${constructorId}/results.json?limit=100&offset=${i * 100}`));
            }
            const results = await Promise.all(promises);
            results.forEach(res => {
                allRaces = allRaces.concat(res.data.MRData.RaceTable.Races || []);
            });
        }

        let totalPoints = 0;
        let totalPodiums = 0;
        allRaces.forEach((race) => {
            race.Results?.forEach((r) => {
                totalPoints += parseFloat(r.points || '0');
                const pos = parseInt(r.position);
                if (pos <= 3) totalPodiums++;
            });
        });

        console.log(constructorId, 'success', totalPoints);
    } catch (e) {
        console.log(constructorId, 'ERROR', e.message);
    }
}

getConstructorCareerStats('mercedes');
getConstructorCareerStats('ferrari');
