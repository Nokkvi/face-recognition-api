BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Jessie', 'jessie@gmail.com', 5, '2018-01-01');
INSERT into login (hash, email) values('$2a$10$jRDeFbx6fXdmtV2sEB5euee3sq7X1G7dUCEOEm9mtaW.yHGWvcw5e', 'jessie@gmail.com');


COMMIT;