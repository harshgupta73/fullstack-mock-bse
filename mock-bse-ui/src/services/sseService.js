const subscribeToEvents = (onMessage) => {

    const eventSource = new EventSource("http://localhost:8080/events");

    eventSource.addEventListener("update", (event) => {

        const data = JSON.parse(event.data);

        onMessage(data);

    });

    eventSource.onerror = () => {

        console.error("SSE connection lost.");

    };

    return eventSource;

};

export default {
    subscribeToEvents
};