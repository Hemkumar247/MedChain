import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import { analyzeMedicineImage } from './gemini.js';
import { triggerCounterfeitFlag } from './contractService.js';

const app = express();
app.use(cors());
app.use(express.json());

// Set up temporary image storage for uploads
const upload = multer({ dest: 'uploads/' });

app.post('/api/verify', upload.single('medicineImage'), async (req, res) => {
    const { batchId } = req.body;
    const file = req.file;

    if (!file || !batchId) {
        return res.status(400).json({ error: "Missing image or batch ID" });
    }

    try {
        // 1. Send image to Gemini
        const aiResult = await analyzeMedicineImage(file.path);
        
        // 2. If AI says it is fake, write to Polygon blockchain
        let blockchainUpdated = false;
        if (aiResult.isAuthentic === false) {
            blockchainUpdated = await triggerCounterfeitFlag(batchId);
        }

        // 3. Clean up the uploaded file
        fs.unlinkSync(file.path);

        // 4. Return the full payload to the React frontend
        res.json({
            batchId: batchId,
            aiAnalysis: aiResult,
            flaggedOnChain: blockchainUpdated
        });

    } catch (error) {
        res.status(500).json({ error: "Verification process failed." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`MedChain AI Server running on port ${PORT}`));
