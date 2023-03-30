import { EnumTypeMessageInLocal, TypedChatHistory } from "models/chat.model";
import { openDatabase } from "react-native-sqlite-storage";

export function getTableNameForRoomChat(roomID: string): string {
  return `${TABLE_CHAT_ROOM}_${roomID}`
}

export async function insertMessages(messages: TypedChatHistory[], tableNameMessage: string) {
  try {
    await createTableChatRoom(tableNameMessage).then(() => {
      DB.transaction(function (tx) {
        messages.map(async (message) => {
          if (!message.system) {
            tx.executeSql(`SELECT COUNT(id) as count FROM ${tableNameMessage} WHERE id = '${message._id}'`, [], (tx, results) => {
              if (results.rows.item(0).count == 0) {
                tx.executeSql(`INSERT INTO ${tableNameMessage} (id, type, message) VALUES (?,?,?)`,
                  [message._id, EnumTypeMessageInLocal.Message, JSON.stringify(message)]);
              }
            })

          }
        })
      }, function (error) {
        console.log(`Insert ${tableNameMessage} ERROR: ${error.message}`);
      }, function () {
        console.log(`Insert ${tableNameMessage} SUCCESS`);
      });
    });
  } catch (error) {
  }
}

export async function getMessageOfRoom(tableNameMessage: string, typeMessage: EnumTypeMessageInLocal, idLastMessage?: string | number): Promise<TypedChatHistory[]> {
  return new Promise((resolve, reject) => {
    try {
      DB.transaction(async (tx) => {
        await tx.executeSql(`SELECT * FROM ${tableNameMessage} WHERE type = '${typeMessage}'${idLastMessage ? ` AND id < ${idLastMessage}` : ""} ORDER BY id DESC LIMIT 20`, [], (tx, results) => {
          let messages: TypedChatHistory[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            try {
              let message: TypedChatHistory = JSON.parse(results.rows.item(i).message);
              messages = [...messages, message]
            } catch (error) {
              console.log(error)
            }
          }
          resolve(messages);
        });
      }, function (error) {
        console.log(`Get message ${tableNameMessage} ERROR: ${error.message}`);
        reject(error)
      }, function () {
        console.log(`Get message ${tableNameMessage} SUCCESS`);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function getCountMessageOfRoom(tableNameMessage: string, typeMessage: EnumTypeMessageInLocal): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      DB.transaction(async (tx) => {
        await tx.executeSql(`SELECT COUNT(id) as count FROM ${tableNameMessage} WHERE type = '${typeMessage}'`, [], (tx, results) => {
          resolve(results.rows.item(0).count || 0);
        });
      }, function (error) {
        console.log(`Get count message ${tableNameMessage} ERROR: ${error.message}`);
        reject(error)
      }, function () {
        console.log(`Get count message ${tableNameMessage} SUCCESS`);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function getLastMessageOfRoom(tableNameMessage: string, typeMessage: EnumTypeMessageInLocal): Promise<TypedChatHistory[]> {
  return new Promise((resolve, reject) => {
    try {
      DB.transaction(async (tx) => {
        await tx.executeSql(`SELECT * FROM ${tableNameMessage} WHERE type = '${typeMessage}' ORDER BY id DESC LIMIT 1`, [], (tx, results) => {
          let messages: TypedChatHistory[] = []
          for (let i = 0; i < results.rows.length; i++) {
            try {
              let message: TypedChatHistory = JSON.parse(results.rows.item(i).message);
              messages = [...messages, message]
            } catch (error) {
              console.log(error)
            }
          }
          resolve(messages);
        });
      }, function (error) {
        console.log(`Get last message of room ${tableNameMessage} ERROR: ${error.message}`);
        reject(error)
      }, function () {
        console.log(`Get last message of room ${tableNameMessage} SUCCESS`);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function getMessagesOfRoomPerPage(tableNameMessage: string, idLastMessage?: string): Promise<TypedChatHistory[]> {
  return new Promise((resolve, reject) => {
    try {
      DB.transaction((tx) => {
        tx.executeSql(`SELECT * FROM ${tableNameMessage} WHERE type = '${EnumTypeMessageInLocal.Message}' ${idLastMessage ? ` AND id < '${idLastMessage}'` : ""} ORDER BY id DESC LIMIT 20`, [], (tx, results) => {
          let messages: TypedChatHistory[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            try {
              let message: TypedChatHistory = JSON.parse(results.rows.item(i).message);
              messages = [...messages, message]
            } catch (error) {
              console.log(error)
            }
          }
          resolve(messages);
        })

      }, function (error) {
        console.log(`Get message ${tableNameMessage} ERROR: ${error.message}`);
        reject(error)
      }, function () {
        console.log(`Get message ${tableNameMessage} from ${idLastMessage} SUCCESS`);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export const DB = openDatabase({
  name: "ai_chat.db",
  location: "default",
  createFromLocation: 2
}, () => console.log("Open DB success"), (error) => console.log("Open DB error: ", error));

/**
 * Table for sqlite
 */
export const TABLE_CHAT_ROOM = "CHAT_ROOM";
export const TABLE_NOTIFICATION = "TABLE_NOTIFICATION";
export const TABLE_LIST_CHAT = "TABLE_LIST_CHAT";

export async function createDB() {
  return new Promise((resolve, reject) => {
    DB.transaction(function (tx) {
      tx.executeSql("CREATE TABLE IF NOT EXISTS " + TABLE_LIST_CHAT + " (id, user_id, chat_room_data)");
    }, function (error) {
      console.log("Populated database ERROR: " + error.message);
    }, function () {
      console.log("Populated database OK");
    });
  });
}

export async function createTableChatRoom(tableName: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    DB.transaction(function (tx) {
      tx.executeSql("CREATE TABLE IF NOT EXISTS " + tableName + " (id, type, message)");
      resolve(true)
    }, function (error) {
      console.log("createTableChatRoom ERROR: " + tableName + " " + error.message);
      resolve(false)
    }, function () {
      console.log("createTableChatRoom OK " + tableName);
      resolve(true)
    });
  });
}

export async function deleteDataTable(tableName: string) {
  return new Promise((resolve, reject) => {
    DB.transaction(function (tx) {
      tx.executeSql("DROP TABLE IF EXISTS " + tableName);
      return true
    }, function (error) {
      console.log("DELETE ERROR: " + tableName + " " + error.message);
      resolve(false);
    }, function () {
      console.log("DELETE OK " + tableName);
      resolve(true);
    });
  });
}

export async function clearDB() {
  await DB.transaction(async (tx) => {
    await tx.executeSql(`SELECT name FROM sqlite_master WHERE type='table'`, [], async (tx, results) => {
      try {
        for (let i = 0; i < results.rows.length; i++) {
          let table = results.rows.item(i);
          await tx.executeSql("DROP TABLE IF EXISTS " + table?.name);
        }
      } catch (error) {
        console.log(error, "delete table")
      }
    });
  }, function (error) {
    console.log(`Drop table ERROR: ${error.message}`);
  }, function () {
    console.log(`Drop table SUCCESS`);
  });

  createDB().catch((error) => console.log(error, "re-create DB error"));
}

export async function checkTableIsExists(tableNameNeedCheck: string): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    await DB.transaction(async (tx) => {
      await tx.executeSql(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableNameNeedCheck}'`, [], async (tx, results) => {
        resolve(results.rows.length > 0);
      });
    }, function (error) {
      console.log(`checkTableIsExists table ERROR: ${error.message}`);
      resolve(false);
    });
  })
}
