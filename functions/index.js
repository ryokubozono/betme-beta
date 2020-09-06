const admin = require('firebase-admin');
admin.initializeApp();

const functions = {
  sendMail: './src/sendMail',
};

loadFunctions = (funcs) => {
  for (let name in funcs) {
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === name) {
      exports[name] = require(funcs[name]);
    }
  }
};

loadFunctions(functions);