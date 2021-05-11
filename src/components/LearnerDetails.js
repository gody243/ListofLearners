// import {useEffect,useState} from 'react'
// import UpdateLearners from '../pages/Home'
// import {db} from '../../src/index'
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function LearnerDetails(props) {
  const history = useHistory();

  const onUpdate = () => {
    console.log(history);
    history.push(`/update/${props.learner.id}`);
  };

  return (
    <section>
      <ul>
        <li>firstName :{props.learner.firstname}</li>
        <li>lastName :{props.learner.lastname}</li>
        <li>email :{props.learner.email}</li>
        <li>score :{props.learner.score}</li>
      </ul>
      <Button variant="secondary" onClick={onUpdate}>
        Update
      </Button>
    </section>
  );
}
