// controllers/schoolController.js
const School = require('../models/School');

// Add School Controller
const addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newSchool = { name, address, latitude, longitude };

    School.add(newSchool, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    });
};

// List Schools Controller
const listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    School.list((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        // Calculate the distance between user and each school
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        results.forEach((school) => {
            const schoolLat = parseFloat(school.latitude);
            const schoolLon = parseFloat(school.longitude);

            school.distance = calculateDistance(userLat, userLon, schoolLat, schoolLon);
        });

        // Sort by distance
        results.sort((a, b) => a.distance - b.distance);

        res.json(results);
    });
};

// Function to calculate the distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};

// Helper function to convert degrees to radians
const deg2rad = (deg) => deg * (Math.PI / 180);

module.exports = { addSchool, listSchools };
