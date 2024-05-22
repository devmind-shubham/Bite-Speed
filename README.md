
# Bitespeed Backend Task: Identity Reconciliation 

Bitespeed needs a way to identify and keep track of a customer's identity across multiple purchases.


## Application is hosted on RENDER.COM

- base url - [https://bitespeed-ly36.onrender.com](https://bitespeed-ly36.onrender.com)
- identify endpoint url - [https://bitespeed-ly36.onrender.com/api/contact/identify](https://bitespeed-ly36.onrender.com/api/contact/identify)

⚠️ **Note** : The server will remain live until **August 15, 2024**. After this date, the subscription will expire, and the server may become inaccessible.
## API Reference

```http
  POST https://bitespeed-ly36.onrender.com/api/contact/identify
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | Email address of the customer. |
| `phoneNumber` | `number` | Phone number of the customer. |

**Payload**
```bash
{
    "email":"lorraine@hillvalley.edu",
    "phoneNumber":"717171"
}
```

Returns an HTTP 200 response with a JSON payload containing the consolidated contact.

```bash
  {
	"contact":{
		"primaryContatctId": 1,
		"emails": ["lorraine@hillvalley.edu"], // first element being email of primary contact 
		"phoneNumbers": ["717171"], // first element being phoneNumber of priary contact
		"secondaryContactIds": [] // Array of all Contact IDs that are "seondary" to the primary contact
	 }
  }
```
## Installation

#### Prerequisites
- Node.js installed
- A local or remote MySQL database

#### 1. Clone the repository to your local machine:

```bash
  git clone https://github.com/devmind-shubham/Bite-Speed.git
```

#### 2. Navigate to the project directory:

```bash
  cd <repository-name>
```

#### 3. Install the dependencies:

```bash
  npm install
```

#### 4. Configuration
- Create a **.env.prod** file in the root directory of the project.
- To run this project, you will need to add the following environment variables to your **.env.prod** file:

`DB_SERVER=<database_server>`

`DB_USER=<database_user>`

`DB_PASSWORD=<database_password>`

`DB_NAME=<database_name>`

Replace <database_server>, <database_user>, <database_password>, and <database_name> with the appropriate values for your database.

#### 5. Start the application:

```bash
  npm start
```
## Tech stack used

- NodeJS
- MSSQL (Microsoft Azure AQL)
- Render.com (For Hosting)



## Author

- [Shubham Khamkarhatti](https://github.com/devmind-shubham)

