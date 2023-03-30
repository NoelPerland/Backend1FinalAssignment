use todo_db;
CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) NOT NULL,
password VARCHAR(50) NOT NULL);
CREATE TABLE Todos (  
todo_id INT NOT NULL AUTO_INCREMENT,  
id INT,  
todo varchar(255),  
completed BOOLEAN,  
PRIMARY KEY ( todo_id ),  
FOREIGN KEY (id) REFERENCES Users(id)  
);
describe users;

select \* from users;  
select \* from todos;
