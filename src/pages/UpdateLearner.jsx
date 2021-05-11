import { useState, useEffect } from "react";
import { useFirestore } from "reactfire";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const AddLearner = ({ method }) => {
  const history = useHistory();
  const { id } = useParams();
  const collectionRef = useFirestore().collection("learners");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    collectionRef
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        console.log(data);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setEmail(data.email);
        setScore(data.score);
      });
    // eslint-disable-next-line
  }, [id]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    collectionRef
      .doc(id)
      .update({
        firstname,
        lastname,
        email,
        score,
      })
      .then(() => {
        history.push("/");
      });
  };
  return (
    <main>
      <Form onSubmit={onSubmitHandler}>
        <h3>Update Learner</h3>

        <Form.Group controlId="firstname">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            placeholder="FirstName"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="lastname">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            placeholder="LastName"
            required
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="score">
          <Form.Label>Score</Form.Label>

          <Form.Control
            type="number"
            placeholder="Score"
            min="0"
            max="10"
            name="score"
            required
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </main>
  );
};
export default AddLearner;
