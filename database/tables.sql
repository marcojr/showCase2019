-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-09-20 11:38:20.245

-- tables
-- Table: GROUP_PROPERTY
CREATE TABLE GROUP_PROPERTY (
    "key" varchar(20)  NOT NULL,
    name varchar(40)  NOT NULL,
    priority int  NOT NULL,
    CONSTRAINT GROUP_PROPERTY_pk PRIMARY KEY  ("key")
);

-- Table: PROPERTY
CREATE TABLE PROPERTY (
    "key" varchar(20)  NOT NULL,
    name varchar(120)  NOT NULL,
    dataType char(1)  NOT NULL,
    priority int  NOT NULL,
    flagReadOnly bit  NOT NULL,
    regexValidation varchar(128)  NULL,
    enum varchar(4096)  NULL,
    minLength int  NULL,
    maxLength int  NULL,
    decimals int  NULL,
    minValue int  NULL,
    maxValue int  NULL,
    GROUP_PROPERTY_key varchar(20)  NOT NULL,
    CONSTRAINT PROPERTY_pk PRIMARY KEY  ("key")
);

-- Table: SYS_INVALID_SESSION
CREATE TABLE SYS_INVALID_SESSION (
    token varchar(512)  NOT NULL,
    expiresOn datetime  NOT NULL,
    CONSTRAINT SYS_INVALID_SESSION_pk PRIMARY KEY  (token)
);

-- Table: SYS_LOG
CREATE TABLE SYS_LOG (
    id int  NOT NULL IDENTITY,
    type varchar(12)  NOT NULL,
    timestamp datetime  NOT NULL DEFAULT getdate(),
    description varchar(1024)  NOT NULL,
    origin varchar(120)  NOT NULL,
    deviceProperties varchar(512)  NOT NULL,
    IP_ADDRESS varchar(15)  NOT NULL,
    USER_id uniqueidentifier  NOT NULL,
    CONSTRAINT SYS_LOG_pk PRIMARY KEY  (id)
);

-- Table: SYS_VERIFY
CREATE TABLE SYS_VERIFY (
    code varchar(32)  NOT NULL,
    expiresOn datetime  NOT NULL,
    id int  NOT NULL IDENTITY,
    status char(3)  NOT NULL,
    target varchar(120)  NOT NULL,
    USER_id uniqueidentifier  NOT NULL,
    CONSTRAINT SYS_VERIFY_pk PRIMARY KEY  (id)
);

-- Table: USER
CREATE TABLE "USER" (
    id uniqueidentifier  NOT NULL DEFAULT NEWID(),
    oauth2Id varchar(64)  NULL,
    firstName varchar(50)  NULL,
    lastName varchar(50)  NULL,
    displayName varchar(100)  NULL,
    password char(32)  NULL,
    createdOn datetime  NOT NULL DEFAULT getdate(),
    phone varchar(50)  NULL,
    email varchar(120)  NULL,
    gender char(1)  NULL,
    dob date  NULL,
    picture varchar(256)  NULL,
    loginProvider char(3)  NOT NULL,
    CONSTRAINT USER_pk PRIMARY KEY  (id)
);

-- Table: USER_PROPERTY
CREATE TABLE USER_PROPERTY (
    USER_id uniqueidentifier  NOT NULL,
    value varchar(4096)  NOT NULL,
    PROPERTY_key varchar(20)  NOT NULL,
    CONSTRAINT USER_PROPERTY_pk PRIMARY KEY  (USER_id)
);

-- foreign keys
-- Reference: PROPERTY_GROUP_PROPERTY (table: PROPERTY)
ALTER TABLE PROPERTY ADD CONSTRAINT PROPERTY_GROUP_PROPERTY
    FOREIGN KEY (GROUP_PROPERTY_key)
    REFERENCES GROUP_PROPERTY ("key");

-- Reference: SYS_LOG_USER (table: SYS_LOG)
ALTER TABLE SYS_LOG ADD CONSTRAINT SYS_LOG_USER
    FOREIGN KEY (USER_id)
    REFERENCES "USER" (id);

-- Reference: SYS_VERIFY_USER (table: SYS_VERIFY)
ALTER TABLE SYS_VERIFY ADD CONSTRAINT SYS_VERIFY_USER
    FOREIGN KEY (USER_id)
    REFERENCES "USER" (id);

-- Reference: USER_PROPERTY_PROPERTY (table: USER_PROPERTY)
ALTER TABLE USER_PROPERTY ADD CONSTRAINT USER_PROPERTY_PROPERTY
    FOREIGN KEY (PROPERTY_key)
    REFERENCES PROPERTY ("key");

-- Reference: USER_PROPERTY_USER (table: USER_PROPERTY)
ALTER TABLE USER_PROPERTY ADD CONSTRAINT USER_PROPERTY_USER
    FOREIGN KEY (USER_id)
    REFERENCES "USER" (id);

-- End of file.

