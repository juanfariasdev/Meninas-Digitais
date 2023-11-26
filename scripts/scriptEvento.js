function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyDTyaj6AieLU4siuFiUfTQkKKnpZFFr7jg',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        loadEventoFromGoogleSheet();
    });
}

function loadEventoFromGoogleSheet() {
    const spreadsheetId = '1vzADqzTkra7N4Mv7zAb_r7_Hp1iIhJcnNOw12W02gws'; 
    const sheetName = 'EVENTOS'; 
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: sheetName
    }).then(function (response) {
        const data = response.result.values;

        if (data.length > 0) {
            const eventosContainer = document.getElementById('eventos');
            data.forEach(function (row) {
                const foto = row[0];
                const titulo = row[1];
                const texto = row[2];
                const eventoDiv = document.createElement('div');
                eventoDiv.className = 'col-md-4';
                eventoDiv.innerHTML = `
                    <div class="card">
                        <img src="${foto}" alt="${titulo}" class="img-fluid">
                        <h3>${titulo}</h3>
                        <p>${texto}</p>
                    </div>
                `;
                eventosContainer.appendChild(eventoDiv);
            });
        }
    });
}


gapi.load('client', initGoogleSheetsApi);
 