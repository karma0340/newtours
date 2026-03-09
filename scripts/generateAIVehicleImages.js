import fs from 'fs';
import path from 'path';

const vehicles = [
    {
        name: "toyota_innova_crysta",
        prompt: "A high-quality 4k cinematic photograph of a clean, premium white Toyota Innova Crysta parked on a scenic Himalayan mountain road. Bright sunny day, sharp focus, professional car photography style."
    },
    {
        name: "luxury_volvo_tourist_bus",
        prompt: "A beautiful cinematic shot of a modern, sleek luxury Volvo tourist bus traveling on an Indian highway connecting to the mountains. Premium, travel, comfortable journey, highly detailed."
    },
    {
        name: "force_tempo_traveler",
        prompt: "A high-resolution photograph of an Indian Force Tempo Traveler parked against a stunning backdrop of the Himalayas. Clean, comfortable road trip van, bright lighting, photorealistic."
    },
    {
        name: "mahindra_scorpio_n",
        prompt: "An action shot of a black Mahindra Scorpio N SUV driving on a rugged mountain terrain. Adventurous, off-road capable, dusty trail, dramatic landscape, professional car photography, 8k resolution."
    },
    {
        name: "traveller_urbania",
        prompt: "A sleek, cinematic high-resolution photograph of an Indian Force Traveller Urbania premium tourist van parked in a beautiful hill station setting. Clean, luxurious travel vehicle."
    }
];

const outputDir = path.join(process.cwd(), "ai_vehicle_images");
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadImages() {
    console.log("Starting AI Image Generation via Pollinations.ai for Vehicles...");
    for (const vehicle of vehicles) {
        const filePath = path.join(outputDir, `${vehicle.name}.jpg`);
        if (fs.existsSync(filePath)) {
            console.log(`⏩ Skipping ${vehicle.name}, already exists.`);
            continue;
        }
        
        console.log(`Generating AI image for: ${vehicle.name}...`);
        
        // using pollinations AI image API with high quality settings
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(vehicle.prompt)}?width=1200&height=800&nologo=true&model=flux`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error(`Failed to download ${vehicle.name}: ${response.statusText}`);
                continue;
            }
            const buffer = Buffer.from(await response.arrayBuffer());
            const filePath = path.join(outputDir, `${vehicle.name}.jpg`);
            fs.writeFileSync(filePath, buffer);
            console.log(`✅ Saved: ${filePath}`);
        } catch (error) {
            console.error(`❌ Error with ${vehicle.name}:`, error.message);
        }
        
        // Wait 3 seconds between requests to be polite to the AI image API
        await new Promise(r => setTimeout(r, 3000));
    }
    console.log("🎉 All AI Vehicle images successfully generated and saved to your local 'ai_vehicle_images' folder!");
}

downloadImages();
