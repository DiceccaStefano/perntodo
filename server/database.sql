CREATE DATABASE completeexpenses2;

CREATE TABLE expenses(
    expenses_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    price float 

);

select *
from expenses