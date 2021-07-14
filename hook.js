const { google } = require("googleapis");

const User = (name, lastName, email, company, department, title, userName) => {
  return { name, lastName, email, company, department, title, userName };
};

const VALUE_ENUM = {
  name: 0,
  lastName: 1,
  email: 2,
  company: 3,
  department: 4,
  title: 5,
  userName: 6,
};

async function getSpreadSheet() {
  console.log("Connecting to Google Spreadsheet...");
  try {
    const sheets = google.sheets({
      version: "v4",
    });
    const request = {
      // The spreadsheet to request.
      spreadsheetId: process.env.SPREADSHEET_ID,
      ranges: [],
      includeGridData: true,
      auth: process.env.GOOGLE_ACCESS_TOKEN,
    };
    const response = (await sheets.spreadsheets.get(request)).data;
    return response;
  } catch (error) {
    console.log("Unable to connect to spreadsheet");
    throw error;
  }
}

async function getValidUsers() {
  let users = [];
  try {
    const spreadSheetResponse = await getSpreadSheet();

    // Remove Header row
    spreadSheetResponse.sheets[0].data[0].rowData.splice(0, 1);
    spreadSheetResponse.sheets[0].data[0].rowData.forEach((row) => {
      let user = User();
      Object.getOwnPropertyNames(user).forEach((key) => {
        user[key] = row.values[VALUE_ENUM[key]].effectiveValue.stringValue;
      });
      users.push(user);
    });
    console.log("Retrieved " + users.length + " users from spreadsheet");
    return users;
  } catch (error) {
    throw error;
  }
}

exports.handler = async (context) => {
  const users = await getValidUsers();
  const [userFound] = users.filter(
    (x) => x.userName == context.user_identifier
  );
  if (userFound) {
    console.log('User "' + userFound.email + '" was found in spreadsheet');
    return {
      success: true,
      user: {
        username: context.user_identifier,
        password: context.password,
        firstname: userFound.name,
        lastname: userFound.lastName,
        email: userFound.email,
        company: userFound.company,
        department: userFound.department,
        title: userFound.title
      },
    };
  } else {
    console.log(
      " User " + context.user_identifier + " was not found in spreadsheet"
    );
    return {
      success: false,
      user: {},
    };
  }
};