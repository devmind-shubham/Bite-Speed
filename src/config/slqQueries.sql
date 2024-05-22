CREATE TABLE contacts (
    id INT PRIMARY KEY IDENTITY(1,1), -- Auto-incrementing primary key
    phoneNumber VARCHAR(20), -- Phone number with a length of up to 20 characters
    email VARCHAR(255), -- Email address with a length of up to 255 characters
    linkedId INT, -- Optional linked contact ID
    linkPrecedence VARCHAR(10) NOT NULL CHECK (linkPrecedence IN ('primary', 'secondary')), -- Link precedence with constraint
    createdAt DATETIME DEFAULT GETDATE() NOT NULL, -- Default current timestamp
    updatedAt DATETIME , -- Update timestamp (user must set this manually)
    deletedAt DATETIME -- Soft delete timestamp
);
