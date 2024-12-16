const express = require('express');
const cors = require('cors')
const {Sequelize, DataTypes, Model } = require('sequelize');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',  // Replace with your frontend URL
    methods: ['GET', 'POST'],                // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
    credentials: true,  // Allow credentials (cookies, headers, etc.)
  }));

const sequelize = new Sequelize('postgresql://neondb_owner:yUB9nz0uAIOG@ep-gentle-block-a547t0q0.us-east-2.aws.neon.tech/neondb?sslmode=require')

app.options('*', (req, res) => {
    res.sendStatus(200);
});



app.use(express.json());

class User extends Model { }
User.init(
    {
        userID: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        profileIMG: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        modelName: 'User',
    }
);

class Announcement extends Model { }
Announcement.init(
    {
        text: {
            type: DataTypes.STRING,
        },
        userID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Announcement',
    }
    
)

User.hasMany(Announcement, {
    foreignKey: 'userID',
    as: 'announcement'
})

Announcement.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
})

const syncModels = async () => {
    try {
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
};

syncModels();

app.post('/api/Users', async (req, res) => {
    try {
        const { userID, name, email, profileIMG } = req.body;
        const user = await User.create({ userID, name, email, profileIMG });
        res.json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/Users/:userID', async (req, res) => {
    try {
        const specificUser = await User.findOne({
            where: {
                userID: req.params.userID
            }
        });

        if (specificUser) {
            res.json(specificUser);
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/Announcement', async (req, res) => {
    try {
        const {text, userID} = req.body;
        const announcement = await Announcement.create({text, userID})
        res.status(201).json(announcement);  
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

app.get('/api/Announcement/:userID', async (req, res) => {
    try{
        const specificUserAnnouncements = await Announcement.findAll({
            where: {
                userID: req.params.userID
            }
        });

        if (specificUserAnnouncements) {
            res.json({ announcements: specificUserAnnouncements})
        } else {
            res.status(404).json({message: 'Announcements Not Found'})
        }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})

app.post('/api/Announcement/delete/:userID', async (req, res) => {
    try {
        const { id } = req.body;
        const AnnouncementToDelete = await Announcement.destroy({
            where: {
                userID: req.params.userID,
                id: id
            }
        })

        res.json({
            message: 'Announcement successfully removed.'
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});