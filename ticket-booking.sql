CREATE TABLE event (
    eventID INTEGER AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL UNIQUE,
    event_location VARCHAR(255),
    vip_ticket_price DECIMAL NOT NULL,
    regular_ticket_price DECIMAL NOT NULL,
    max_attendees INTEGER,
    event_desc VARCHAR(255)
);