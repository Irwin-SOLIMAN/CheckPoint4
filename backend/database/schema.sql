DROP DATABASE IF EXISTS todolistcheckpoint4;

CREATE DATABASE todolistcheckpoint4;

USE todolistcheckpoint4;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, email VARCHAR(150) NOT NULL, hashed_password VARCHAR(255) NOT NULL
);

INSERT INTO
    user (name, email, hashed_password)
VALUES (
        'Irwin', 'irwin@gmail.com', '$argon2id$v=19$m=19456,t=2,p=1$lBtGynNPOZ703BKPgDaojw$RY2la7uA6n69nIUaLaeHZJwEfbYTS1TRWlM5V46W4FQ'
    ),
    (
        'Helene', 'Helene@gmail.com', '$argon2id$v=19$m=19456,t=2,p=1$NMamleRccbSad9JBa5rfDA$7Q/QeusXGFCzUp+9R0jWiTYqXq9r5k8UPlBf0KIEgd4'
    );

CREATE TABLE status (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, description VARCHAR(255) NOT NULL
);

INSERT INTO status (description) VALUES ('todo'), ('wip'), ('done');

CREATE TABLE todolist (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, task VARCHAR(255) NOT NULL, status_id INT NOT NULL DEFAULT 1, user_id INT NOT NULL, CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user (id), deadline DATE NOT NULL, CONSTRAINT fk_status FOREIGN KEY (status_id) REFERENCES status (id)
);

INSERT INTO
    todolist (
        task, status_id, user_id, deadline
    )
VALUES (
        'réaliser une appli fullStack ToDolist', 1, 1, '2024-03-12'
    ),
    (
        'Dancer le mia', 1, 2, '2024-05-15'
    ),
    (
        'Finir le dossier projet', 2, 1, '2024-05-18'
    ),
    (
        'Boire une bière', 3, 1, '2024-02-09'
    );