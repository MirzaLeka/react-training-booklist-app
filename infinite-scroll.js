import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import './App.css';

function App() {

  const [items, setItems] = useState([]);

  const [hasMore, sethasMore] = useState(true);

  const [page, setpage] = useState(2);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=20`
      );
      const data = await res.json();
      console.log('original data :>> ', data.data);
      setItems(data.data);
    };

    getComments();
  }, []);

  const fetchComments = async () => {
    const res = await fetch(
     `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
    );
    const data = await res.json();
    console.log('data :>> ', data.data);
    return data.data;
  };

  const fetchData = async () => {
    console.log('call next....')
    const commentsFormServer = await fetchComments();

    setItems([...items, ...commentsFormServer]);
    if (commentsFormServer.length === 0 || commentsFormServer.length < 20) {
      sethasMore(false);
    }
    setpage(page + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
      <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      loader={'gonna load moar....'}
      endMessage={'no more'}
    >
      <div className="container">
        <div className="row m-2">
          {items && items.map((item) => {
            return <div key={item.id}>{item.attributes.title}</div>;
          })}
        </div>
      </div>
    </InfiniteScroll>
      </header>
    </div>
  );
}

export default App;
