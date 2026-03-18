import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Define Schema locally if we encounter import issues due to module type settings
const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, default: "Hike The Himalaya Team" },
    published: { type: Boolean, default: true },
    readTime: { type: String, default: "5 min" },
    tags: [{ type: String }],
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: [{ type: String }]
}, { timestamps: true });

const Blog = mongoose.models?.Blog || mongoose.model("Blog", BlogSchema);

const htmlContent = `
<p>Himachal Pradesh is the undisputed trekking capital of India. While popular routes like Triund, Kheerganga, and Hampta Pass attract thousands of adventurers every year, true explorers often seek solitude. If you want to experience the majestic mountains without the crowds, here are five incredible, offbeat treks hidden deep within the Himalayas.</p>

<h3>1. Kareri Lake Trek</h3>
<p>Nestled in the Dhauladhar range of the Kangra district, the Kareri Lake Trek is a stunning route that leads you through dense pine forests and over traditional shepherd trails. The shallow, high-altitude freshwater lake is snowmelt from the Mankiani Peak, making the water crystal clear.</p>

<h3>2. Miyar Valley Trek</h3>
<p>Often called the Yosemite of the Himalayas, the Miyar Valley in the Lahaul and Spiti district is vast, green, and completely breathtaking. It's a relatively moderate trek that transitions from lush greenery and blooming alpine flowers to rocky moraines and massive glaciers.</p>

<h3>3. Bhrigu Lake Trek</h3>
<p>Even though this trek is easily accessible from Manali, it remains astonishingly quiet for most of the year. The highlight of the Bhrigu Lake Trek is that you climb to an altitude of 14,000 ft in just a couple of days, where Alpine meadows expand endlessly before your eyes.</p>

<h3>4. Prashar Lake Trek</h3>
<p>Surrounded by the Dhauladhar ranges in the Kullu Valley, Prashar Lake is famous for its floating circular island. The trek, accessible year-round, winds through thick forests and small rivulets. A three-story pagoda-like temple dedicated to the sage Prashar sits beside the lake, adding deep spiritual wonder to the hike.</p>

<h3>5. Buran Ghati Trek</h3>
<p>Tucked away in the Pabbar Valley, the Buran Ghati trek offers arguably the most thrilling pass-crossing experience. You'll rappel down a vertical wall of snow, walk through dense ancient forests, and camp in vast meadows dotted with wildflowers.</p>

<p><em>Your adventure begins where the road ends. If you are ready to tackle one of these pristine trails, the experts at <strong>Hike The Himalaya</strong> are here to design your guided expedition!</em></p>
`;

async function seed() {
    try {
        console.log("Connecting to Database...");
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error("No MONGODB_URI in environment variables.");
        await mongoose.connect(uri);
        console.log("Connected locally.");

        console.log("Creating blog post...");
        await Blog.updateOne(
            { slug: '5-hidden-treks-in-himachal-pradesh' },
            {
                title: "5 Hidden Treks in Himachal Pradesh You Need to Experience",
                slug: "5-hidden-treks-in-himachal-pradesh",
                content: htmlContent,
                excerpt: "Looking for offbeat adventures in the Himalayas? Discover the top 5 hidden and pristine trekking routes in Himachal Pradesh for a peaceful, crowd-free journey.",
                image: "/images/hero/tour-hero.jpg", // default or fallback image
                author: "Hike The Himalaya Team",
                published: true,
                readTime: "4 min",
                tags: ["Trekking", "Himachal", "Offbeat", "Adventure"],
                seoTitle: "Top 5 Hidden Treks in Himachal Pradesh | Hike The Himalaya",
                seoDescription: "Looking for offbeat adventures in the Himalayas? Discover the top 5 hidden and pristine trekking routes in Himachal Pradesh for a peaceful, crowd-free journey.",
                seoKeywords: ["hidden treks himachal", "offbeat treks in india", "himalayan trekking routes", "peaceful treks himachal pradesh", "hike the himalaya"]
            },
            { upsert: true }
        );

        console.log("Blog successfully created!");
    } catch (err) {
        console.error("Error seeding:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

seed();
