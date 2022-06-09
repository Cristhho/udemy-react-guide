import { MongoClient } from 'mongodb';
import Head from 'next/head';

import MeetupList from "../components/meetups/MeetupList";

export const getStaticProps = async () => {
  const connectionURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gq1wj.mongodb.net/meetups?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionURL);
  const db = client.db();
  
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props:{
      data: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image
      }))
    }
  }
}

const HomePage = (props) => {
  return(
  <>
    <Head>
      <title>React Meetups</title>
      <meta name='description' content='Browse a huge list of highly active React Meetup' />
    </Head>
    <MeetupList meetups={props.data} />
  </>
  );
}

export default HomePage;
