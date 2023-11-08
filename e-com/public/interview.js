const axios = require('axios');
const fs = require('fs');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const META_GRAPH_API_KEY = '[META GRAPH API KEY]';
const METRICS = 'impressions,cpm,ctr,clicks,amount_spend,purchase,cost_per_purchase';
const SPREADSHEET_ID = '[YOUR_GOOGLE_SHEET_ID]';

// Function to fetch data from the Meta API
async function fetchDataFromMetaAPI() {
  try {
    const response = await axios.get(`https://graph.facebook.com/v12.0/act_[YOUR_AD_ACCOUNT_ID]/insights`, {
      params: {
        access_token: META_GRAPH_API_KEY,
        fields: METRICS,
        time_range: { since: '30 days ago', until: 'today' },
        period: '1 hour',
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching data from Meta API:', error);
    throw error;
  }
}

// Function to store data in a CSV file
function saveDataToCSV(data) {
  const csvHeader = 'Date,Impressions,CPM,CTR,Clicks,Amount Spend,Purchase,Cost Per Purchase\n';
  const csvData = data.map((item) => {
    return `${item.date_start},${item.impressions},${item.cpm},${item.ctr},${item.clicks},${item.amount_spend},${item.purchase},${item.cost_per_purchase}`;
  });

  fs.writeFileSync('meta_data.csv', csvHeader + csvData.join('\n'), 'utf-8');
}

// Function to upload data to Google Sheets
async function uploadDataToGoogleSheets() {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  await doc.useServiceAccountAuth(require('./your-credentials-file.json'));

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const data = fs.readFileSync('meta_data.csv', 'utf-8');
  await sheet.clear();
  await sheet.setHeaderRow(['Date', 'Impressions', 'CPM', 'CTR', 'Clicks', 'Amount Spend', 'Purchase', 'Cost Per Purchase']);
  await sheet.loadCells(`A1:H${data.split('\n').length}`);

  const csvLines = data.split('\n');
  for (let i = 0; i < csvLines.length; i++) {
    const values = csvLines[i].split(',');
    for (let j = 0; j < values.length; j++) {
      sheet.getCell(i, j).value = values[j];
    }
  }

  await sheet.saveUpdatedCells();
}

// Main function to fetch, save, and upload data
async function main() {
  const data = await fetchDataFromMetaAPI();
  saveDataToCSV(data);
  await uploadDataToGoogleSheets();
}

main();
