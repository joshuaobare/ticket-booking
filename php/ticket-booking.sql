create database ticket_booking;
use ticket_booking;

CREATE TABLE event (
    event_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL UNIQUE,
    event_location VARCHAR(255),
    vip_ticket_price DECIMAL NOT NULL,
    regular_ticket_price DECIMAL NOT NULL,
    max_attendees INTEGER,
    event_desc VARCHAR(255),
    date datetime
);

CREATE TABLE user (
    user_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN
);

CREATE TABLE ticketing (
    ticket_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    event_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP (),
    ticket_price DECIMAL NOT NULL,
    ticket_type VARCHAR(50) NOT NULL,
    FOREIGN KEY (event_id)
        REFERENCES event (event_id),
    FOREIGN KEY (user_id)
        REFERENCES user (user_id)
);