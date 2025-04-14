const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// Initialisation d'Express
const app = express();
const PORT = 3000;

// Middleware pour parser les données JSON
app.use(bodyParser.json());

// Sert les fichiers statiques (HTML, CSS, JS)
app.use(express.static(__dirname));

// Route pour le formulaire de contact
app.post("/contact", (req, res) => {
    console.log("Requête reçue sur /contact"); // Log pour vérifier si la route est atteinte

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("Tous les champs sont requis !");
    }
    console.log("Données reçues :", { name, email, message }); // Log des données


    // Configuration du transporteur pour Nodemailer
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, // Port pour TLS
        secure: false, // true pour 465 (SSL), false pour les autres ports
        auth: {
            user: "ihlaelhonsi@gmail.com", // Remplace par ton email Gmail
            pass: "ynzj aykz kitg uqex", // Remplace par ton mot de passe ou App Password
        },
        tls: {
            rejectUnauthorized: false, // Désactive la vérification du certificat SSL
        },
    });

    // Détails de l'email
    const mailOptions = {
        from: email,
        to: "ihlaelhonsi@gmail.com", // Email de destination
        subject: `Message de ${name} via le formulaire de contact`,
        text: message,
    };
    console.log("Envoi de l'email..."); // Log avant l'envoi


    // Envoie l'email
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Erreur lors de l'envoi de l'email :", err);
            return res.status(500).send("Erreur lors de l'envoi du message.");
        }

        console.log("Email envoyé :", info.response);
        res.send("Votre message a été envoyé avec succès !");
    });
});

// Démarre le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});