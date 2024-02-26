import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FullEvent = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const request = await fetch(
          `http://localhost:8080/ticket-booking/php/fetchevent.php?id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const response = await request.json()
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    };
    fetchEvent();
  }, []);
};

export default FullEvent;
