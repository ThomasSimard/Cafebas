use std::path::{PathBuf};
use std::io::{self, BufWriter};
use std::fs::{self, File};
use image::*;
use std::path::Path;
use webp::*;
use serde_derive::Serialize;

fn get_files(dir_path: String) -> Vec<PathBuf> {
    fs::read_dir(dir_path).expect("failed to read dir")
        .map(|res| res.map(|e| e.path()))
        .collect::<Result<Vec<_>, io::Error>>().expect("failed to collect")
}

fn get_file_name(path_buf: PathBuf) -> Option<String> {
    if let Some(file_name) = path_buf.file_name() {
        if let Some(file_name) = file_name.to_str() {
            return Some(String::from(file_name));
        }
    }

    return None;
}

fn convert_webp(blueprint_path: String, static_path: String, png_path: String) {
    let webp_path = static_path + &png_path.clone();
    // Using `image` crate, open the included .jpg file
    let img = image::open(format!("{}/{}.png", blueprint_path, png_path)).unwrap();
    let (w, h) = img.dimensions();
    // Optionally, resize the existing photo and convert back into DynamicImage
    let size_factor = 1.0;
    let img: DynamicImage = image::DynamicImage::ImageRgba8(imageops::resize(
        &img,
        (w as f64 * size_factor) as u32,
        (h as f64 * size_factor) as u32,
        imageops::FilterType::Triangle,
    ));

    // Create the WebP encoder for the above image
    let encoder: Encoder = Encoder::from_image(&img).unwrap();
    // Encode the image at a specified quality 0-100
    let webp: WebPMemory = encoder.encode(90f32);
    // Define and write the WebP-encoded file to a given path
    let output_path = Path::new(&webp_path).with_extension("webp");
    std::fs::write(&output_path, &*webp).unwrap();
}

#[derive(Default, Serialize)]
struct StaticsJSON {
    number_of_pages: Vec<u8>
}

fn main() {
    const CONTENT_ROOT: &str = "../content_blueprint/";
    const CONTENT_OUT: &str = "../build/content/";

    let mut chapters: Vec<String> = Vec::new();

    let mut statics_json = StaticsJSON::default();

    for entry in get_files(CONTENT_ROOT.to_string()) {
        if let Some(file_name) = get_file_name(entry) {
            chapters.push(file_name);
            statics_json.number_of_pages.push(0);
        }
    }

    for (index, chapter) in chapters.iter().enumerate() {
        for entry in get_files(format!("{}/{}", CONTENT_ROOT, chapter)) {
            if let Some(file_name) = get_file_name(entry) {
                if let Some(file_name) = file_name.strip_suffix(".png") {
                    statics_json.number_of_pages[index] += 1;
                    convert_webp(CONTENT_ROOT.to_string(), CONTENT_OUT.to_string(), format!("{}/{}", chapter, file_name));
                }
            }
        }
    }

    let file = File::create(format!("{}/statics.json", CONTENT_OUT)).expect("Failed to create file");
    let writer = BufWriter::new(file); // Optional: Use BufWriter for better performance
    serde_json::to_writer(writer, &statics_json).expect("Failed to write JSON to file");

}
