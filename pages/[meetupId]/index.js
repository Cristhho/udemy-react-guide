import MeetupItem from "../../components/meetups/MeetupItem";

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  return {
    props:{
      meetupData: {
        id: meetupId,
        image: 'https://www.mazda.com.ec/hubfs/MAZDA/Menu%20Mazda/Mazda%202/mazda_2.png',
        title: 'Mazda 2',
        address: 'Japón'
      }
    }
  }
}

export const getStaticPaths = () => {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1'
        }
      },
      {
        params: {
          meetupId: 'm2'
        }
      },
    ]
  }
}

const MeetupDetailPage = (props) => {
  return (
    <MeetupItem
      id={props.meetupData.id}
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
    />
  );
}

export default MeetupDetailPage;
