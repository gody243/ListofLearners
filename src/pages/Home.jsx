import { useEffect, useState } from "react";
import { db } from "../../src/index";
import LearnerDetails from "../components/LearnerDetails";
import { ListGroup } from "react-bootstrap";
function Home() {
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(0);
  const [posts, setPosts] = useState([]);
  const [average, setAverage] = useState();

  useEffect(() => {
    const getPostsFromFirebase = [];
    db.collection("learners").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({ ...doc.data(), id: doc.id });
      });
      setPosts(getPostsFromFirebase);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const averageScore = (
      posts.reduce((acc, post) => acc + +post.score, 0) / posts.length
    ).toPrecision(3);
    setAverage(averageScore);
    return () => {};
  }, [posts]);

  if (loading) {
    return <h1>Loading firebase data...</h1>;
  }

  return (
    <main>
      <h1>List of Learners</h1>
      <h4>Average score : {average}</h4>
      <ListGroup>
        {posts.length > 0 ? (
          posts.map((post) => (
            <ListGroup.Item
              key={post.id}
              onClick={() => {
                setSelectedUser(post.id);
              }}
            >
              <span>{post.firstname}</span>
              {selectedUser === post.id && <LearnerDetails learner={post} />}
            </ListGroup.Item>
          ))
        ) : (
          <p>No New learner yet</p>
        )}
      </ListGroup>
    </main>
  );
}
export default Home;
