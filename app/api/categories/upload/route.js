import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import sharp from "sharp";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ message: "No file provided" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "public", "images", "categories");
        await mkdir(uploadDir, { recursive: true });

        // Sanitize and change extension to .webp
        const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9.\-_]/g, "_");
        const filename = `${Date.now()}_${baseName}.webp`;
        const filepath = path.join(uploadDir, filename);

        // Optimize: compress to 300px width/height and format as high compression WEBP
        await sharp(buffer)
            .resize({ width: 800, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(filepath);

        const publicUrl = `/images/categories/${filename}`;
        return NextResponse.json({ message: "Image uploaded and optimized to WebP", url: publicUrl }, { status: 201 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ message: "Upload failed", error: error.message }, { status: 500 });
    }
}
