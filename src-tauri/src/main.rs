// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dotenv::dotenv;
// use reqwest::Url;

static WEATHER_API_URL: &str = "http://api.weatherapi.com/v1";

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_weather(location_name: &str) -> String {
    dotenv().ok();

    let weather_api_key: String =
        std::env::var("WEATHER_API_KEY").expect("WEATHER_API_KEY must be set in the .env file!");

    let mut current_weather_url = format!("{}", WEATHER_API_URL);

    current_weather_url
        .push_str(format!("/current.json?key={}&q={}", weather_api_key, location_name,).as_str());

    println!("{}", current_weather_url);

    // let response = reqwest::get(current_weather_url);

    // println!(format!("{:?}", response));

    format!(
        "Getting weather data for {}\nRequestURL: {}",
        location_name, current_weather_url
    )
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_weather])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
