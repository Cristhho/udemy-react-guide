import MeetupList from "../components/meetups/MeetupList";

export const getStaticProps = async () => {
  return {
    props:{
      data: []
    }
  }
}

const HomePage = (props) => {
  return <MeetupList meetups={props.data} />
}

export default HomePage;
