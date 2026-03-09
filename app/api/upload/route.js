import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import sharp from "sharp";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Remove old extension and append .webp
        const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/\s+/g, "_");
        const filename = `${Date.now()}_${baseName}.webp`;
        const uploadPath = path.join(process.cwd(), "public", "uploads", filename);

        // Optimize and save as WebP
        await sharp(buffer)
            .resize({ width: 1200, withoutEnlargement: true }) // Prevent upscaling
            .webp({ quality: 80 }) // 80% quality heavily reduces size without visible loss
            .toFile(uploadPath);

        return NextResponse.json({ 
            message: "Upload successful", 
            url: `/uploads/${filename}` 
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ message: "Upload failed", error: error.message }, { status: 500 });
    }
}
