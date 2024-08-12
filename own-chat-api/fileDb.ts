import {promises as fs} from 'fs';
import {randomUUID} from "node:crypto";
import { Message, MessageFromUser } from './types';

const fileName = './db.json';
let data: Message[] = [];

const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      console.error(e);
      data = [];
    }
  },
  async getItems() {
    return data.slice(-30);
  },
  async addItem(item: MessageFromUser) {
    const message: Message = {
      ...item,
      id: randomUUID(),
      datetime: new Date().toISOString(),
    };

    data.push(message);
    await this.save();

    return message;
  },
  async save() {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
  },
};

export default fileDb;