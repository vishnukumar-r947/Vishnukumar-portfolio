const { MongoClient } = require("mongodb");

let client;

exports.handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    try {
        const { name, email, message } = JSON.parse(event.body);

        // Validate form data
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Name, email and message are required",
                }),
            };
        }

        // Connect to MongoDB
        if (!client) {
            client = new MongoClient(process.env.MONGODB_URI);
            await client.connect();
        }

        const database = client.db("portfolioDB");
        const contacts = database.collection("contacts");

        // Save visitor's message
        await contacts.insertOne({
            name,
            email,
            message,
            createdAt: new Date(),
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: "Message sent successfully!",
            }),
        };
    } catch (error) {
        console.error("Contact form error:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: "Something went wrong.",
            }),
        };
    }
};