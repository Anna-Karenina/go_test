const Math = require("mathjs");
const fs = require("node:fs/promises");

const actions = [
  "logged in",
  "logged out",
  "create record",
  "delete record",
  "update record",
];

class LogItem {
  action;
  timestamp;
  constructor(timestamp, action) {
    this.action = action;
    this.timestamp = timestamp;
  }
}

class User {
  id;
  email;
  logs;
  constructor(id, email, logs) {
    this.id = id;
    this.email = email;
    this.logs = logs;
  }
}

const main = async () => {
  console.time("test");
  try {
    const users = generateUsers(1000);
    for (let i = 0; i < users.length; i++) {
      await saveUserInfo(users[i]);
    }
  } catch (error) {
    console.log(error);
  }

  console.timeEnd("test");
};

const generateUsers = (count) => {
  let users = [];
  for (let i = 0; i < count; i++) {
    const u = new User(
      i + 1,
      `user${i + 1}@ninga.go`,
      generateLogs(Math.random() * 1000)
    );
    users.push(u);
  }
  return users;
};

const generateLogs = (count) => {
  let logs = [];

  for (let i = 0; i < count; i++) {
    let log = new LogItem(Date.now(), actions[Math.ceil(Math.random() * 4)]);
    logs.push(log);
  }
  return logs;
};

const saveUserInfo = async (user) => {
  try {
    await fs.writeFile(`logs/uid_${user.id}`, getActivityInfo(user));
  } catch (error) {
    console.log(error);
  }
};

const getActivityInfo = (user) => {
  let out = `ID: ${user.id} | Email: ${user.email}\nActivity log:\n`;
  for (let i = 0; i < user.logs.length; i++) {
    out += `%d. [${user.logs[i].action}] at ${user.logs[i].timestamp}\n`;
  }
  return out;
  //thats method coast +200ms strings more effective in that case
  // let out = [`ID: ${user.id} | Email: ${user.email}\nActivity log:\n`];
  // for (let i = 0; i < user.logs.length; i++) {
  //   out.push(`%d. [${user.logs[i].action}] at ${user.logs[i].timestamp}\n`)
  // }
  // return out.join();
};

main()
  .then((a) => console.log(a))
  .catch((e) => console.log(e));
