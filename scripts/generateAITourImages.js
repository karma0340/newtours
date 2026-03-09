import fs from 'fs';
import path from 'path';

const tours = [
    {
        name: "manali_solang_valley",
        prompt: "A stunning, cinematic photography, high resolution image of Manali and Solang valley in winter. Snow-capped majestic Himalayan peaks, tall pine trees covered in snow, bright blue skies with sunshine. Cozy cottages in the distance. Wide angle travel photography, golden hour lighting."
    },
    {
        name: "spiti_valley",
        prompt: "A breathtaking landscape photography of Spiti Valley. Cold barren mountain desert, high altitude terrain, clear brilliant blue sky. An ancient Tibetan monastery resting on a mountain ridge. Rugged beauty, cinematic lighting, 8k resolution travel photography."
    },
    {
        name: "shimla_kufri",
        prompt: "A beautiful, vibrant photo of Shimla and Kufri heritage trail. Colonial architecture style buildings on a lush green forested ridge. Mist rolling over the Himalayan foothills. Clear skies, cinematic lighting, premium travel agency aesthetic."
    },
    {
        name: "kasol_kheerganga",
        prompt: "A beautiful vibrant travel photo of Kasol Kheerganga trek. Lush green valley, mountain river, pine forest, hikers walking on a trail. Picturesque natural beauty, bright lighting."
    },
    {
        name: "dharamshala_mcleodganj",
        prompt: "A mesmerizing spiritual photography of Dharamshala McLeod Ganj. Colorful Tibetan prayer flags fluttering in the wind, a Buddhist monastery in the Himalayan mountains, majestic, peaceful aura, golden hour."
    },
    {
        name: "bir_billing",
        prompt: "An exciting action travel photography of Bir Billing paragliding. Multiple colorful paragliders flying in the sky above spectacular green mountains and valleys, sunny weather, clear skies, adventure tourism."
    }
];

const outputDir = path.join(process.cwd(), "ai_tour_images");
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadImages() {
    console.log("Starting AI Image Generation via Pollinations.ai...");
    for (const tour of tours) {
        console.log(`Generating AI image for: ${tour.name}...`);
        // using pollinations free AI image generation API
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(tour.prompt)}?width=1200&height=800&nologo=true`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error(`Failed to download ${tour.name}: ${response.statusText}`);
                continue;
            }
            const buffer = Buffer.from(await response.arrayBuffer());
            const filePath = path.join(outputDir, `${tour.name}.jpg`);
            fs.writeFileSync(filePath, buffer);
            console.log(`✅ Saved: ${filePath}`);
        } catch (error) {
            console.error(`❌ Error with ${tour.name}:`, error.message);
        }
        
        // Wait 2 seconds between requests to be polite to the API
        await new Promise(r => setTimeout(r, 2000));
    }
    console.log("🎉 All AI images successfully generated and saved to your local 'ai_tour_images' folder!");
}

downloadImages();
