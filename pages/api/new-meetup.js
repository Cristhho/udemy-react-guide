import { MongoClient } from 'mongodb';

const connectionURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gq1wj.mongodb.net/meetups?retryWrites=true&w=majority`;

export default async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect(connectionURL);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({
      mssg: 'Meetup created'
    });
  }
}