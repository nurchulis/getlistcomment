import { useEffect, useState } from "react";
import {
  emitAllChat,
  initiateSocket,
  joinRoom,
  subscribeToAllChat
} from "./socket";
import "./styles.css";
import { isEmpty } from "lodash";

export default function App() {
  const [comments, setComments] = useState();

  const [totalComment, setTotalComment] = useState();

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  useEffect(() => {
    initiateSocket(
      "eNVAoH5F9CrPVxJafi70", //room id
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjE3OGMwZTM0MzdhZDAwMTBhYzQ2MGMiLCJ1c2VyX2lkIjoiY2RjM2Q0YWItMDNjYS00ZWJiLThhMDUtNTUwMWQ4NzA5NmJhIiwicm9vbV9pZCI6ImVOVkFvSDVGOUNyUFZ4SmFmaTcwIiwiaWF0IjoxNjQ2NDc5MzU0fQ.H5WeIxY9srfrP5eIgacd3DNxcnQXmw6oKNn9a0kHWiQ" //token
    );

    joinRoom({
      sender_id: "cdc3d4ab-03ca-4ebb-8a05-5501d87096ba", //user id
      sender: "Amanda Qotru", //user name
      class_id: undefined
    });

    emitAllChat({
      class_id: undefined,
      per_page: 10,
      page: 1,
      room_id: "eNVAoH5F9CrPVxJafi70" //room id
    });

    subscribeToAllChat((err, payload) => {
      if (err) return;

      setTotalComment(() => payload.total);

      // eslint-disable-next-line consistent-return
      setComments(() => {
        if (!isEmpty(payload.docs)) return [...comments, ...payload.docs];
      });
    });
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
