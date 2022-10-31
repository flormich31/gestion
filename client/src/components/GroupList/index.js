import * as React from "react";
import axios from "axios";

function AxiosData() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    var config = {
      method: "get",
      url: "http://localhost:9000/groups",
      headers: {},
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
        setPost(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h3>{post.name}</h3>
      <p>{post.code}</p>
    </div>
  );
}
export default AxiosData;
