const accountEntity = require("../entities/account.entity");

async function createAccountProfile(data) {
  const dataResponse = await accountEntity.create(data).catch(e=>{
    console.error("SERVICE ACCOUNT PROFILE: cant create account profile",e);
    return null;
  });
  return dataResponse;
}

module.exports = createAccountProfile;
